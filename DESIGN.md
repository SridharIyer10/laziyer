# Design System: MyVault

<!-- impeccable:design-schema 1 -->

## Visual World & Identity

**MyVault** is designed as a precision-crafted creator portfolio and knowledge hub. It balances high technical clarity with modern visual rhythm:
- **Surface Geometry**: 12–16px rounded corners (`rounded-xl` to `rounded-2xl`), subtle border elevation (`border border-border`), and radial glow backdrops.
- **Lighting & Scene**: High-contrast, clean theme with neutral stones (`#fafaf9` light / `#0c0a09` dark) and dedicated semantic accents.
- **Typography**: Clean Geist Sans interface stack with balanced heading weights (`font-extrabold` to `font-bold`) and mono accents for commands and timestamps.

---

## Palette & Semantic Roles

| Role | Light Value | Dark Value | Purpose |
|---|---|---|---|
| **Background** | `#fafaf9` (warm stone) | `#0c0a09` (deep obsidian) | Page canvas |
| **Card / Surface** | `#ffffff` | `#1c1917` (warm charcoal) | Content containers, cards |
| **Foreground** | `#1c1917` | `#f5f5f4` | High-contrast body & headings |
| **Muted** | `#f5f5f4` | `#292524` | Badge grounds, input backgrounds |
| **Muted Text** | `#78716c` | `#a8a29e` | Subtitles, metadata, timestamps |
| **Border** | `#e7e5e4` | `#292524` | Subtle component delineation |
| **Primary Accent** | `#3b82f6` (blue-500) | `#3b82f6` | Search focus, primary actions, active nav |
| **Claude Skill Accent** | `#9333ea` (purple-600) | `#c084fc` (purple-400) | Claude skills, MCP tags |
| **Articles Accent** | `#2563eb` (blue-600) | `#60a5fa` (blue-400) | Technical blog posts |
| **Video Accent** | `#dc2626` (red-600) / `#db2777` (pink-600) | YouTube & Instagram badges |
| **Mini Apps Accent** | `#059669` (emerald-600) | `#34d399` (emerald-400) | Interactive tools & apps |

---

## Section Architecture & Navigation

1. **Sticky Header**: Backdrop-blur navigation bar with active section scroll-spy tracking, quick jump anchors, and Admin CMS button.
2. **Hero Section**:
   - Status badge and clear value proposition
   - Real-time hybrid search (FTS + vector similarity)
   - Quick jump action buttons to all sections
   - Feature highlight metrics
3. **Claude Skills Section (`#skills`)**:
   - MCP servers, prompt workflows, and agent evaluators
   - One-click "Copy Install Command" button with checkmark toast
   - Expandable prompt / schema instruction drawer
4. **Articles Section (`#articles`)**:
   - Editorial cards with reading time estimate, calendar date, and tag pills
5. **Videos Section (`#videos`)**:
   - Tabbed platform switcher (All / YouTube / Instagram)
   - Video cards with hover play overlays, durations, and external links
6. **Mini Apps Section (`#apps`)**:
   - Interactive utilities and tools with status tags and iframe launcher links
7. **About Me Section (`#about`)**:
   - Personal bio of Srikanth, areas of focus, tech stack pill grid, and social connect links (GitHub, X/Twitter, YouTube, Instagram, LinkedIn, Email)
8. **Footer**:
   - Quick links, back-to-top button, and Next.js 16 / pgvector credits.

---

## Motion & Micro-Interactions

- **Smooth Scroll**: Native `html { scroll-behavior: smooth; }` for seamless in-page anchor navigation.
- **Card Hover Effects**: Subtle scale transitions (`hover:scale-[1.02]`), border hue transitions, and play overlay fades.
- **Interactive Feedback**: Green copy tick feedback for CLI commands, debounced search updates, and tab indicator transitions.
