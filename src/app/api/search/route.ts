import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateEmbedding } from "@/lib/embeddings";
import { ratelimit, getClientIp } from "@/lib/ratelimit";
import { sql } from "drizzle-orm";

// Table name → content type key (values are hardcoded constants, never from user input)
const CONTENT_TABLES = {
  skill: "skills",
  prompt: "prompts",
  article: "articles",
  video: "videos",
} as const;

type ContentTypeKey = keyof typeof CONTENT_TABLES;

// Index signature required by db.execute<T>'s Record<string, unknown> constraint
interface SearchResult extends Record<string, unknown> {
  id: string;
  type: string;
  title: string;
  description: string | null;
  slug: string;
  thumbnail_url?: string | null;
  created_at: string;
  rank?: number;
  similarity?: number;
}

function resolveTargetTables(type: string | null): ContentTypeKey[] {
  if (!type || type === "all") return Object.keys(CONTENT_TABLES) as ContentTypeKey[];
  return type in CONTENT_TABLES
    ? [type as ContentTypeKey]
    : (Object.keys(CONTENT_TABLES) as ContentTypeKey[]);
}

function tagSubquery(typeKey: ContentTypeKey, tagFilters: string[]) {
  if (tagFilters.length === 0) return sql``;
  return sql`
    AND id IN (
      SELECT content_id FROM content_tags
      JOIN tags ON content_tags.tag_id = tags.id
      WHERE tags.slug = ANY(${tagFilters}::text[])
        AND content_tags.content_type = ${typeKey}
      GROUP BY content_id
      HAVING count(*) = ${tagFilters.length}
    )`;
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 30 searches per minute per IP
  const ip = getClientIp(request);
  const { success } = ratelimit(`search:${ip}`, 30, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";
  const typeFilter = searchParams.get("type");
  const tagFilters = searchParams.getAll("tag"); // ?tag=mcp&tag=typescript
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  const targetTypes = resolveTargetTables(typeFilter);

  // ─── No query → recent items ─────────────────────────────────────────────
  if (!query) {
    const perTable = Math.ceil(limit / targetTypes.length);
    const chunks = await Promise.all(
      targetTypes.map((typeKey) =>
        db.execute<SearchResult>(sql`
          SELECT ${sql.raw(`'${typeKey}'`)} AS type, id, title, description, slug,
                 thumbnail_url, created_at
          FROM ${sql.raw(CONTENT_TABLES[typeKey])}
          WHERE is_published = true
          ${tagSubquery(typeKey, tagFilters)}
          ORDER BY created_at DESC
          LIMIT ${perTable}
        `)
      )
    );
    const results = (chunks.flat() as SearchResult[]).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return NextResponse.json({ results: results.slice(0, limit), mode: "recent" });
  }

  // ─── FTS search ───────────────────────────────────────────────────────────
  let results: SearchResult[] = [];

  const ftsChunks = await Promise.allSettled(
    targetTypes.map((typeKey) =>
      db.execute<SearchResult>(sql`
        SELECT ${sql.raw(`'${typeKey}'`)} AS type, id, title, description, slug,
               thumbnail_url, created_at,
               ts_rank(
                 to_tsvector('english',
                   coalesce(title,'') || ' ' ||
                   coalesce(description,'') || ' ' ||
                   coalesce(body,'')),
                 plainto_tsquery('english', ${query})
               ) AS rank
        FROM ${sql.raw(CONTENT_TABLES[typeKey])}
        WHERE is_published = true
          AND to_tsvector('english',
                coalesce(title,'') || ' ' ||
                coalesce(description,'') || ' ' ||
                coalesce(body,''))
              @@ plainto_tsquery('english', ${query})
        ${tagSubquery(typeKey, tagFilters)}
        ORDER BY rank DESC
        LIMIT ${limit}
      `)
    )
  );

  for (const result of ftsChunks) {
    if (result.status === "fulfilled") {
      results = results.concat(result.value as SearchResult[]);
    } else {
      console.error("FTS chunk failed:", result.reason);
    }
  }

  // ─── Vector search ────────────────────────────────────────────────────────
  if (process.env.OPENAI_API_KEY) {
    try {
      const embedding = await generateEmbedding(query);
      const embStr = `[${embedding.join(",")}]`;
      const vecLimit = Math.ceil(limit / 2);

      const vecChunks = await Promise.allSettled(
        targetTypes.map((typeKey) =>
          db.execute<SearchResult>(sql`
            SELECT ${sql.raw(`'${typeKey}'`)} AS type, id, title, description, slug,
                   thumbnail_url, created_at,
                   1 - (embedding <=> ${embStr}::vector) AS similarity
            FROM ${sql.raw(CONTENT_TABLES[typeKey])}
            WHERE is_published = true AND embedding IS NOT NULL
            ${tagSubquery(typeKey, tagFilters)}
            ORDER BY embedding <=> ${embStr}::vector
            LIMIT ${vecLimit}
          `)
        )
      );

      for (const result of vecChunks) {
        if (result.status === "fulfilled") {
          results = results.concat(result.value as SearchResult[]);
        } else {
          console.error("Vector chunk failed:", result.reason);
        }
      }
    } catch (err) {
      console.error("Embedding generation failed:", err);
    }
  }

  // Deduplicate by type+id
  const seen = new Set<string>();
  const deduped = results.filter((r) => {
    const key = `${r.type}:${r.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return NextResponse.json({
    results: deduped.slice(0, limit),
    mode: deduped.length > 0 ? "hybrid" : "none",
  });
}
