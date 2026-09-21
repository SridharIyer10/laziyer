# Instructions for AI collaborators

These rules apply to **any** AI coding assistant working in this repo (Claude Code, Cursor, Copilot, Codex, Aider, Windsurf, etc.) regardless of the underlying model. When another config file (`.cursorrules`, `.github/copilot-instructions.md`, `CLAUDE.md`) exists, it must mirror or defer to this file — this is the source of truth.

## Framework caveat

This project runs **Next.js 16 + React 19**. APIs, conventions, and file layout may differ from earlier majors. Consult `node_modules/next/dist/docs/` (or the current Next.js docs on the web) before writing framework code. Heed deprecation notices.

## Behavioral rules (priority order)

1. **Think first.** State assumptions, name ambiguity, flag simpler alternatives. Ask when unclear rather than guessing.
2. **Minimum code.** No speculative features, no abstractions for single-use code, no error handling for impossible cases. If 200 lines could be 50, rewrite.
3. **Surgical edits.** Every changed line must trace to the request. Don't refactor working code, "improve" adjacent formatting, or delete pre-existing dead code — only clean up orphans your own change created.
4. **Verify.** State success criteria before coding (e.g. "write failing test → make it pass"). For multi-step work, list steps with checks and loop until each passes.

## Security guardrails (this repo)

- Secrets live in `.env` (gitignored). Never commit env files. If a secret lands in git, rotate it.
- Server-only keys (`OPENAI_API_KEY`, `DATABASE_URL`, `NEXTAUTH_SECRET`, admin credentials): never expose via `NEXT_PUBLIC_*`.
- Admin routes (`/admin/**`) and content-mutating APIs (`/api/content`, `/api/auth`) require a NextAuth session from `src/lib/auth.ts`. Do not add unauthenticated write endpoints.
- Passwords are hashed with `bcryptjs`. Do not weaken rounds, downgrade the algorithm, or store plaintext.
- All DB access flows through Drizzle in `src/lib/db/`. Never build SQL by string concatenation on user input.
- Public POST/PUT/DELETE routes must apply the limiter in `src/lib/ratelimit.ts`.
- Third-party API calls (OpenAI, GitHub, YouTube, Instagram) run on the server, never in client components.
- Validate untrusted input with `zod` at the boundary before it reaches the DB or an external API.
