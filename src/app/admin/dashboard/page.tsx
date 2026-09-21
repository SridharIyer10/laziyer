"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ContentCard } from "@/components/ContentCard";
import { Plus, Loader2, Trash2 } from "lucide-react";

interface ContentItem {
  id: string;
  type: string;
  url?: string | null;
  title: string;
  description?: string | null;
  body?: string | null;
  tags?: string[] | null;
  slug: string;
  createdAt: string | Date;
  metadata?: Record<string, unknown> | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchItems();
    }
  }, [status]);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setItems(data);
    } catch {
      console.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url || undefined,
          title: title || undefined,
          description: description || undefined,
          body: body || undefined,
          type: type || undefined,
          tags: tags ? tags.split(",").map((t) => t.trim()) : undefined,
        }),
      });
      if (res.ok) {
        setUrl("");
        setTitle("");
        setDescription("");
        setBody("");
        setType("");
        setTags("");
        setShowForm(false);
        fetchItems();
      }
    } catch (err) {
      console.error("Failed to create:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      await fetch(`/api/content/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {session?.user?.email}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 rounded-lg border space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Content Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm"
              >
                <option value="">Auto-detect</option>
                <option value="blog">Blog</option>
                <option value="github">GitHub</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="claude_skill">Claude Skill</option>
                <option value="miniapp">Mini App</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="react, tutorial, machine-learning"
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL (for links)</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Auto-extracted if URL provided"
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description"
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content / Blog Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Write your content here..."
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm resize-y"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg border text-sm hover:bg-secondary transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-2">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No content yet. Click &ldquo;New Post&rdquo; to add your first item.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="group relative">
                <ContentCard item={item} />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
