import { notFound } from "next/navigation";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { 
  SKILLS_DATA, 
  PROMPTS_DATA, 
  REPOS_DATA, 
  VIDEO_LIBRARY_DATA, 
  SHORTS_REELS_DATA 
} from "@/data/showcaseData";
import { 
  CodeXml, 
  Video, 
  Camera, 
  FileText, 
  BrainCircuit, 
  AppWindow, 
  ExternalLink, 
  Calendar, 
  Tag, 
  LucideIcon,
  Sparkles,
  GitFork,
  Star,
  Terminal,
  Copy,
  Check,
  Zap,
  ArrowLeft,
  Bot
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const typeConfig: Record<string, { icon: LucideIcon; color: string; label: string }> = {
  github: { icon: GitFork, color: "text-amber-500", label: "GitHub Repository" },
  youtube: { icon: Video, color: "text-red-500", label: "YouTube Video" },
  instagram: { icon: Camera, color: "text-pink-500", label: "Instagram Post" },
  claude_skill: { icon: Sparkles, color: "text-primary", label: "Claude Skill" },
  prompt: { icon: BrainCircuit, color: "text-blue-500", label: "AI Prompt Role" },
  blog: { icon: FileText, color: "text-emerald-500", label: "Article / Note" },
  miniapp: { icon: AppWindow, color: "text-purple-500", label: "Mini App" },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Check Showcase Data
  const skill = SKILLS_DATA.find((s) => s.slug === slug);
  if (skill) return { title: `${skill.title} - laziyer`, description: skill.description };

  const prompt = PROMPTS_DATA.find((p) => p.slug === slug);
  if (prompt) return { title: `${prompt.role} - laziyer`, description: prompt.description };

  const repo = REPOS_DATA.find((r) => r.slug === slug);
  if (repo) return { title: `${repo.name} - laziyer`, description: repo.description };

  const video = VIDEO_LIBRARY_DATA.find((v) => v.slug === slug);
  if (video) return { title: `${video.title} - laziyer`, description: video.description };

  // 2. Check DB
  try {
    const item = await db.query.content.findFirst({ where: eq(schema.content.slug, slug) });
    if (item) return { title: `${item.title} - laziyer`, description: item.description || "" };
  } catch {
    // DB not available or empty
  }

  return { title: "Details - laziyer" };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check if it's a Claude Skill
  const skill = SKILLS_DATA.find((s) => s.slug === slug);
  if (skill) {
    return (
      <div className="min-h-screen py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>laziyer</span>
            </Link>
            <span>/</span>
            <Link href="/ailibrary?type=skills" className="hover:text-foreground transition-colors">
              AI Library
            </Link>
            <span>/</span>
            <span className="text-primary truncate">{skill.title}</span>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-border bg-card shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{skill.category}</span>
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {skill.version} · Author: {skill.author}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {skill.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {skill.description}
            </p>

            {skill.installCommand && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Terminal Installation Command:
                </label>
                <div className="p-4 rounded-2xl bg-[#111111] text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-primary font-bold select-none">$</span>
                    <span className="text-zinc-300 truncate">{skill.installCommand}</span>
                  </div>
                </div>
              </div>
            )}

            {skill.promptSnippet && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Prompt / Instructions:
                </label>
                <div className="p-4 rounded-2xl bg-muted/60 border border-border font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                  {skill.promptSnippet}
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border">
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {skill.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {skill.url && (
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-xs"
                >
                  <span>Open GitHub Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/ailibrary?type=skills"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to AI Library</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Check if it's an Open-Source Repo
  const repo = REPOS_DATA.find((r) => r.slug === slug);
  if (repo) {
    return (
      <div className="min-h-screen py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>laziyer</span>
            </Link>
            <span>/</span>
            <Link href="/ailibrary?type=repos" className="hover:text-foreground transition-colors">
              AI Library
            </Link>
            <span>/</span>
            <span className="text-primary truncate">{repo.name}</span>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl border border-border bg-card shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                <GitFork className="h-3.5 w-3.5" />
                <span>Open Source Repository</span>
              </span>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  {repo.stars.toLocaleString()}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {repo.forks.toLocaleString()}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {repo.name}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {repo.description}
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Clone / Install Command:
              </label>
              <div className="p-4 rounded-2xl bg-[#111111] text-zinc-100 border border-zinc-800 font-mono text-xs sm:text-sm flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <Terminal className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-zinc-300 truncate">{repo.cloneCommand}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border">
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {repo.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-xs"
              >
                <span>View on GitHub</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/ailibrary?type=repos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to AI Library</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Check DB item
  let item = null;
  try {
    item = await db.query.content.findFirst({ where: eq(schema.content.slug, slug) });
  } catch {
    // ignore
  }

  if (!item) {
    notFound();
  }

  const config = typeConfig[item.type] || typeConfig.blog;
  const Icon = config.icon;
  const meta = (item.metadata || {}) as Record<string, unknown>;

  const hasThumbnail = typeof meta?.thumbnailUrl === "string" && Boolean(meta.thumbnailUrl);
  const hasAuthor = typeof meta?.authorName === "string" && Boolean(meta.authorName);

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl border border-border bg-card shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground pb-3 border-b border-border">
            <Icon className={`h-4 w-4 ${config.color}`} />
            <span className={`font-bold ${config.color}`}>{config.label}</span>
            <span>·</span>
            <Calendar className="h-3.5 w-3.5" />
            <time>{formatDate(item.createdAt)}</time>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {item.title}
          </h1>

          {item.description ? (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          ) : null}

          {hasThumbnail ? (
            <div className="rounded-2xl overflow-hidden aspect-video bg-muted border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meta.thumbnailUrl as string}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {item.body ? (
            <div className="prose dark:prose-invert max-w-none text-foreground text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-border">
              {item.body.split("\n").map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border">
            {item.tags && item.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {item.tags.map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-xs"
              >
                <span>Visit Original Resource</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
