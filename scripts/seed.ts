import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("ERROR: DATABASE_URL is not set in .env");
  process.exit(1);
}

const adminEmail = process.env.ADMIN_EMAIL || "admin@personal.site";
const adminName = process.env.ADMIN_NAME || "Srikanth";
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminPassword) {
  console.error(
    "ERROR: ADMIN_PASSWORD is not set in .env\n" +
      "Add ADMIN_PASSWORD=your-secure-password to your .env file and re-run."
  );
  process.exit(1);
}

async function seed() {
  console.log("Seeding database...");

  const { default: postgres } = await import("postgres");
  const bcrypt = await import("bcryptjs");

  const sql = postgres(connectionString!, { max: 1 });
  const passwordHash = await bcrypt.hash(adminPassword!, 12);

  // ─── Admin user ────────────────────────────────────────────────────────────
  await sql`
    INSERT INTO users (id, email, name, password_hash)
    VALUES (gen_random_uuid(), ${adminEmail}, ${adminName}, ${passwordHash})
    ON CONFLICT (email) DO UPDATE SET name = ${adminName}
  `;
  console.log(`Admin user: ${adminEmail}`);

  const [{ id: authorId }] = await sql`
    SELECT id FROM users WHERE email = ${adminEmail} LIMIT 1
  `;

  // ─── Tags ──────────────────────────────────────────────────────────────────
  const tagRows = await sql`
    INSERT INTO tags (name, slug, color) VALUES
      ('MCP',            'mcp',            '#8b5cf6'),
      ('TypeScript',     'typescript',     '#3b82f6'),
      ('AI Agents',      'ai-agents',      '#06b6d4'),
      ('Next.js',        'nextjs',         '#000000'),
      ('PostgreSQL',     'postgresql',     '#336791'),
      ('Tutorial',       'tutorial',       '#10b981'),
      ('Architecture',   'architecture',   '#f59e0b'),
      ('UI/UX',          'ui-ux',          '#ec4899'),
      ('Productivity',   'productivity',   '#84cc16'),
      ('Claude',         'claude',         '#f97316')
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id, slug
  `;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagBySlug = Object.fromEntries(tagRows.map((r: any) => [r.slug as string, r.id as string]));
  console.log(`Tags: ${tagRows.length} upserted`);

  // Helper: link tags to content
  async function linkTags(
    contentType: string,
    contentId: string,
    slugs: string[]
  ) {
    for (const slug of slugs) {
      const tagId = tagBySlug[slug];
      if (!tagId) continue;
      await sql`
        INSERT INTO content_tags (tag_id, content_type, content_id)
        VALUES (${tagId}, ${contentType}, ${contentId})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  // ─── Skills ────────────────────────────────────────────────────────────────
  const skill1 = await sql`
    INSERT INTO skills (title, slug, description, body, version, install_command, author_id)
    VALUES (
      'Chrome DevTools MCP & Browser Subagent',
      'chrome-devtools-mcp',
      'Automate real-browser debugging, network trace inspection, accessibility auditing, and layout shift diagnosis directly inside Claude.',
      'Use the Chrome DevTools MCP tools to inspect layout shifts, network requests, and tap-target contrast on the target URL.',
      'v1.4.0',
      'npx @anthropic-ai/mcp-installer install chrome-devtools-mcp',
      ${authorId}
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("skill", skill1[0].id, ["mcp", "typescript", "productivity"]);

  const skill2 = await sql`
    INSERT INTO skills (title, slug, description, version, install_command, author_id)
    VALUES (
      'Impeccable Frontend Design System Skill',
      'impeccable-skill',
      'Out-of-distribution craft for web interfaces. Enforces typography hierarchy, responsive design systems, and rich micro-interactions.',
      'v4.3.1',
      'npx skills add pbakaus/impeccable',
      ${authorId}
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("skill", skill2[0].id, ["ui-ux", "claude"]);
  console.log("Skills: 2 seeded");

  // ─── Prompts ───────────────────────────────────────────────────────────────
  const prompt1 = await sql`
    INSERT INTO prompts (title, slug, description, body, role, use_case, author_id)
    VALUES (
      'Senior TypeScript Architect',
      'senior-typescript-architect',
      'Channels a senior engineer focused on type safety, composability, and idiomatic patterns.',
      'You are a senior TypeScript architect with 10 years of experience. Prioritize type safety, avoid any-types, write idiomatic TypeScript using discriminated unions, generics, and utility types. Always explain trade-offs.',
      'system',
      'Code review, architecture guidance',
      ${authorId}
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("prompt", prompt1[0].id, ["typescript", "architecture"]);

  const prompt2 = await sql`
    INSERT INTO prompts (title, slug, description, body, role, use_case, author_id)
    VALUES (
      'AI Agent Orchestration Designer',
      'ai-agent-orchestration-designer',
      'Designs multi-agent workflows with bounded tool loops, state serialization, and reactive wakeup patterns.',
      'You are an AI systems architect specializing in agentic workflows. Design multi-agent pipelines using Claude subagents, tool use boundaries, and state serialization. Identify when to use parallel vs sequential agent calls.',
      'system',
      'Agent design, workflow architecture',
      ${authorId}
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("prompt", prompt2[0].id, ["ai-agents", "architecture", "claude"]);
  console.log("Prompts: 2 seeded");

  // ─── Articles ──────────────────────────────────────────────────────────────
  const article1 = await sql`
    INSERT INTO articles (title, slug, description, body, author_id, published_at)
    VALUES (
      'Building Hybrid Search with PostgreSQL pgvector and Next.js',
      'building-hybrid-search-pgvector',
      'Why pure keyword search fails and pure vector search hallucinates — designing a production-grade rank-fused retrieval system.',
      'Comprehensive guide explaining the difference between BM25/FTS indexing and cosine distance vector rankings in PostgreSQL.',
      ${authorId},
      now()
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("article", article1[0].id, ["postgresql", "nextjs", "typescript"]);

  const article2 = await sql`
    INSERT INTO articles (title, slug, description, body, author_id, published_at)
    VALUES (
      'State of Modern Agentic Workflows',
      'state-of-agentic-workflows',
      'Deep dive into orchestration patterns, reactive wakeup loops, tool authorization boundaries, and state serialization.',
      'Analysis of agent communication patterns, bounded tool loops, and execution safety boundaries in 2026.',
      ${authorId},
      now()
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("article", article2[0].id, ["ai-agents", "architecture", "claude"]);
  console.log("Articles: 2 seeded");

  // ─── Videos ────────────────────────────────────────────────────────────────
  const video1 = await sql`
    INSERT INTO videos (title, slug, description, url, platform, format, author_id,
      metadata)
    VALUES (
      'How to Build & Connect Claude MCP Servers from Scratch',
      'build-claude-mcp-servers',
      'Complete walkthrough creating custom TypeScript MCP servers, exposing tools, handling JSON-RPC schemas, and connecting to Claude Desktop.',
      'https://www.youtube.com/watch?v=example',
      'youtube',
      'long',
      ${authorId},
      ${JSON.stringify({ authorName: "Srikanth Tech", thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" })}::jsonb
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("video", video1[0].id, ["mcp", "claude", "tutorial", "typescript"]);

  const video2 = await sql`
    INSERT INTO videos (title, slug, description, url, platform, format, author_id,
      metadata)
    VALUES (
      '5 Claude Skills That Supercharge Coding Workflows',
      '5-claude-skills-shorts',
      'Quick 60-second highlight reel demonstrating Chrome DevTools MCP, auto-refactoring skills, and schema visualizers.',
      'https://www.instagram.com/reel/example',
      'instagram',
      'short',
      ${authorId},
      ${JSON.stringify({ authorName: "@srikanth.dev", thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" })}::jsonb
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = now()
    RETURNING id
  `;
  await linkTags("video", video2[0].id, ["claude", "productivity"]);
  console.log("Videos: 2 seeded");

  await sql.end();
  console.log("\nDatabase seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err.message);
  process.exit(1);
});
