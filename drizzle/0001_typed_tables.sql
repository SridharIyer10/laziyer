-- Migration: 0001_typed_tables
-- Adds purpose-built typed tables for skills, prompts, articles, videos,
-- a global tags taxonomy, API key storage (AES-256-GCM encrypted), and
-- enhances the existing users and mini_apps tables.
-- Safe to run multiple times (all statements use IF NOT EXISTS / IF EXISTS guards).

-- ─── Extensions ───────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS vector;

-- ─── Alter users (add role + updatedAt) ──────────────────────────────────────
ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "role" text NOT NULL DEFAULT 'admin',
  ADD COLUMN IF NOT EXISTS "updated_at" timestamp NOT NULL DEFAULT now();

-- ─── API Keys ─────────────────────────────────────────────────────────────────
-- Stores API keys encrypted with AES-256-GCM.
-- key_prefix holds the first 8 plaintext chars for identification in the UI.
CREATE TABLE IF NOT EXISTS "api_keys" (
  "id"            uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id"       uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "name"          text NOT NULL,
  "service"       text NOT NULL CHECK (service IN ('openai', 'github', 'anthropic', 'custom')),
  "key_encrypted" text NOT NULL,
  "key_iv"        text NOT NULL,
  "key_tag"       text NOT NULL,
  "key_prefix"    text NOT NULL,
  "is_active"     boolean NOT NULL DEFAULT true,
  "created_at"    timestamp NOT NULL DEFAULT now(),
  "last_used_at"  timestamp
);
CREATE INDEX IF NOT EXISTS "idx_api_keys_user" ON "api_keys" ("user_id", "is_active");

-- ─── Tags ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "tags" (
  "id"         uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name"       text NOT NULL,
  "slug"       text NOT NULL,
  "color"      text NOT NULL DEFAULT '#6366f1',
  "created_at" timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "tags_name_unique" UNIQUE ("name"),
  CONSTRAINT "tags_slug_unique" UNIQUE ("slug")
);

-- ─── Content Tags (polymorphic junction) ─────────────────────────────────────
-- Stores tag associations for all content types without separate junction tables.
-- content_type is validated via CHECK; referential integrity is app-enforced.
CREATE TABLE IF NOT EXISTS "content_tags" (
  "id"           uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tag_id"       uuid NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE,
  "content_type" text NOT NULL CHECK (content_type IN ('skill', 'prompt', 'article', 'video')),
  "content_id"   uuid NOT NULL,
  "created_at"   timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "content_tags_unique_idx"
  ON "content_tags" ("tag_id", "content_type", "content_id");
CREATE INDEX IF NOT EXISTS "idx_content_tags_content"
  ON "content_tags" ("content_type", "content_id");
CREATE INDEX IF NOT EXISTS "idx_content_tags_tag"
  ON "content_tags" ("tag_id");

-- ─── Skills ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "skills" (
  "id"             uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title"          text NOT NULL,
  "slug"           text NOT NULL,
  "description"    text,
  "body"           text,
  "version"        text,
  "install_command" text,
  "prompt_snippet" text,
  "external_url"   text,
  "thumbnail_url"  text,
  "download_url"   text,
  "redirect_url"   text,
  "metadata"       jsonb NOT NULL DEFAULT '{}',
  "embedding"      vector(1536),
  "author_id"      uuid REFERENCES "users"("id") ON DELETE SET NULL,
  "is_published"   boolean NOT NULL DEFAULT true,
  "created_at"     timestamp NOT NULL DEFAULT now(),
  "updated_at"     timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "skills_slug_unique" UNIQUE ("slug")
);
-- Full-text search index on title + description + body
CREATE INDEX IF NOT EXISTS "idx_skills_fts"
  ON "skills" USING GIN (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(body, ''))
  );
CREATE INDEX IF NOT EXISTS "idx_skills_published"
  ON "skills" ("is_published", "created_at" DESC);

-- ─── Prompts ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "prompts" (
  "id"           uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title"        text NOT NULL,
  "slug"         text NOT NULL,
  "description"  text,
  "body"         text NOT NULL,
  "role"         text NOT NULL DEFAULT 'system'
                   CHECK (role IN ('system', 'user', 'assistant')),
  "use_case"     text,
  "download_url" text,
  "redirect_url" text,
  "metadata"     jsonb NOT NULL DEFAULT '{}',
  "embedding"    vector(1536),
  "author_id"    uuid REFERENCES "users"("id") ON DELETE SET NULL,
  "is_published" boolean NOT NULL DEFAULT true,
  "created_at"   timestamp NOT NULL DEFAULT now(),
  "updated_at"   timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "prompts_slug_unique" UNIQUE ("slug")
);
CREATE INDEX IF NOT EXISTS "idx_prompts_fts"
  ON "prompts" USING GIN (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(body, ''))
  );
CREATE INDEX IF NOT EXISTS "idx_prompts_published"
  ON "prompts" ("is_published", "created_at" DESC);

-- ─── Articles ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "articles" (
  "id"                   uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title"                text NOT NULL,
  "slug"                 text NOT NULL,
  "description"          text,
  "body"                 text,
  "cover_image_url"      text,
  "reading_time_minutes" integer,
  "external_url"         text,
  "download_url"         text,
  "redirect_url"         text,
  "metadata"             jsonb NOT NULL DEFAULT '{}',
  "embedding"            vector(1536),
  "author_id"            uuid REFERENCES "users"("id") ON DELETE SET NULL,
  "is_published"         boolean NOT NULL DEFAULT true,
  "published_at"         timestamp,
  "created_at"           timestamp NOT NULL DEFAULT now(),
  "updated_at"           timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "articles_slug_unique" UNIQUE ("slug")
);
CREATE INDEX IF NOT EXISTS "idx_articles_fts"
  ON "articles" USING GIN (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(body, ''))
  );
CREATE INDEX IF NOT EXISTS "idx_articles_published"
  ON "articles" ("is_published", "published_at" DESC NULLS LAST);

-- ─── Videos ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "videos" (
  "id"               uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title"            text NOT NULL,
  "slug"             text NOT NULL,
  "description"      text,
  "url"              text,
  "thumbnail_url"    text,
  "duration_seconds" integer,
  "platform"         text NOT NULL DEFAULT 'youtube'
                       CHECK (platform IN ('youtube', 'instagram', 'vimeo', 'other')),
  "format"           text NOT NULL DEFAULT 'long'
                       CHECK (format IN ('short', 'long', 'course')),
  "download_url"     text,
  "redirect_url"     text,
  "metadata"         jsonb NOT NULL DEFAULT '{}',
  "embedding"        vector(1536),
  "author_id"        uuid REFERENCES "users"("id") ON DELETE SET NULL,
  "is_published"     boolean NOT NULL DEFAULT true,
  "created_at"       timestamp NOT NULL DEFAULT now(),
  "updated_at"       timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "videos_slug_unique" UNIQUE ("slug")
);
CREATE INDEX IF NOT EXISTS "idx_videos_fts"
  ON "videos" USING GIN (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(description, ''))
  );
CREATE INDEX IF NOT EXISTS "idx_videos_published"
  ON "videos" ("is_published", "created_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_videos_platform_format"
  ON "videos" ("platform", "format");

-- ─── Playlists ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "playlists" (
  "id"            uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title"         text NOT NULL,
  "slug"          text NOT NULL,
  "description"   text,
  "thumbnail_url" text,
  "metadata"      jsonb NOT NULL DEFAULT '{}',
  "created_at"    timestamp NOT NULL DEFAULT now(),
  "updated_at"    timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "playlists_slug_unique" UNIQUE ("slug")
);

-- ─── Video Playlists (ordered junction) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS "video_playlists" (
  "video_id"    uuid NOT NULL REFERENCES "videos"("id") ON DELETE CASCADE,
  "playlist_id" uuid NOT NULL REFERENCES "playlists"("id") ON DELETE CASCADE,
  "position"    integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("video_id", "playlist_id")
);
CREATE INDEX IF NOT EXISTS "idx_video_playlists_ordered"
  ON "video_playlists" ("playlist_id", "position" ASC);

-- ─── Enhance mini_apps ────────────────────────────────────────────────────────
ALTER TABLE "mini_apps"
  ADD COLUMN IF NOT EXISTS "slug"         text,
  ADD COLUMN IF NOT EXISTS "download_url" text,
  ADD COLUMN IF NOT EXISTS "redirect_url" text,
  ADD COLUMN IF NOT EXISTS "metadata"     jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "embedding"    vector(1536);
