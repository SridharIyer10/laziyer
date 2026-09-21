"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  SHORTS_REELS_DATA, 
  VIDEO_LIBRARY_DATA, 
  VIDEO_PLAYLISTS_DATA, 
  VideoShortItem, 
  VideoLibraryItem, 
  VideoPlaylist 
} from "@/data/showcaseData";
import { 
  Play, 
  ExternalLink, 
  Flame, 
  BookOpen, 
  ListVideo, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Check, 
  Video as VideoIcon, 
  Sparkles, 
  Zap, 
  Clock, 
  User, 
  ArrowRight,
  Tv
} from "lucide-react";

export default function VideosPage() {
  const [selectedShort, setSelectedShort] = useState<VideoShortItem>(SHORTS_REELS_DATA[0]);
  const [activePlaylist, setActivePlaylist] = useState<VideoPlaylist | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<string>("All");

  const handleShare = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const isYouTube = selectedShort.platform === "youtube";

  // Filter video library
  const libraryCategories = ["All", "MCP", "Next.js", "AI Architecture", "PostgreSQL"];
  const filteredLibrary = VIDEO_LIBRARY_DATA.filter((item) => {
    if (libraryFilter === "All") return true;
    return item.tags.some((t) => t.toLowerCase().includes(libraryFilter.toLowerCase()));
  });

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
          <span className="text-primary">Videos &amp; Playlists</span>
        </div>

        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-3">
            <VideoIcon className="h-3.5 w-3.5 fill-current" />
            <span>Vertical Shorts, Masterclasses &amp; Curated Playlists</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Video Hub
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Watch bite-sized 60-second vertical breakdowns on Instagram &amp; YouTube Shorts, or dive into full architecture masterclasses and organized video playlists.
          </p>
        </div>

        {/* =================================================================== */}
        {/* TOP SECTION: 9:16 VERTICAL VIDEO EXPERIENCE (SHORTS & REELS)        */}
        {/* =================================================================== */}
        <div className="mb-20 p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center">
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  9:16 Vertical Video Player
                </h2>
                <p className="text-xs text-muted-foreground">
                  Select any short or reel to preview and watch directly
                </p>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-500/20">
              {SHORTS_REELS_DATA.length} Shorts Available
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Main 9:16 Vertical Screen */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-border shadow-2xl bg-black group">
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedShort.thumbnailUrl}
                  alt={selectedShort.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

                {/* Top Bar inside 9:16 Player */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                      isYouTube ? "bg-red-600" : "bg-pink-600"
                    }`}
                  >
                    {isYouTube ? "YouTube Short" : "Instagram Reel"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-xs font-mono backdrop-blur-md">
                    {selectedShort.duration}
                  </span>
                </div>

                {/* Center Play Button Action */}
                <a
                  href={selectedShort.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 rounded-full bg-white/95 text-foreground flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all cursor-pointer">
                    <Play className="h-7 w-7 fill-current ml-1 text-foreground" />
                  </div>
                </a>

                {/* Bottom Details inside 9:16 Player */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="flex items-center justify-between text-xs text-white/80 font-medium mb-1.5">
                    <span>{selectedShort.creator}</span>
                    {selectedShort.views && <span>{selectedShort.views} views</span>}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold leading-snug drop-shadow-md">
                    {selectedShort.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={selectedShort.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-md"
                    >
                      <span>Watch Full Short</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleShare(selectedShort.url)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer"
                      title="Share / copy link"
                    >
                      {copiedUrl ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Shorts & Reels Selector List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">
                  Select a Short to Preview:
                </h3>
                <span className="text-xs text-muted-foreground">
                  Click any card below
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto no-scrollbar p-1">
                {SHORTS_REELS_DATA.map((short) => {
                  const isSelected = selectedShort.id === short.id;
                  const isYt = short.platform === "youtube";

                  return (
                    <button
                      key={short.id}
                      type="button"
                      onClick={() => setSelectedShort(short)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-xs"
                          : "border-border bg-card hover:bg-muted/60"
                      }`}
                    >
                      {/* Mini Thumbnail */}
                      <div className="relative w-16 aspect-[9/16] rounded-xl overflow-hidden shrink-0 bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={short.thumbnailUrl}
                          alt={short.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] text-white font-mono">
                          {short.duration}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold text-white mb-1 ${
                            isYt ? "bg-red-600" : "bg-pink-600"
                          }`}
                        >
                          {isYt ? "YouTube" : "Instagram"}
                        </span>
                        <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight">
                          {short.title}
                        </h4>
                        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>{short.creator}</span>
                          {short.views && <span>{short.views}</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM SECTION 1: CURATED PLAYLISTS                                 */}
        {/* =================================================================== */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ListVideo className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Curated Playlists &amp; Series
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Structured learning tracks organized by AI domain
                </p>
              </div>
            </div>

            <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">
              {VIDEO_PLAYLISTS_DATA.length} Series Available
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {VIDEO_PLAYLISTS_DATA.map((playlist) => (
              <div
                key={playlist.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  {/* Playlist Thumbnail Cover */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={playlist.thumbnailUrl}
                      alt={playlist.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Right side playlist overlay badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 text-white text-xs font-bold backdrop-blur-md">
                      <ListVideo className="h-3.5 w-3.5 text-primary" />
                      <span>{playlist.videoCount} Videos</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                        Curated Series
                      </span>
                      <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-2">
                        {playlist.title}
                      </h3>
                    </div>
                  </div>

                  {/* Playlist Description */}
                  <div className="p-5">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {playlist.description}
                    </p>

                    {/* Included video episodes */}
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Tv className="h-3.5 w-3.5 text-primary" />
                        <span>Included Masterclasses:</span>
                      </div>
                      {playlist.videos.map((vid, idx) => (
                        <div
                          key={vid.id}
                          className="flex items-center justify-between text-xs text-muted-foreground p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <span className="truncate pr-2">
                            <strong className="text-foreground">{idx + 1}.</strong> {vid.title}
                          </span>
                          <span className="font-mono text-[10px] shrink-0">{vid.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {playlist.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={playlist.videos[0]?.url || "https://youtube.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <span>Play Series</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM SECTION 2: VIDEO LIBRARY MASTERCLASSES                      */}
        {/* =================================================================== */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Video Library &amp; Deep Dives
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Full 1080p architecture tutorials with code walkthroughs
                </p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted border border-border">
              {libraryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setLibraryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    libraryFilter === cat
                      ? "bg-card text-foreground shadow-xs border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {filteredLibrary.map((video) => (
              <div
                key={video.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  {/* 16:9 Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* YouTube Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-600 text-white shadow-md">
                        YouTube
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-white text-xs font-mono font-medium backdrop-blur-xs">
                        {video.duration}
                      </span>
                    </div>

                    {/* Play Hover Overlay */}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <div className="w-13 h-13 rounded-full bg-white text-foreground flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 fill-current ml-0.5 text-foreground" />
                      </div>
                    </a>
                  </div>

                  {/* Text Content */}
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      <span>{video.authorName}</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/p/${video.slug}`}>
                        {video.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>

                {/* Footer Tags & Watch Link */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0"
                    >
                      <span>Watch</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
