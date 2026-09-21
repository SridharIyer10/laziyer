# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers, AI engineers, tech enthusiasts, and collaborators looking for curated Claude skills, technical articles/blogs, video demonstrations (YouTube / Instagram), interactive mini-apps, and personal background on Srikanth.

## Product Purpose

A personal knowledge hub and portfolio (MyVault) to share skills, published articles, curated video breakdowns, mini-apps, and personal bio in an expressive, modern interface with interactive search and smooth scrolling navigation.

## Positioning

An all-in-one personal creator hub that merges an interactive live portfolio with a hybrid-searchable knowledge vault (FTS + pgvector) and sandboxed mini-app runner.

## Operating Context

- Web browser (desktop and mobile)
- Fast exploration across multi-format media (articles, GitHub repos, Claude skills, embedded videos, live iframe mini apps)
- Seamless smooth-scroll navigation across dedicated sections: Hero, Claude Skills, Content & Articles, Videos (YouTube / Instagram), Mini Apps, and About Me.

## Capabilities and Constraints

- **Stack**: Next.js 16 (App Router, Turbopack, React 19), Tailwind CSS v4, PostgreSQL with pgvector, Drizzle ORM, NextAuth v5.
- **Dynamic Content**: Connected to `/api/content` and `/api/search` with dynamic detail routes (`/p/[slug]` and `/apps/[slug]`).
- **Responsive**: Fully optimized for mobile, tablet, and desktop viewports.
- **Scroll & Animations**: Modern reveal animations, interactive section cards, fluid transitions, and visual hierarchy.

## Brand Commitments

- **Name**: MyVault / Srikanth's Personal Vault
- **Tone**: Modern, technical, clean, craft-focused, dynamic, premium dark/light mode aesthetic.

## Product Principles

1. **First-Viewport Impact**: Hero introduces the personal vault with clear purpose, search access, and quick navigational jump targets.
2. **Distinct Section Flow**: Clear, dedicated sections for Claude Skills, Articles & Content, Videos (YouTube & Instagram), Mini Apps, and About Me.
3. **Smooth Scroll & Micro-Animations**: Interactivity that feels alive with reveal animations, refined hover effects, and smooth anchor scrolling.
4. **Rich Content Rendering**: Native treatment for diverse media formats (code blocks, video thumbnails/players, tag badges, and live app previews).
