import Link from "next/link";
import {
  CodeXml,
  Video,
  Camera,
  FileText,
  BrainCircuit,
  AppWindow,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const typeConfig = {
  github: { icon: CodeXml, color: "text-gray-800 dark:text-gray-200", label: "GitHub" },
  youtube: { icon: Video, color: "text-red-600", label: "YouTube" },
  instagram: { icon: Camera, color: "text-pink-600", label: "Instagram" },
  claude_skill: { icon: BrainCircuit, color: "text-purple-600", label: "Claude Skill" },
  blog: { icon: FileText, color: "text-blue-600", label: "Blog" },
  miniapp: { icon: AppWindow, color: "text-emerald-600", label: "Mini App" },
};

interface ContentCardProps {
  item: {
    id: string;
    type: string;
    url?: string | null;
    title: string;
    description?: string | null;
    tags?: string[] | null;
    slug: string;
    createdAt: Date | string;
    metadata?: Record<string, unknown> | null;
  };
}

export function ContentCard({ item }: ContentCardProps) {
  const config = typeConfig[item.type as keyof typeof typeConfig] || typeConfig.blog;
  const Icon = config.icon;

  return (
    <Link
      href={`/p/${item.slug}`}
      className="group block p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 hover:border-primary/30"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <Icon className={`h-5 w-5 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span className={`font-medium ${config.color}`}>{config.label}</span>
            <span>·</span>
            <time>{formatDate(item.createdAt)}</time>
          </div>
          <h3 className="font-medium leading-snug group-hover:text-primary transition-colors truncate">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {item.url && (
          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </Link>
  );
}
