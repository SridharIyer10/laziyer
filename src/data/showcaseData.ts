export interface ClaudeSkill {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  installCommand?: string;
  promptSnippet?: string;
  version: string;
  author: string;
  category: "MCP Server" | "Prompt Workflow" | "Subagent" | "Dev Tool";
  url?: string;
}

export interface AIPrompt {
  id: string;
  role: string;
  slug: string;
  description: string;
  promptText: string;
  category: "Coding" | "Architecture" | "Reasoning" | "Design" | "Writing" | "Agent";
  tags: string[];
  modelRecommendation: string;
  copyCount?: number;
}

export interface GitHubRepo {
  id: string;
  name: string;
  slug: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  cloneCommand: string;
  url: string;
  tags: string[];
}

export interface VideoShortItem {
  id: string;
  title: string;
  slug: string;
  platform: "instagram" | "youtube";
  thumbnailUrl: string;
  url: string;
  duration: string;
  creator: string;
  views?: string;
}

export interface VideoLibraryItem {
  id: string;
  title: string;
  slug: string;
  type: "youtube";
  description: string;
  url: string;
  thumbnailUrl: string;
  authorName: string;
  duration: string;
  tags: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  readingTime: string;
  date: string;
  tags: string[];
  url?: string;
  body?: string;
}

export interface MiniAppItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  tags: string[];
  status: "Live" | "Beta" | "Featured";
}

export const SKILLS_DATA: ClaudeSkill[] = [
  {
    id: "skill-1",
    title: "Chrome DevTools MCP & Browser Subagent",
    slug: "chrome-devtools-mcp",
    description: "Automate real-browser debugging, network trace inspection, accessibility auditing, and layout shift diagnosis directly inside Claude.",
    tags: ["MCP", "DevTools", "Browser Automation", "Performance"],
    installCommand: "npx @anthropic-ai/mcp-installer install chrome-devtools-mcp",
    promptSnippet: "Use the Chrome DevTools MCP tools to inspect layout shifts, network requests, and tap-target contrast on the target URL.",
    version: "v1.4.0",
    author: "Srikanth",
    category: "MCP Server",
    url: "https://github.com/modelcontextprotocol/servers",
  },
  {
    id: "skill-2",
    title: "Impeccable Frontend Design System Skill",
    slug: "impeccable-skill",
    description: "Out-of-distribution craft for web interfaces. Enforces typography hierarchy, responsive design systems, and rich micro-interactions.",
    tags: ["UI/UX", "Tailwind", "Design Systems", "Animation"],
    installCommand: "npx skills add pbakaus/impeccable",
    promptSnippet: "Evaluate this surface against craft-floor standards: contrast >= 4.5:1, tight hierarchy, authored motion, and bespoke browser tokens.",
    version: "v4.3.1",
    author: "pbakaus & Srikanth",
    category: "Dev Tool",
    url: "https://github.com/pbakaus/impeccable",
  },
  {
    id: "skill-3",
    title: "Autonomous Agent Evaluator & Test Harness",
    slug: "agent-evaluator",
    description: "A structured evaluation harness for multi-turn LLM reasoning trajectories, tool validation, and regression prevention.",
    tags: ["Eval", "Multi-Agent", "Prompt Workflow", "PyTest"],
    installCommand: "git clone https://github.com/srikanth/agent-eval-harness.git",
    promptSnippet: "Execute benchmark test suites against the latest model generation. Report precision, tool call accuracy, and token latency.",
    version: "v2.1.0",
    author: "Srikanth",
    category: "Prompt Workflow",
    url: "https://github.com",
  },
  {
    id: "skill-4",
    title: "PostgreSQL pgvector Semantic Search Assistant",
    slug: "pgvector-assistant",
    description: "Orchestrates schema migrations, cosine distance queries, hybrid FTS rankings, and embedding generation pipelines.",
    tags: ["PostgreSQL", "pgvector", "Drizzle ORM", "Search"],
    installCommand: "npm install drizzle-orm postgres openai",
    promptSnippet: "Generate SQL queries combining to_tsvector ranking with <=> cosine similarity operator for 1536-dim OpenAI embeddings.",
    version: "v1.2.0",
    author: "Srikanth",
    category: "MCP Server",
    url: "https://github.com",
  },
];

export const PROMPTS_DATA: AIPrompt[] = [
  {
    id: "prompt-1",
    role: "Senior AI Systems Architect",
    slug: "senior-ai-systems-architect",
    description: "Expert prompt for designing multi-agent tool loops, memory persistence layers, and deterministic recovery protocols.",
    category: "Architecture",
    tags: ["System Design", "Agents", "RAG", "Production"],
    modelRecommendation: "Claude 3.7 Sonnet / GPT-4o",
    promptText: `Act as a Senior AI Systems Architect with 15+ years of distributed systems engineering and specialized expertise in LLM agent orchestration.
Analyze my architectural requirements and produce:
1. Component topology (tool dispatch, memory store, execution sandbox, observer agent).
2. Latency & cost budget breakdown per turn.
3. Fallback recovery flow for tool call parse failures and context window overflow.
4. Concrete TypeScript / Python interfaces for state serialization.`,
  },
  {
    id: "prompt-2",
    role: "Full-Stack Code Refactoring & Slop Eliminator",
    slug: "code-refactoring-slop-eliminator",
    description: "Transform cluttered boilerplate into clean, idiomatic, high-performance TypeScript with zero unnecessary dependencies.",
    category: "Coding",
    tags: ["Refactoring", "TypeScript", "Clean Code", "Next.js"],
    modelRecommendation: "Claude 3.7 Sonnet (Thinking)",
    promptText: `You are an elite code reviewer and frontend performance engineer.
Review the provided codebase with zero tolerance for boilerplate slop, unneeded wrappers, or redundant re-renders.
Enforce:
- Type safety without 'any' or awkward casting
- Optimal memoization and async concurrency
- Elimination of dead code paths and unused variables
- Clear single-responsibility modular structure.
Provide a concise diff with rationale for each change.`,
  },
  {
    id: "prompt-3",
    role: "First-Principles Deep Reasoner & Problem Solver",
    slug: "first-principles-deep-reasoner",
    description: "Break complex technical challenges down to fundamental axioms before formulating mathematical and architectural proofs.",
    category: "Reasoning",
    tags: ["First Principles", "Mathematics", "Logic", "Strategy"],
    modelRecommendation: "Claude 3.7 Sonnet / o3-mini",
    promptText: `I want you to act as a first-principles reasoning engine.
When presented with a problem:
1. Deconstruct the problem into fundamental, undeniable truths.
2. Question every implicit assumption and standard category habit.
3. Build up a solution ground-up from base mechanics.
4. Identify potential failure modes and asymptotic bottlenecks.
Never give generic textbook advice. Explain the underlying mechanics directly.`,
  },
  {
    id: "prompt-4",
    role: "Modern UI/UX Design Director (Anti-Slop)",
    slug: "modern-ui-design-director",
    description: "Direct modern typography, purposeful motion easing, bespoke color palettes, and rejection of generic template UI.",
    category: "Design",
    tags: ["UI/UX", "Tailwind", "CSS", "Micro-Interactions"],
    modelRecommendation: "Claude 3.7 Sonnet",
    promptText: `Act as an award-winning digital design director.
Audit the target interface against strict craft standards:
- Typography: Clear hierarchy, balanced measure, no generic display fonts.
- Color: Committed palette (not gray with a generic blue accent), high contrast >= 4.5:1.
- Motion: Authored exponential ease-out transitions rather than tacky bounce animations.
- Polish: Custom scrollbars, focus rings, and bespoke browser tokens.
Give exact CSS/Tailwind classes and layout adjustments.`,
  },
];

export const REPOS_DATA: GitHubRepo[] = [
  {
    id: "repo-1",
    name: "modelcontextprotocol/servers",
    slug: "mcp-servers",
    owner: "modelcontextprotocol",
    description: "Reference Model Context Protocol (MCP) server implementations for SQLite, PostgreSQL, Brave Search, GitHub, and Filesystem.",
    stars: 8400,
    forks: 920,
    language: "TypeScript",
    languageColor: "#3178c6",
    cloneCommand: "git clone https://github.com/modelcontextprotocol/servers.git",
    url: "https://github.com/modelcontextprotocol/servers",
    tags: ["MCP", "Anthropic", "Tools", "TypeScript"],
  },
  {
    id: "repo-2",
    name: "pbakaus/impeccable",
    slug: "impeccable",
    owner: "pbakaus",
    description: "The anti-slop frontend design system skill for AI coding assistants. Eliminates AI design cliches and elevates web craft.",
    stars: 3200,
    forks: 210,
    language: "TypeScript",
    languageColor: "#3178c6",
    cloneCommand: "npx skills add pbakaus/impeccable",
    url: "https://github.com/pbakaus/impeccable",
    tags: ["Design System", "Craft", "Frontend", "Skills"],
  },
  {
    id: "repo-3",
    name: "pgvector/pgvector",
    slug: "pgvector",
    owner: "pgvector",
    description: "Open-source vector similarity search for PostgreSQL. Store embeddings and query with L2 distance, cosine distance, and inner product.",
    stars: 17800,
    forks: 1100,
    language: "C",
    languageColor: "#555555",
    cloneCommand: "git clone https://github.com/pgvector/pgvector.git",
    url: "https://github.com/pgvector/pgvector",
    tags: ["PostgreSQL", "Vectors", "AI", "C"],
  },
  {
    id: "repo-4",
    name: "drizzle-team/drizzle-orm",
    slug: "drizzle-orm",
    owner: "drizzle-team",
    description: "TypeScript ORM for SQL databases designed for maximum type safety, serverless environments, and raw query speed.",
    stars: 36500,
    forks: 1450,
    language: "TypeScript",
    languageColor: "#3178c6",
    cloneCommand: "npm install drizzle-orm postgres",
    url: "https://github.com/drizzle-team/drizzle-orm",
    tags: ["ORM", "TypeScript", "Database", "SQL"],
  },
];

export const SHORTS_REELS_DATA: VideoShortItem[] = [
  {
    id: "short-1",
    title: "5 Claude Desktop Skills That Supercharge Coding",
    slug: "5-claude-skills-short",
    platform: "instagram",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    url: "https://www.instagram.com",
    duration: "0:58",
    creator: "@srikanth.ai",
    views: "24.5K",
  },
  {
    id: "short-2",
    title: "Building Real-Time MCP Tools in 60 Seconds",
    slug: "mcp-tools-60s",
    platform: "youtube",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    url: "https://www.youtube.com/shorts",
    duration: "0:45",
    creator: "Srikanth Tech",
    views: "18.2K",
  },
  {
    id: "short-3",
    title: "Modern UI Micro-Animations with Pure CSS & Tailwind",
    slug: "micro-animations-short",
    platform: "instagram",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    url: "https://www.instagram.com",
    duration: "0:52",
    creator: "@srikanth.ai",
    views: "31.0K",
  },
  {
    id: "short-4",
    title: "Why pgvector + FTS Beat Pure Vector Search",
    slug: "pgvector-fts-short",
    platform: "youtube",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    url: "https://www.youtube.com/shorts",
    duration: "0:59",
    creator: "Srikanth Tech",
    views: "14.7K",
  },
  {
    id: "short-5",
    title: "Subagents vs Single-Pass Chains Explained",
    slug: "subagents-vs-chains-short",
    platform: "instagram",
    thumbnailUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    url: "https://www.instagram.com",
    duration: "0:50",
    creator: "@srikanth.ai",
    views: "19.3K",
  },
];

export interface VideoPlaylist {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoCount: number;
  thumbnailUrl: string;
  tags: string[];
  videos: VideoLibraryItem[];
}

export const VIDEO_LIBRARY_DATA: VideoLibraryItem[] = [
  {
    id: "vid-lib-1",
    title: "How to Build & Connect Claude MCP Servers from Scratch (Complete Architecture)",
    slug: "build-claude-mcp-servers-full",
    type: "youtube",
    description: "Comprehensive step-by-step masterclass on writing custom TypeScript Model Context Protocol (MCP) servers, registering tool handlers, and connecting directly to Claude Desktop.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    authorName: "Srikanth Tech",
    duration: "18:40",
    tags: ["Claude", "MCP", "TypeScript", "AI Architecture"],
  },
  {
    id: "vid-lib-2",
    title: "Full-Stack AI Knowledge Hub in Next.js 16 (pgvector, Turbopack, Drizzle)",
    slug: "full-stack-ai-knowledge-hub-full",
    type: "youtube",
    description: "Deep dive into building laziyer: real-time hybrid search indexing, Drizzle ORM schemas, OpenAI embeddings, NextAuth credentials, and smooth animations.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    authorName: "Srikanth Tech",
    duration: "24:15",
    tags: ["Next.js 16", "PostgreSQL", "pgvector", "Full Stack"],
  },
  {
    id: "vid-lib-3",
    title: "Autonomous Agent Tool Calling & Reactive Wakeup Loops in Production",
    slug: "autonomous-agent-tool-calling",
    type: "youtube",
    description: "Architecting reliable multi-turn AI agents: handling async tool execution, avoiding polling loops, and enforcing strict security boundaries.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    authorName: "Srikanth Tech",
    duration: "21:30",
    tags: ["AI Agents", "LLMs", "Autonomous Systems", "Python"],
  },
  {
    id: "vid-lib-4",
    title: "pgvector Indexing Demystified: HNSW vs IVFFlat for Multi-Million Vectors",
    slug: "pgvector-indexing-hnsw-ivfflat",
    type: "youtube",
    description: "In-depth benchmark comparing HNSW graphs and IVFFlat inverted lists on PostgreSQL 17 with realistic LLM embeddings, query throughput, and recall rates.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    authorName: "Srikanth Tech",
    duration: "16:50",
    tags: ["PostgreSQL", "pgvector", "Vector Indexing", "Performance"],
  },
  {
    id: "vid-lib-5",
    title: "Building Anti-Slop Frontend Web Interfaces with AI Coding Assistants",
    slug: "anti-slop-frontend-craft",
    type: "youtube",
    description: "How to craft custom typography scales, authored animation curves, bespoke tokens, and contrast ratios while pair-programming with Claude 3.7 Sonnet.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    authorName: "Srikanth Tech",
    duration: "28:10",
    tags: ["Design System", "Tailwind CSS", "UI Craft", "Claude"],
  },
];

export const VIDEO_PLAYLISTS_DATA: VideoPlaylist[] = [
  {
    id: "playlist-1",
    title: "Claude MCP & Agentic Systems Masterclass",
    slug: "claude-mcp-agentic-systems",
    description: "A complete curriculum covering Model Context Protocol architecture, building custom tools, multi-turn tool loops, and Claude Desktop workflows.",
    videoCount: 3,
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    tags: ["MCP", "Claude", "Agents", "Architecture"],
    videos: [VIDEO_LIBRARY_DATA[0], VIDEO_LIBRARY_DATA[2]],
  },
  {
    id: "playlist-2",
    title: "Full-Stack AI Engineering & Vector Databases",
    slug: "full-stack-ai-engineering",
    description: "End-to-end guide to building modern AI applications with Next.js 16, PostgreSQL pgvector, OpenAI embeddings, and high-performance search.",
    videoCount: 3,
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["Next.js 16", "pgvector", "PostgreSQL", "Search"],
    videos: [VIDEO_LIBRARY_DATA[1], VIDEO_LIBRARY_DATA[3]],
  },
  {
    id: "playlist-3",
    title: "High-Craft Frontend & Anti-Slop UI Design",
    slug: "frontend-craft-anti-slop",
    description: "Master the principles of bespoke typography, fluid micro-animations, tasteful dark modes, and modern responsive layouts.",
    videoCount: 2,
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    tags: ["UI/UX", "Tailwind CSS", "Design Systems", "Motion"],
    videos: [VIDEO_LIBRARY_DATA[4], VIDEO_LIBRARY_DATA[1]],
  },
];
