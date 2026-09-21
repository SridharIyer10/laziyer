# laziyer — AI Intelligence, Skills & Prompts Hub

A curated hub for AI skills, prompts, repos, and video content. Built on Next.js 16 with hybrid search (Postgres FTS + `pgvector` embeddings).

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, React 19) |
| Database | PostgreSQL + `pgvector` + `uuid-ossp` |
| ORM | Drizzle ORM + `drizzle-kit` |
| Embeddings | OpenAI `text-embedding-3-small` (1536 dims) |
| Auth | NextAuth v5 (beta) + `bcryptjs` |
| Styling | Tailwind CSS v4 |

## Getting started

```bash
npm install
cp .env.example .env   # fill in secrets (see Environment)
npm run db:setup       # enables pgvector, runs migrations
npm run db:seed        # optional: seed showcase data
npm run dev
```

Open <http://localhost:3000>.

## Environment

Required in `.env` (never commit):

- `DATABASE_URL` — Postgres connection string
- `OPENAI_API_KEY` — server-only, used for embeddings
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — NextAuth session signing
- `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password

Anything prefixed `NEXT_PUBLIC_*` ships to the browser. Never put secrets there.

## Project structure

```text
src/
  app/
    admin/            # Protected CMS (NextAuth-gated)
    api/
      auth/           # NextAuth route handler
      content/        # Content CRUD (session-gated)
      search/         # Hybrid FTS + vector search
    p/[slug]/         # Resource detail pages
    apps/[slug]/      # Sandboxed mini-app runner
    ailibrary/        # Curated library index
    videos/           # Video library page
    layout.tsx        # Root layout
    page.tsx          # Hub landing
    globals.css       # Tailwind v4 theme
  components/         # Section + UI components
  data/               # Static showcase data
  lib/
    auth.ts           # NextAuth config + bcrypt helpers
    db/               # Drizzle client & schema
    embeddings.ts     # OpenAI embedding utilities
    metadata.ts       # GitHub / YouTube / Instagram scrapers
    ratelimit.ts      # Rate limiting for public endpoints
    crypto.ts         # Hashing / signing helpers
scripts/              # setup-db, seed, setup.sql
drizzle/              # Generated migrations
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server (Turbopack) |
| `npm run build` / `start` | Production build & serve |
| `npm run lint` | ESLint |
| `npm run db:setup` | Enable extensions + run migrations |
| `npm run db:generate` / `db:migrate` | Drizzle migration flow |
| `npm run db:seed` | Seed showcase data |
| `npm run db:studio` | Drizzle Studio UI |

## Security

- Secrets stay in `.env` — the file is gitignored; rotate any key that leaks.
- Admin (`/admin/**`) and mutating APIs require a NextAuth session; never add unauthenticated write endpoints.
- All DB access goes through Drizzle — no raw SQL string concatenation on user input.
- Passwords use `bcryptjs`; don't weaken rounds or store plaintext.
- Apply the `src/lib/ratelimit.ts` limiter on any new public POST/PUT/DELETE route.
- Third-party API calls (OpenAI, GitHub, YouTube, Instagram) run server-side only.

## AI collaborators

The behavioral rules, framework caveats, and security guardrails for AI coding assistants live in **[AGENTS.md](./AGENTS.md)** — the single source of truth, applied regardless of tool or model. Mirror files for other IDEs point back to it:

- [`CLAUDE.md`](./CLAUDE.md) — Claude Code (imports `AGENTS.md`)
- [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) — GitHub Copilot
- [`.cursorrules`](./.cursorrules) — Cursor

If you use another agent (Codex, Aider, Windsurf, etc.), point it at `AGENTS.md`. Update all mirrors together when rules change.
