"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  MessageSquareCode, 
  GitFork, 
  Video, 
  User, 
  ArrowDown, 
  Search, 
  Code2, 
  Flame,
  Zap,
  Layers,
  ArrowRight
} from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function HeroSection({ onSearch, searchQuery }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  const jumpTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 70;
      const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-22 md:pb-24 overflow-hidden border-b border-border">
      {/* Background radial highlight */}
      <div className="absolute inset-0 pointer-events-none radial-glow opacity-90" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* TasteSkill style pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-5 sm:mb-6 animate-in fade-in duration-300">
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>Curated AI Intelligence &amp; Open Skills</span>
        </div>

        {/* Hero Title: laziyer */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-4xl mx-auto">
          laziyer
        </h1>

        {/* Explicit requested statement */}
        <p className="mt-4 sm:mt-5 text-lg sm:text-2xl md:text-3xl font-medium text-foreground max-w-3xl mx-auto leading-snug px-2">
          A free platform for AI related information that I find interesting.
        </p>

        {/* Supporting description */}
        <p className="mt-3 text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
          Explore curated <span className="text-foreground font-semibold">Skills</span> &amp; MCP servers, copyable{" "}
          <span className="text-foreground font-semibold">Prompts</span>, open-source AI{" "}
          <span className="text-foreground font-semibold">Repos</span>, and continuous video{" "}
          <span className="text-foreground font-semibold">Shorts &amp; Tutorials</span>.
        </p>

        {/* Integrated Real-time Hybrid Search */}
        <div className="mt-7 sm:mt-8 max-w-2xl mx-auto px-1 sm:px-0">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search skills, prompts, repos, shorts, and video tutorials..."
              className="w-full pl-10 sm:pl-11 pr-20 sm:pr-24 py-3 sm:py-3.5 rounded-2xl border border-border bg-card text-foreground text-xs sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-muted-foreground"
            />
            {inputValue ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-2 px-3 flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            ) : (
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] text-muted-foreground bg-muted border border-border rounded font-mono">
                  Hybrid Search
                </kbd>
              </div>
            )}
          </form>
        </div>

        {/* Quick Link Buttons: AI Library & Videos */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/ailibrary"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-dark transition-all shadow-xs"
          >
            <Layers className="h-4 w-4" />
            <span>Open AI Library</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs sm:text-sm font-semibold text-foreground transition-all shadow-xs"
          >
            <Video className="h-4 w-4 text-red-500" />
            <span>Explore Video Hub</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Section Jump Nav Buttons */}
        <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto px-1">
          <button
            type="button"
            onClick={() => jumpTo("skills")}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/50 shadow-xs cursor-pointer active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span>Skills</span>
          </button>

          <button
            type="button"
            onClick={() => jumpTo("prompts")}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/50 shadow-xs cursor-pointer active:scale-95"
          >
            <MessageSquareCode className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span>Prompts</span>
          </button>

          <button
            type="button"
            onClick={() => jumpTo("repos")}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/50 shadow-xs cursor-pointer active:scale-95"
          >
            <GitFork className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span>Repos</span>
          </button>

          <button
            type="button"
            onClick={() => jumpTo("videos")}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/50 shadow-xs cursor-pointer active:scale-95"
          >
            <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
            <span>Videos</span>
          </button>

          <button
            type="button"
            onClick={() => jumpTo("about")}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-card hover:bg-muted border border-border text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/50 shadow-xs cursor-pointer active:scale-95"
          >
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span>About</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto pt-6 border-t border-border text-left">
          <Link href="/ailibrary?type=skills" className="p-3 sm:p-3.5 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors group">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Skills &amp; MCP</span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">Ready-to-use subagents &amp; tool servers</p>
          </Link>

          <Link href="/ailibrary?type=prompts" className="p-3 sm:p-3.5 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors group">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
              <Code2 className="h-3.5 w-3.5" />
              <span>Prompt Vault</span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">Production prompts for AI models</p>
          </Link>

          <Link href="/ailibrary?type=repos" className="p-3 sm:p-3.5 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors group">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
              <GitFork className="h-3.5 w-3.5" />
              <span>Curated Repos</span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">Top open-source AI projects</p>
          </Link>

          <Link href="/videos" className="p-3 sm:p-3.5 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors group">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500 mb-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span>Shorts &amp; Library</span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">Continuous scroll reels &amp; videos</p>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => jumpTo("skills")}
            aria-label="Scroll to content sections"
            className="group p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
