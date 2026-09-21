"use client";

import { useState } from "react";
import Link from "next/link";
import { AIPrompt } from "@/data/showcaseData";
import { MessageSquareCode, Copy, Check, Sparkles, Tag, ChevronDown, ChevronUp, Bot, ArrowRight } from "lucide-react";

interface PromptsSectionProps {
  prompts: AIPrompt[];
}

export function PromptsSection({ prompts }: PromptsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ["All", "Architecture", "Coding", "Reasoning", "Design"];

  const filteredPrompts = prompts.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="prompts" className="py-16 md:py-24 border-b border-border scroll-mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border/60 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <MessageSquareCode className="h-4 w-4" />
              <span>Prompt Engineering &amp; Roles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Prompts
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Curated system prompts and role definitions inspired by prompts.chat for deep reasoning, architectural reviews, and code refactoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted border border-border">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link
              href="/ailibrary?type=prompts"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all shadow-xs"
            >
              <span>Vault View</span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </Link>
          </div>
        </div>

        {/* Prompts Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPrompts.map((prompt) => {
            const isCopied = copiedId === prompt.id;
            const isExpanded = expandedId === prompt.id;

            return (
              <div
                key={prompt.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Category Pill & Model Recommendation */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-foreground text-xs font-semibold border border-border">
                      <Bot className="h-3 w-3 text-primary" />
                      {prompt.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      {prompt.modelRecommendation}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {prompt.role}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {prompt.description}
                  </p>

                  {/* Prompt Text Box */}
                  <div className="mt-4 p-3.5 rounded-lg bg-[#111111] text-zinc-100 border border-zinc-800 relative">
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                      <span>System Prompt</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(prompt.id, prompt.promptText)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-all hover:scale-105 cursor-pointer shadow-xs"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-zinc-400" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Collapsible prompt body */}
                    <div
                      className={`text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {prompt.promptText}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(prompt.id)}
                      className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? "Collapse Prompt" : "Expand Full Prompt"}</span>
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3 text-primary" />}
                    </button>
                  </div>
                </div>

                {/* Footer Tag Chips */}
                <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Tag className="h-3 w-3 text-muted-foreground/70" />
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(prompt.id, prompt.promptText)}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    {isCopied ? "✓ Copied" : "Copy to Clipboard"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View More CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/ailibrary?type=prompts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-all shadow-xs"
          >
            <span>View more Prompts in AI Library</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
