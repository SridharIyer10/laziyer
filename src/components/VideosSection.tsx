"use client";

import { useRef } from "react";
import { VideoShortItem, VideoLibraryItem } from "@/data/showcaseData";
import { Video, Play, ExternalLink, Flame, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface VideosSectionProps {
  shorts: VideoShortItem[];
  library: VideoLibraryItem[];
}

export function VideosSection({ shorts, library }: VideosSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Duplicate shorts array for seamless infinite marquee effect
  const marqueeShorts = [...shorts, ...shorts, ...shorts];

  return (
    <section id="videos" className="py-16 md:py-24 border-b border-border scroll-mt-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border/60 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <Video className="h-4 w-4" />
              <span>Shorts, Reels &amp; Video Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Videos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Quick 60-second AI breakdowns across Instagram &amp; YouTube Shorts, plus comprehensive deep-dive video masterclasses.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/videos"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all shadow-xs"
            >
              <span>Explore Video Hub &amp; Playlists</span>
              <ExternalLink className="h-3.5 w-3.5 text-primary" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 1: CONTINUOUS HORIZONTAL SCROLL SHORTS & REELS */}
        {/* ---------------------------------------------------- */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Shorts &amp; Reels Stream
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                Continuous Scroll
              </span>
            </div>

            {/* Manual Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Marquee & Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="animate-marquee gap-4 flex hover:pause">
              {marqueeShorts.map((short, idx) => {
                const isYouTube = short.platform === "youtube";

                return (
                  <div
                    key={`${short.id}-${idx}`}
                    className="group relative w-48 sm:w-56 shrink-0 aspect-[9/16] rounded-2xl overflow-hidden border border-border bg-card shadow-xs hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {/* Thumbnail Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={short.thumbnailUrl}
                      alt={short.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-sm ${
                          isYouTube ? "bg-red-600" : "bg-pink-600"
                        }`}
                      >
                        {isYouTube ? "YouTube Short" : "Instagram Reel"}
                      </span>

                      <span className="px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono backdrop-blur-xs">
                        {short.duration}
                      </span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-foreground flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                        <Play className="h-4 w-4 fill-current ml-0.5 text-foreground" />
                      </div>
                    </div>

                    {/* Bottom Metadata & Title */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] text-white/80 font-medium mb-1 flex items-center justify-between">
                        <span>{short.creator}</span>
                        {short.views && <span>{short.views} views</span>}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2 drop-shadow-xs">
                        {short.title}
                      </h4>

                      <a
                        href={short.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-orange-400 hover:text-orange-300"
                      >
                        <span>Watch Video</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PART 2: VIDEO LIBRARY (FULL YOUTUBE & EMBEDDED)     */}
        {/* ---------------------------------------------------- */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/60">
            <BookOpen className="h-4 w-4 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Video Library &amp; Architecture Deep Dives
            </h3>
            <span className="text-xs text-muted-foreground ml-auto font-medium">
              {library.length} Masterclasses
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {library.map((video) => (
              <div
                key={video.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-200"
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
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-600 text-white shadow-sm">
                        YouTube
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-black/75 text-white text-[10px] font-mono font-medium backdrop-blur-xs">
                        {video.duration}
                      </span>
                    </div>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-11 h-11 rounded-full bg-white/95 text-foreground flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 fill-current ml-0.5 text-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-4 sm:p-5">
                    <div className="text-xs text-muted-foreground font-medium mb-1">
                      {video.authorName}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/p/${video.slug}`}>
                        {video.title}
                      </Link>
                    </h4>

                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>

                {/* Footer Tags & Watch Link */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                    >
                      <span>Watch</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom View More Videos & Playlists CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-dark transition-all shadow-md hover:scale-105"
            >
              <Video className="h-4 w-4" />
              <span>Explore All Videos &amp; Playlists</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
