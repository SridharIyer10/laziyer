"use client";

import { useState, useEffect } from "react";
import { AppWindow, ExternalLink, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface MiniApp {
  id: string;
  title: string;
  description?: string | null;
  url?: string | null;
  icon?: string | null;
  slug: string;
  createdAt: string;
}

export default function MiniAppsPage() {
  const [apps, setApps] = useState<MiniApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?type=miniapp")
      .then((r) => r.json())
      .then((data: MiniApp[]) => {
        setApps(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mini Apps</h1>
        <p className="mt-2 text-muted-foreground">
          Small utilities and tools I&apos;ve built. Free to use by anyone.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <AppWindow className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No mini apps yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <Link
              key={app.id}
              href={`/p/${app.slug}`}
              className="group p-4 rounded-lg border bg-card hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                  <AppWindow className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {app.title}
                  </h3>
                  {app.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {app.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <time>{formatDate(app.createdAt)}</time>
                    {app.url && (
                      <>
                        <span>·</span>
                        <ExternalLink className="h-3 w-3" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
