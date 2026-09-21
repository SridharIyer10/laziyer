"use client";

import { MiniAppItem } from "@/data/showcaseData";
import { AppWindow, ExternalLink, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface MiniAppsSectionProps {
  apps: MiniAppItem[];
}

export function MiniAppsSection({ apps }: MiniAppsSectionProps) {
  return (
    <section id="apps" className="py-16 md:py-24 border-b border-border/60 scroll-mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border/50 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <AppWindow className="h-4 w-4" />
              <span>Interactive Utilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Mini Apps &amp; Playground
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Lightweight web apps and tools designed to test embeddings, generate design tokens, and compose Claude prompts.
            </p>
          </div>

          <Link
            href="/apps"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline self-start md:self-auto"
          >
            <span>View All Apps</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mini Apps Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 hover:border-emerald-500/40 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Header Icon + Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {app.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  <Link href={`/apps/${app.slug}`}>
                    {app.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {app.description}
                </p>
              </div>

              {/* Action Button & Tags */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/apps/${app.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
                >
                  <span>Open App</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
