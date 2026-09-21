"use client";

import { ArticleItem } from "@/data/showcaseData";
import { BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ArticlesSectionProps {
  articles: ArticleItem[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section id="articles" className="py-16 md:py-24 border-b border-border/60 scroll-mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border/50 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              <BookOpen className="h-4 w-4" />
              <span>Engineering &amp; AI Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Technical Articles &amp; Posts
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Deep dives on AI agent orchestration, PostgreSQL vector retrieval, Next.js Turbopack internals, and modern frontend design systems.
            </p>
          </div>
          <div className="text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-lg border border-border shrink-0 self-start md:self-auto">
            {articles.length} Published Articles
          </div>
        </div>

        {/* Articles List / Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 hover:border-blue-500/40 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/p/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              </div>

              {/* Tags & Action Button */}
              <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/p/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Post</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
