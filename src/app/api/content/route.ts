import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { detectContentType, slugify } from "@/lib/utils";
import { extractMetadata } from "@/lib/metadata";
import { generateEmbedding, prepareTextForEmbedding } from "@/lib/embeddings";
import { ratelimit, getClientIp } from "@/lib/ratelimit";
import { v4 as uuid } from "uuid";
import type { ContentType } from "@/lib/db/schema";

const CreateContentSchema = z.object({
  url: z.union([z.url(), z.literal(""), z.undefined()]),
  title: z.string().max(500).optional(),
  description: z.string().max(5000).optional(),
  body: z.string().max(200_000).optional(),
  type: z.enum(schema.contentTypes).optional(),
  tags: z.array(z.string().max(100)).max(30).optional(),
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);

  let items;
  if (type && schema.contentTypes.includes(type as ContentType)) {
    items = await db.query.content.findMany({
      where: eq(schema.content.type, type as ContentType),
      limit,
      offset,
      orderBy: [desc(schema.content.createdAt)],
    });
  } else {
    items = await db.query.content.findMany({
      limit,
      offset,
      orderBy: [desc(schema.content.createdAt)],
    });
  }

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 10 content creates per minute per user (protects OpenAI embedding spend)
  const ip = getClientIp(request);
  const { success } = ratelimit(`content-create:${ip}`, 10, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = CreateContentSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { url, title, description, body: contentBody, type: explicitType, tags } = parsed.data;

  const contentType = (
    explicitType || (url ? detectContentType(url) : "blog")
  ) as ContentType;

  let meta: Record<string, unknown> = {};
  let finalTitle = title || "";
  let finalDescription = description || "";

  if (url) {
    try {
      const extracted = await extractMetadata(url, contentType);
      meta = extracted.metadata;
      if (!finalTitle) finalTitle = extracted.title;
      if (!finalDescription) finalDescription = extracted.description;
    } catch (err) {
      console.error("Metadata extraction failed:", err);
    }
  }

  if (!finalTitle) finalTitle = "Untitled";

  const slug = slugify(finalTitle) + "-" + uuid().slice(0, 8);

  const contentText = prepareTextForEmbedding({
    title: finalTitle,
    description: finalDescription,
    body: contentBody,
    tags: tags || [],
    type: contentType,
  });

  let embedding: number[] | null = null;
  try {
    embedding = await generateEmbedding(contentText);
  } catch (err) {
    console.error("Embedding generation failed:", err);
  }

  const item = {
    id: uuid(),
    type: contentType,
    url: url || null,
    title: finalTitle,
    description: finalDescription || null,
    body: contentBody || null,
    metadata: meta,
    embedding: embedding ?? null,
    tags: tags || null,
    slug,
    authorId: session.user.id || null,
    isPublished: true,
  };

  await db.insert(schema.content).values(item);
  return NextResponse.json(item, { status: 201 });
}
