"use client";

import { useState } from "react";
import Link from "next/link";
import { GitHubRepo } from "@/data/showcaseData";
import { GitFork, Star, Copy, Check, Terminal, ExternalLink, Tag, ArrowRight } from "lucide-react";

interface ReposSectionProps {
  repos: GitHubRepo[];
}

export function ReposSection({ repos }: ReposSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="repos" className="py-16 md:py-24 border-b border-border scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border/60 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <GitFork className="h-4 w-4" />
              <span>Open Source AI Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Repos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Curated open-source repositories powering modern AI agent systems, Model Context Protocol servers, and database vector extensions.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/ailibrary?type=repos"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all shadow-xs"
            >
              <span>Explore All Repos</span>
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
            </Link>
            <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border shrink-0 font-medium">
              {repos.length} Repositories
            </div>
          </div>
        </div>

        {/* Repos Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {repos.map((repo) => {
            const isCopied = copiedId === repo.id;

            return (
              <div
                key={repo.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Top Stats & Language Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        {repo.language}
                      </span>
                      <span>·</span>
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

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      title="Open on GitHub"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Repo Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {repo.description}
                  </p>

                  {/* Clone Command Box */}
                  <div className="mt-4 flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#111111] border border-zinc-800 font-mono text-xs text-zinc-100">
                    <div className="flex items-center gap-2 truncate">
                      <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate text-zinc-300">{repo.cloneCommand}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(repo.id, repo.cloneCommand)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 transition-all shrink-0 hover:scale-105 cursor-pointer"
                      title="Copy clone command"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-zinc-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer Tag Chips & Direct Link */}
                <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Tag className="h-3 w-3 text-muted-foreground/70" />
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View More CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/ailibrary?type=repos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-all shadow-xs"
          >
            <span>View more Repos in AI Library</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
