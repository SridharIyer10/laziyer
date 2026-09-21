import { notFound } from "next/navigation";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { AppWindow, ExternalLink, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await db.query.content.findFirst({
    where: eq(schema.content.slug, slug),
  });
  if (!item) return { title: "Not Found" };
  return { title: `${item.title} - Mini Apps`, description: item.description || "" };
}

export default async function MiniAppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await db.query.content.findFirst({
    where: eq(schema.content.slug, slug),
  });
  if (!item || item.type !== "miniapp") notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <AppWindow className="h-4 w-4 text-emerald-600" />
          <span className="font-medium text-emerald-600">Mini App</span>
          <span>·</span>
          <Calendar className="h-3.5 w-3.5" />
          <time>{formatDate(item.createdAt)}</time>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>

        {item.description && (
          <p className="mt-3 text-lg text-muted-foreground">{item.description}</p>
        )}

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Open App
          </a>
        )}
      </div>

      {item.url && (
        <div className="rounded-lg border overflow-hidden aspect-video bg-secondary">
          <iframe
            src={item.url}
            title={item.title}
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      )}

      {item.body && (
        <div className="mt-8 prose prose-sm dark:prose-invert max-w-none">
          {item.body.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
