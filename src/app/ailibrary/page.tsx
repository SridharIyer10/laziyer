"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  SKILLS_DATA, 
  PROMPTS_DATA, 
  REPOS_DATA, 
  ClaudeSkill, 
  AIPrompt, 
  GitHubRepo 
} from "@/data/showcaseData";
import { 
  Search, 
  Sparkles, 
  MessageSquareCode, 
  GitFork, 
  Copy, 
  Check, 
  Star, 
  Terminal, 
  ExternalLink, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  Tag, 
  Layers, 
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  Zap,
  BookOpen
} from "lucide-react";

type LibraryType = "all" | "skills" | "prompts" | "repos";

function AILibraryContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as LibraryType) || "all";
  const initialQuery = searchParams.get("q") || "";

  const [activeType, setActiveType] = useState<LibraryType>(initialType);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"recommended" | "az" | "popular">("recommended");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPromptIds, setExpandedPromptIds] = useState<Record<string, boolean>>({});

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePromptExpand = (id: string) => {
    setExpandedPromptIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Collect all available unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    SKILLS_DATA.forEach((s) => s.tags.forEach((t) => tagsSet.add(t)));
    PROMPTS_DATA.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    REPOS_DATA.forEach((r) => r.tags.forEach((t) => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet).sort()];
  }, []);

  // Filter skills
  const filteredSkills = useMemo(() => {
    if (activeType !== "all" && activeType !== "skills") return [];
    return SKILLS_DATA.filter((s) => {
      const matchesSearch =
        !searchQuery ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.installCommand && s.installCommand.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === "All" || s.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [activeType, searchQuery, selectedTag]);

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    if (activeType !== "all" && activeType !== "prompts") return [];
    return PROMPTS_DATA.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === "All" || p.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [activeType, searchQuery, selectedTag]);

  // Filter repos
  const filteredRepos = useMemo(() => {
    if (activeType !== "all" && activeType !== "repos") return [];
    return REPOS_DATA.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === "All" || r.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [activeType, searchQuery, selectedTag]);

  const totalResults = filteredSkills.length + filteredPrompts.length + filteredRepos.length;

  const resetFilters = () => {
    setActiveType("all");
    setSearchQuery("");
    setSelectedTag("All");
    setSortBy("recommended");
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span>laziyer</span>
          </Link>
          <span>/</span>
          <span className="text-primary">AI Library</span>
        </div>

        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-3">
              <Layers className="h-3.5 w-3.5 fill-current" />
              <span>Comprehensive Knowledge Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              AI Library
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Explore and search our entire catalog of Claude skills, production system prompts, and open-source AI agent repositories.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card p-2 rounded-2xl border border-border shadow-xs self-start md:self-auto">
            <div className="text-center px-3 py-1 border-r border-border">
              <div className="text-lg font-extrabold text-foreground">{SKILLS_DATA.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-medium">Skills</div>
            </div>
            <div className="text-center px-3 py-1 border-r border-border">
              <div className="text-lg font-extrabold text-foreground">{PROMPTS_DATA.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-medium">Prompts</div>
            </div>
            <div className="text-center px-3 py-1">
              <div className="text-lg font-extrabold text-foreground">{REPOS_DATA.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-medium">Repos</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 space-y-5">
          {/* Main Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, package name, role, tag, or command (e.g. pgvector, mcp, architect, prompt)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-border bg-card text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Type Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted border border-border">
              <button
                type="button"
                onClick={() => setActiveType("all")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeType === "all"
                    ? "bg-card text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-4 w-4 text-primary" />
                <span>All Assets</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-muted text-[10px] text-muted-foreground">
                  {SKILLS_DATA.length + PROMPTS_DATA.length + REPOS_DATA.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveType("skills")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeType === "skills"
                    ? "bg-card text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Skills &amp; MCP</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-muted text-[10px] text-muted-foreground">
                  {SKILLS_DATA.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveType("prompts")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeType === "prompts"
                    ? "bg-card text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquareCode className="h-4 w-4 text-primary" />
                <span>Prompts &amp; Roles</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-muted text-[10px] text-muted-foreground">
                  {PROMPTS_DATA.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveType("repos")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeType === "repos"
                    ? "bg-card text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GitFork className="h-4 w-4 text-primary" />
                <span>Open-Source Repos</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-muted text-[10px] text-muted-foreground">
                  {REPOS_DATA.length}
                </span>
              </button>
            </div>

            {/* Total matching count & reset */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Showing <strong className="text-foreground">{totalResults}</strong> items</span>
              {(searchQuery || selectedTag !== "All" || activeType !== "all") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer font-medium"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Topic Tag Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
              <Tag className="h-3.5 w-3.5" />
              <span>Tags:</span>
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-[#151515] dark:bg-white text-white dark:text-black shadow-xs"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-10 space-y-12">
          {/* No results fallback */}
          {totalResults === 0 && (
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">No matching items found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                No skills, prompts, or repositories matched your query &ldquo;{searchQuery}&rdquo;. Try another term or reset your filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* 1. SKILLS SECTION */}
          {filteredSkills.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/70">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Skills &amp; MCP Servers ({filteredSkills.length})</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredSkills.map((skill) => {
                  const isCopied = copiedId === skill.id;
                  return (
                    <div
                      key={skill.id}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        {/* Top Category & Version Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-foreground text-xs font-semibold border border-border">
                            <Bot className="h-3.5 w-3.5 text-primary" />
                            {skill.category}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground font-medium">
                            {skill.version}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          <Link href={`/p/${skill.slug}`}>{skill.title}</Link>
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {skill.description}
                        </p>

                        {/* Install Box */}
                        {skill.installCommand && (
                          <div className="mt-4 flex items-center justify-between gap-2 p-3 rounded-xl bg-[#111111] text-zinc-100 border border-zinc-800 font-mono text-xs shadow-inner">
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-primary font-bold select-none">$</span>
                              <span className="truncate text-zinc-300">{skill.installCommand}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(skill.id, skill.installCommand!)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 transition-all shrink-0 hover:scale-105 cursor-pointer"
                              title="Copy installation command"
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
                        )}
                      </div>

                      {/* Footer Tags & Details link */}
                      <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/p/${skill.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          <span>Documentation</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. PROMPTS SECTION */}
          {filteredPrompts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/70">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <MessageSquareCode className="h-4 w-4 text-primary" />
                  <span>Prompts &amp; Role Templates ({filteredPrompts.length})</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredPrompts.map((prompt) => {
                  const isCopied = copiedId === prompt.id;
                  const isExpanded = !!expandedPromptIds[prompt.id];

                  return (
                    <div
                      key={prompt.id}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        {/* Category & Model Pill */}
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

                        {/* Title */}
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {prompt.role}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {prompt.description}
                        </p>

                        {/* Prompt Box */}
                        <div className="mt-4 p-3.5 rounded-xl bg-[#111111] text-zinc-100 border border-zinc-800 relative">
                          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                            <span>System Prompt Definition</span>
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

                          <div
                            className={`text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap ${
                              isExpanded ? "" : "line-clamp-3"
                            }`}
                          >
                            {prompt.promptText}
                          </div>

                          <button
                            type="button"
                            onClick={() => togglePromptExpand(prompt.id)}
                            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                          >
                            <span>{isExpanded ? "Collapse Prompt" : "Expand Full Prompt"}</span>
                            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3 text-primary" />}
                          </button>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5 items-center">
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
            </div>
          )}

          {/* 3. REPOS SECTION */}
          {filteredRepos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/70">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <GitFork className="h-4 w-4 text-primary" />
                  <span>Open-Source Repositories ({filteredRepos.length})</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredRepos.map((repo) => {
                  const isCopied = copiedId === repo.id;

                  return (
                    <div
                      key={repo.id}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        {/* Language & Stats */}
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
                            title="Open repository on GitHub"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          <a href={repo.url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                          </a>
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {repo.description}
                        </p>

                        {/* Clone Box */}
                        <div className="mt-4 flex items-center justify-between gap-2 p-3 rounded-xl bg-[#111111] border border-zinc-800 font-mono text-xs text-zinc-100 shadow-inner">
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

                      {/* Footer Tags */}
                      <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5 items-center">
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
                          <span>View on GitHub</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AILibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted-foreground">
          Loading AI Library...
        </div>
      }
    >
      <AILibraryContent />
    </Suspense>
  );
}
