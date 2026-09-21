"use client";

import Link from "next/link";
import { ArrowUp, Sparkles, Zap, Layers, Video } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">laziyer</div>
              <p className="text-xs text-muted-foreground">
                A free platform for AI related information that I find interesting.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground">
            <Link href="/ailibrary" className="hover:text-primary transition-colors flex items-center gap-1 font-semibold text-foreground">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span>AI Library</span>
            </Link>
            <Link href="/videos" className="hover:text-primary transition-colors flex items-center gap-1 font-semibold text-foreground">
              <Video className="h-3.5 w-3.5 text-red-500" />
              <span>Videos Hub</span>
            </Link>
            <a href="/#skills" className="hover:text-foreground transition-colors">
              Skills
            </a>
            <a href="/#prompts" className="hover:text-foreground transition-colors">
              Prompts
            </a>
            <a href="/#repos" className="hover:text-foreground transition-colors">
              Repos
            </a>
            <a href="/#about" className="hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* Back to Top */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shadow-xs"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} laziyer. Curated by Srikanth with Next.js 16, pgvector &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
              <Sparkles className="h-3 w-3" />
              100% Free &amp; Open
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
