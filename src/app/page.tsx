"use client";

import { useState, useEffect, useCallback } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PromptsSection } from "@/components/PromptsSection";
import { ReposSection } from "@/components/ReposSection";
import { VideosSection } from "@/components/VideosSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { ContentCard } from "@/components/ContentCard";
import { 
  SKILLS_DATA, 
  PROMPTS_DATA, 
  REPOS_DATA, 
  SHORTS_REELS_DATA,
  VIDEO_LIBRARY_DATA,
  ClaudeSkill,
  AIPrompt,
  GitHubRepo,
  VideoShortItem,
  VideoLibraryItem
} from "@/data/showcaseData";
import { Search, Loader2, X } from "lucide-react";

interface SearchResult {
  id: string;
  type: string;
  url?: string | null;
  title: string;
  description?: string | null;
  tags?: string[] | null;
  slug: string;
  created_at: string;
  createdAt: string;
  metadata?: Record<string, unknown> | null;
}

interface DbContentItem {
  id: string;
  type: string;
  url?: string | null;
  title: string;
  description?: string | null;
  body?: string | null;
  tags?: string[] | null;
  slug: string;
  createdAt: string;
  metadata?: Record<string, unknown> | null;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Dynamic state populated from DB or static showcase data
  const [skills, setSkills] = useState<ClaudeSkill[]>(SKILLS_DATA);
  const [prompts] = useState<AIPrompt[]>(PROMPTS_DATA);
  const [repos] = useState<GitHubRepo[]>(REPOS_DATA);
  const [shorts] = useState<VideoShortItem[]>(SHORTS_REELS_DATA);
  const [library, setLibrary] = useState<VideoLibraryItem[]>(VIDEO_LIBRARY_DATA);

  // Fetch live items from DB to complement showcase data if available
  useEffect(() => {
    async function loadDbContent() {
      try {
        const res = await fetch("/api/content?limit=100");
        if (!res.ok) return;
        const items = (await res.json()) as DbContentItem[];
        if (!Array.isArray(items) || items.length === 0) return;

        const dbSkills: ClaudeSkill[] = [];
        const dbLibrary: VideoLibraryItem[] = [];

        items.forEach((item) => {
          if (item.type === "claude_skill") {
            dbSkills.push({
              id: item.id,
              title: item.title,
              slug: item.slug,
              description: item.description || "",
              tags: item.tags || [],
              version: (item.metadata?.version as string) || "v1.0.0",
              author: (item.metadata?.author as string) || "Srikanth",
              category: "MCP Server",
              installCommand: (item.metadata?.installCommand as string) || `npx skills add ${item.slug}`,
              promptSnippet: item.body || undefined,
              url: item.url || undefined,
            });
          } else if (item.type === "youtube") {
            dbLibrary.push({
              id: item.id,
              title: item.title,
              slug: item.slug,
              type: "youtube",
              description: item.description || "",
              url: item.url || "#",
              thumbnailUrl:
                (item.metadata?.thumbnailUrl as string) ||
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
              authorName: (item.metadata?.authorName as string) || "Srikanth Tech",
              duration: "Full Video",
              tags: item.tags || [],
            });
          }
        });

        if (dbSkills.length > 0) setSkills([...dbSkills, ...SKILLS_DATA]);
        if (dbLibrary.length > 0) setLibrary([...dbLibrary, ...VIDEO_LIBRARY_DATA]);
      } catch (err) {
        console.error("Failed to load initial DB content:", err);
      }
    }

    loadDbContent();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const params = new URLSearchParams({ q: trimmed });
      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      
      const results: SearchResult[] = (data.results as SearchResult[]) || [];

      // Fallback local match across static showcase items if DB has no matches
      if (results.length === 0) {
        const qLower = trimmed.toLowerCase();
        
        // Search skills
        skills.forEach((s) => {
          if (s.title.toLowerCase().includes(qLower) || s.description.toLowerCase().includes(qLower) || s.tags.some(t => t.toLowerCase().includes(qLower))) {
            results.push({
              id: s.id,
              type: "claude_skill",
              title: s.title,
              description: s.description,
              tags: s.tags,
              slug: s.slug,
              created_at: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              url: s.url,
            });
          }
        });

        // Search prompts
        prompts.forEach((p) => {
          if (p.role.toLowerCase().includes(qLower) || p.description.toLowerCase().includes(qLower) || p.promptText.toLowerCase().includes(qLower)) {
            results.push({
              id: p.id,
              type: "claude_skill",
              title: p.role,
              description: p.description,
              tags: p.tags,
              slug: p.slug,
              created_at: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            });
          }
        });

        // Search repos
        repos.forEach((r) => {
          if (r.name.toLowerCase().includes(qLower) || r.description.toLowerCase().includes(qLower) || r.language.toLowerCase().includes(qLower)) {
            results.push({
              id: r.id,
              type: "github",
              title: r.name,
              description: r.description,
              tags: r.tags,
              slug: r.slug,
              created_at: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              url: r.url,
            });
          }
        });

        // Search video shorts and library
        shorts.forEach((v) => {
          if (v.title.toLowerCase().includes(qLower) || v.creator.toLowerCase().includes(qLower)) {
            results.push({
              id: v.id,
              type: v.platform === "youtube" ? "youtube" : "instagram",
              title: v.title,
              description: `${v.creator} · ${v.views || "Short Video"}`,
              slug: v.slug,
              created_at: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              url: v.url,
              metadata: { thumbnailUrl: v.thumbnailUrl, authorName: v.creator },
            });
          }
        });

        library.forEach((v) => {
          if (v.title.toLowerCase().includes(qLower) || v.description.toLowerCase().includes(qLower)) {
            results.push({
              id: v.id,
              type: "youtube",
              title: v.title,
              description: v.description,
              tags: v.tags,
              slug: v.slug,
              created_at: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              url: v.url,
              metadata: { thumbnailUrl: v.thumbnailUrl, authorName: v.authorName },
            });
          }
        });
      }

      setSearchResults(results);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [skills, prompts, repos, shorts, library]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section for laziyer with Real-time Search */}
      <HeroSection onSearch={handleSearch} searchQuery={searchQuery} />

      {/* 2. Live Search Results Banner / Overlay */}
      {searchQuery.trim() !== "" && (
        <section className="py-10 bg-muted/40 border-b border-border/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Search Results for &ldquo;{searchQuery}&rdquo;
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                  {searchResults.length} {searchResults.length === 1 ? "match" : "matches"}
                </span>
              </div>
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Close Search</span>
              </button>
            </div>

            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No results found for &ldquo;{searchQuery}&rdquo;.</p>
                <p className="text-xs mt-1">Try keywords like &ldquo;Claude&rdquo;, &ldquo;MCP&rdquo;, &ldquo;Prompt&rdquo;, &ldquo;pgvector&rdquo;, or &ldquo;Architect&rdquo;.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Skills Section */}
      <SkillsSection skills={skills} />

      {/* 4. Prompts Section (inspired by prompts.chat) */}
      <PromptsSection prompts={prompts} />

      {/* 5. Repos Section (GitHub Open Source Projects) */}
      <ReposSection repos={repos} />

      {/* 6. Videos Section (Continuous Horizontal Scroll Shorts & Reels + Video Library Grid) */}
      <VideosSection shorts={shorts} library={library} />

      {/* 7. About Section */}
      <AboutSection />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
