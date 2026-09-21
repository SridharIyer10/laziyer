import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
  vector,
  integer,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ─── Users ────────────────────────────────────────────────────────────────────
export const userRoles = ["admin", "viewer"] as const;

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: userRoles }).default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── API Keys (AES-256-GCM encrypted, retrievable) ───────────────────────────
export const apiKeyServices = ["openai", "github", "anthropic", "custom"] as const;

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  service: text("service", { enum: apiKeyServices }).notNull(),
  keyEncrypted: text("key_encrypted").notNull(),
  keyIv: text("key_iv").notNull(),
  keyTag: text("key_tag").notNull(),
  keyPrefix: text("key_prefix").notNull(), // first 8 chars plaintext for display
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastUsedAt: timestamp("last_used_at"),
});

// ─── Tags (global taxonomy) ───────────────────────────────────────────────────
export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  color: text("color").default("#6366f1").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Content Tags (polymorphic junction) ─────────────────────────────────────
export const contentTagTypes = ["skill", "prompt", "article", "video"] as const;
export type ContentTagType = (typeof contentTagTypes)[number];

export const contentTags = pgTable(
  "content_tags",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tagId: uuid("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
    contentType: text("content_type", { enum: contentTagTypes }).notNull(),
    contentId: uuid("content_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("content_tags_unique_idx").on(t.tagId, t.contentType, t.contentId)]
);

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  body: text("body"), // markdown
  version: text("version"),
  installCommand: text("install_command"),
  promptSnippet: text("prompt_snippet"),
  externalUrl: text("external_url"),
  thumbnailUrl: text("thumbnail_url"),
  downloadUrl: text("download_url"),
  redirectUrl: text("redirect_url"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  embedding: vector("embedding", { dimensions: 1536 }),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Prompts ──────────────────────────────────────────────────────────────────
export const promptRoles = ["system", "user", "assistant"] as const;

export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  body: text("body").notNull(), // the actual prompt text
  role: text("role", { enum: promptRoles }).default("system").notNull(),
  useCase: text("use_case"),
  downloadUrl: text("download_url"),
  redirectUrl: text("redirect_url"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  embedding: vector("embedding", { dimensions: 1536 }),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Articles ─────────────────────────────────────────────────────────────────
export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  body: text("body"), // markdown
  coverImageUrl: text("cover_image_url"),
  readingTimeMinutes: integer("reading_time_minutes"),
  externalUrl: text("external_url"), // redirect to external article
  downloadUrl: text("download_url"), // PDF or file download
  redirectUrl: text("redirect_url"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  embedding: vector("embedding", { dimensions: 1536 }),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
  isPublished: boolean("is_published").default(true).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Videos ───────────────────────────────────────────────────────────────────
export const videoPlatforms = ["youtube", "instagram", "vimeo", "other"] as const;
export const videoFormats = ["short", "long", "course"] as const;

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  url: text("url"),
  thumbnailUrl: text("thumbnail_url"),
  durationSeconds: integer("duration_seconds"),
  platform: text("platform", { enum: videoPlatforms }).default("youtube").notNull(),
  format: text("format", { enum: videoFormats }).default("long").notNull(),
  downloadUrl: text("download_url"),
  redirectUrl: text("redirect_url"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  embedding: vector("embedding", { dimensions: 1536 }),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Playlists ────────────────────────────────────────────────────────────────
export const playlists = pgTable("playlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Video Playlists (ordered junction) ──────────────────────────────────────
export const videoPlaylists = pgTable(
  "video_playlists",
  {
    videoId: uuid("video_id")
      .references(() => videos.id, { onDelete: "cascade" })
      .notNull(),
    playlistId: uuid("playlist_id")
      .references(() => playlists.id, { onDelete: "cascade" })
      .notNull(),
    position: integer("position").default(0).notNull(),
  },
  (t) => [primaryKey({ columns: [t.videoId, t.playlistId] })]
);

// ─── Mini Apps (enhanced) ─────────────────────────────────────────────────────
export const miniApps = pgTable("mini_apps", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  description: text("description"),
  url: text("url"),
  icon: text("icon"),
  downloadUrl: text("download_url"),
  redirectUrl: text("redirect_url"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  embedding: vector("embedding", { dimensions: 1536 }),
  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Legacy content table (kept for backward compatibility) ───────────────────
export const contentTypes = [
  "github",
  "youtube",
  "instagram",
  "claude_skill",
  "blog",
  "miniapp",
] as const;
export type ContentType = (typeof contentTypes)[number];

export const content = pgTable("content", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type", { enum: contentTypes }).notNull(),
  url: text("url"),
  title: text("title").notNull(),
  description: text("description"),
  body: text("body"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  embedding: vector("embedding", { dimensions: 1536 }),
  tags: text("tags").array(),
  slug: text("slug").unique().notNull(),
  authorId: uuid("author_id").references(() => users.id),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
