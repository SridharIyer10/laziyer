"use client";

import { useState } from "react";
import { ClaudeSkill } from "@/data/showcaseData";
import { Sparkles, Copy, Check, Terminal, ExternalLink, Tag, Code2, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SkillsSectionProps {
  skills: ClaudeSkill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-24 border-b border-border scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-border/70 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1.5 sm:mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Model Context Protocol &amp; Subagents</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Skills
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl">
              Production-ready Claude skills, MCP servers, and agent workflows you can install and use immediately in your terminal or Claude Desktop.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/ailibrary?type=skills"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all shadow-xs"
            >
              <span>Explore in AI Library</span>
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
            </Link>
            <div className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border shrink-0 font-medium">
              {skills.length} Skills
            </div>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {skills.map((skill) => {
            const isCopied = copiedId === skill.id;
            const isExpanded = expandedId === skill.id;
            const copyText = skill.installCommand || skill.promptSnippet || "";

            return (
              <div
                key={skill.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Category & Version Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-muted text-foreground text-[11px] sm:text-xs font-semibold border border-border">
                      <Code2 className="h-3 w-3 text-primary" />
                      {skill.category}
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-mono">
                      {skill.version} · by {skill.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/p/${skill.slug}`}>
                      {skill.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>

                  {/* TasteSkill style Dark Terminal Install Box */}
                  {skill.installCommand && (
                    <div className="mt-4 flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-[#111111] text-zinc-100 font-mono text-xs shadow-inner border border-zinc-800">
                      <div className="flex items-center gap-2 truncate">
                        <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-primary font-bold select-none">$</span>
                        <span className="truncate text-zinc-300">{skill.installCommand}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(skill.id, copyText)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 transition-all shrink-0 hover:scale-105 cursor-pointer active:scale-95"
                        title="Copy command to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-zinc-400" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Expandable Prompt / Schema Preview */}
                  {skill.promptSnippet && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => toggleExpand(skill.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Instructions" : "View Prompt Snippet"}</span>
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3 rounded-xl bg-muted/60 border border-border text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap animate-in fade-in duration-150">
                          {skill.promptSnippet}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Tags & Links */}
                <div className="mt-5 pt-3.5 border-t border-border flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Tag className="h-3 w-3 text-muted-foreground/70" />
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {skill.url && (
                    <a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>Repository</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View More CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/ailibrary?type=skills"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-all shadow-xs"
          >
            <span>View more Skills in AI Library</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
