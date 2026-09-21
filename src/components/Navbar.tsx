"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Sparkles, 
  MessageSquareCode, 
  GitFork, 
  Video, 
  User, 
  Menu, 
  X,
  Zap
} from "lucide-react";

const navItems = [
  { href: "/#skills", label: "Skills", icon: Sparkles, sectionId: "skills" },
  { href: "/#prompts", label: "Prompts", icon: MessageSquareCode, sectionId: "prompts" },
  { href: "/#repos", label: "Repos", icon: GitFork, sectionId: "repos" },
  { href: "/#videos", label: "Videos", icon: Video, sectionId: "videos" },
  { href: "/#about", label: "About", icon: User, sectionId: "about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const sections = ["skills", "prompts", "repos", "videos", "about"];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const navHeight = 64;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border/90 bg-background/90 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-background/60 backdrop-blur-xs"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-4">
        {/* Brand: laziyer in TasteSkill style */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group font-bold text-lg tracking-tight hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
            <Zap className="h-4.5 w-4.5 text-primary fill-current" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-foreground">laziyer</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/30">
              AI Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation: skills, prompts, repos, videos, about */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border bg-card/80 shadow-xs backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === "/" && activeSection === item.sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm rounded-full transition-all font-medium cursor-pointer",
                  isActive
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle Icon */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted shadow-xs cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-3 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === "/" && activeSection === item.sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-muted font-bold text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
