import "server-only";

import { mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import archivedPosts from "@/data/vietdalbam/posts.json";
import categories from "@/data/vietdalbam/categories.json";
import accommodationLive from "@/app/data/accommodation-live.json";
import { eventPosts } from "@/data/event-posts";
import { noticePosts } from "@/data/notice-posts";
import { servicePosts } from "@/data/service-posts";
import { articleSlug, canonicalArticleHref } from "@/lib/content-routes";

const databaseFileName = "ho-chi-minh-game.sqlite";

function openDatabase() {
  const candidateDirectories = [
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "landingpage-dulich-data"),
  ];

  let lastError: unknown;

  for (const directory of candidateDirectories) {
    try {
      mkdirSync(directory, { recursive: true });
      const instance = new DatabaseSync(path.join(directory, databaseFileName));
      if (directory !== candidateDirectories[0]) {
        console.warn(`[database] Falling back to temporary storage at ${directory}.`);
      }
      return instance;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export const database = openDatabase();
database.exec("PRAGMA busy_timeout = 10000;");

function isDuplicateColumnError(error: unknown) {
  return error instanceof Error && /duplicate column name/i.test(error.message);
}

function ensureColumn(table: string, column: string, definition: string) {
  const columns = database.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  if (columns.some((existingColumn) => existingColumn.name === column)) return;

  try {
    database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (error) {
    if (!isDuplicateColumnError(error)) throw error;
  }
}

database.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'admin')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS content_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_key TEXT NOT NULL UNIQUE,
    kind TEXT NOT NULL,
    slug TEXT,
    title TEXT NOT NULL,
    category TEXT,
    href TEXT,
    image TEXT,
    summary TEXT,
    payload TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS content_items_kind_idx ON content_items(kind);
  CREATE INDEX IF NOT EXISTS content_items_slug_idx ON content_items(slug);

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_key TEXT NOT NULL,
    user_id INTEGER,
    parent_id INTEGER,
    display_name TEXT,
    body TEXT NOT NULL,
    image_data TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS comments_content_idx ON comments(content_key, created_at);

  CREATE TABLE IF NOT EXISTS content_likes (
    content_key TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_key, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS comment_likes (
    comment_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    content_key TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_key, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS ratings (
    content_key TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL CHECK(score BETWEEN 1 AND 5),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_key, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS ratings_content_idx ON ratings(content_key);

  CREATE TABLE IF NOT EXISTS password_reset_otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    code_hash TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    used_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS password_reset_user_idx ON password_reset_otps(user_id, created_at);

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const defaultSettings = {
  site_name: "호치민 게임",
  hero_eyebrow: "호치민 게임 2026",
  hero_title_line1: "꿈보다",
  hero_title_accent: "더",
  hero_title_line2: "놀라운 즐거움",
  hero_description: "베트남 전역의 호치민 게임에서 여행, 엔터테인먼트, 쇼와 특별 혜택이 어우러진 여정을 만나보세요.",
  hero_poster: "/hero-poster.jpg",
  promo_image: "/images/ho-chi-minh-game-promo.png",
  contact_email: "",
  hotline: "1900 6677",
} as const;
const insertSetting = database.prepare("INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)");
for (const [key, value] of Object.entries(defaultSettings)) insertSetting.run(key, value);

ensureColumn("users", "role", "TEXT NOT NULL DEFAULT 'user'");

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);
if (adminEmails.length > 0) {
  const promoteAdmin = database.prepare("UPDATE users SET role = 'admin', updated_at = CURRENT_TIMESTAMP WHERE email = ?");
  for (const email of adminEmails) promoteAdmin.run(email);
}

ensureColumn("comments", "image_data", "TEXT");
ensureColumn("content_items", "status", "TEXT NOT NULL DEFAULT 'published'");
ensureColumn("content_items", "author_id", "INTEGER");
ensureColumn("content_items", "featured", "INTEGER NOT NULL DEFAULT 0");

type SeedItem = {
  sourceKey: string;
  kind: string;
  slug?: string;
  title: string;
  category?: string;
  href?: string;
  image?: string;
  summary?: string;
  payload: unknown;
};

const seedStatement = database.prepare(`
  INSERT OR IGNORE INTO content_items
    (source_key, kind, slug, title, category, href, image, summary, payload)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

function seedContent(items: SeedItem[]) {
  database.exec("BEGIN");
  try {
    for (const item of items) {
      seedStatement.run(
        item.sourceKey,
        item.kind,
        item.slug ?? null,
        item.title,
        item.category ?? null,
        item.href ?? null,
        item.image ?? null,
        item.summary ?? null,
        JSON.stringify(item.payload),
      );
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

const existingContent = database.prepare("SELECT COUNT(*) AS count FROM content_items").get() as { count: number };

if (existingContent.count === 0) {
  const archived = archivedPosts.map((post, index) => ({
    sourceKey: `archive:${post.href || index}`,
    kind: "article",
    slug: articleSlug(post.href || String(index)),
    title: post.title,
    category: post.category,
    href: canonicalArticleHref(post.category, post.href),
    image: post.imageUrl,
    summary: post.summary,
    payload: post,
  }));
  const liveAccommodation = accommodationLive.map((post, index) => ({
    sourceKey: `accommodation-live:${post.href || index}`,
    kind: "accommodation",
    title: post.href,
    href: post.href,
    payload: post,
  }));
  const events = eventPosts.map((post) => ({
    sourceKey: `event:${post.slug}`,
    kind: "event",
    slug: post.slug,
    title: post.title,
    category: post.category,
    summary: post.description,
    payload: post,
  }));
  const notices = noticePosts.map((post) => ({
    sourceKey: `notice:${post.slug}`,
    kind: "notice",
    slug: post.slug,
    title: post.title,
    category: post.category,
    summary: post.description,
    payload: post,
  }));
  const services = servicePosts.map((post) => ({
    sourceKey: `service:${post.slug}`,
    kind: "service",
    slug: post.slug,
    title: post.title,
    category: post.category,
    summary: post.description,
    payload: post,
  }));
  const categoryItems = categories.map((category, index) => ({
    sourceKey: `category:${index}`,
    kind: "category",
    title: JSON.stringify(category).slice(0, 160),
    payload: category,
  }));

  seedContent([...archived, ...liveAccommodation, ...events, ...notices, ...services, ...categoryItems]);
}

const legacyCommentKey = "accommodation:1룸-빈홈-랜드마크-플러스-아파트-176";
const legacyCommentCount = database.prepare("SELECT COUNT(*) AS count FROM comments WHERE content_key = ?")
  .get(legacyCommentKey) as { count: number };
if (legacyCommentCount.count === 0) {
  const insertLegacyComment = database.prepare("INSERT INTO comments (content_key, display_name, body, created_at) VALUES (?, ?, ?, ?)");
  insertLegacyComment.run(legacyCommentKey, "경남비엔", "깔끔하고 대응이 빠르셨어요 아주 만족했습니다", "2024-11-04T00:00:00.000Z");
  insertLegacyComment.run(legacyCommentKey, "가자고링", "편히 묵고갑니다!", "2024-12-16T00:00:00.000Z");
}

export const sessionCookieName = "ho-chi-minh-game-session";
