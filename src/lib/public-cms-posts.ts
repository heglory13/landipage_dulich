import { database } from "@/lib/database";

export type PublicCmsPost = {
  href: string;
  title: string;
  imageUrl: string | null;
  summary: string;
};

export function getPublicCmsPosts(categories: readonly string[]): PublicCmsPost[] {
  if (!categories.length) return [];
  const placeholders = categories.map(() => "?").join(",");
  const rows = database.prepare(`
    SELECT title, slug, href, image, summary, updated_at
    FROM content_items
    WHERE kind='cms_article' AND status='published' AND category IN (${placeholders})
    ORDER BY updated_at DESC
  `).all(...categories) as Array<{title:string;slug:string;href:string|null;image:string|null;summary:string|null;updated_at:string}>;
  return rows.map(row => ({
    title: row.title,
    href: row.href || `/article/${row.slug}`,
    imageUrl: row.image,
    summary: `${row.summary || ""} ${new Date(row.updated_at).toLocaleDateString("ko-KR").replaceAll(". ", ".").replace(/\.$/, "")}`.trim(),
  }));
}
