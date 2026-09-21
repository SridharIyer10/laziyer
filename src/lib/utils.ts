import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function detectContentType(url: string): string | null {
  if (!url) return "blog";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("github.com")) return "github";
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) return "youtube";
    if (parsed.hostname.includes("instagram.com")) return "instagram";
    if (parsed.hostname.includes("claude") || parsed.hostname.includes("anthropic")) return "claude_skill";
    return "blog";
  } catch {
    return "blog";
  }
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
