export interface ExtractedMetadata {
  title: string;
  description: string;
  metadata: Record<string, unknown>;
}

export async function extractGitHubMetadata(url: string): Promise<ExtractedMetadata> {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, "").replace(/#.*$/, "").replace(/\?.*$/, "");

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const data = await res.json();
  return {
    title: data.full_name || `${owner}/${cleanRepo}`,
    description: data.description || "",
    metadata: {
      owner,
      repo: cleanRepo,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics || [],
      url: data.html_url,
    },
  };
}

export async function extractYouTubeMetadata(url: string): Promise<ExtractedMetadata> {
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(oembedUrl);
  if (!res.ok) throw new Error(`YouTube oEmbed error: ${res.status}`);

  const data = await res.json();
  return {
    title: data.title || "YouTube Video",
    description: data.author_name ? `By ${data.author_name}` : "",
    metadata: {
      authorName: data.author_url,
      authorUrl: data.author_url,
      thumbnailUrl: data.thumbnail_url,
      thumbnailWidth: data.thumbnail_width,
      thumbnailHeight: data.thumbnail_height,
      url,
    },
  };
}

export async function extractInstagramMetadata(url: string): Promise<ExtractedMetadata> {
  const oembedUrl = `https://www.instagram.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const res = await fetch(oembedUrl);
  if (!res.ok) throw new Error(`Instagram oEmbed error: ${res.status}`);

  const data = await res.json();
  return {
    title: data.title || "Instagram Post",
    description: data.author_name ? `By ${data.author_name}` : "",
    metadata: {
      authorName: data.author_name,
      thumbnailUrl: data.thumbnail_url,
      url,
    },
  };
}

export async function extractMetadata(url: string, type: string): Promise<ExtractedMetadata> {
  switch (type) {
    case "github":
      return extractGitHubMetadata(url);
    case "youtube":
      return extractYouTubeMetadata(url);
    case "instagram":
      return extractInstagramMetadata(url);
    default:
      return { title: "New Post", description: "", metadata: { url } };
  }
}
