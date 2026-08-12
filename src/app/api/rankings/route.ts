import { database } from "@/lib/database";

export async function GET() {
  const rows = database.prepare(`SELECT content_key AS contentKey, ROUND(AVG(score), 1) AS rating, COUNT(*) AS ratingCount FROM ratings GROUP BY content_key ORDER BY rating DESC, ratingCount DESC LIMIT 50`).all() as Array<{ contentKey: string; rating: number; ratingCount: number }>;
  const contentItems = database.prepare("SELECT title, href, image FROM content_items WHERE href IS NOT NULL").all() as Array<{ title: string; href: string; image: string | null }>;
  const rankings = rows.map((row) => {
    const slug = row.contentKey.split(":").at(-1) ?? row.contentKey;
    const content = contentItems.find((item) => decodeURIComponent(item.href).endsWith(`/${slug}`));
    const parts = row.contentKey.split(":");
    const href = parts[0] === "accommodation" ? `/ho-chi-minh/accommodation/${slug}` : parts.length >= 3 ? `/${parts[0]}/${parts[1]}/${slug}` : content?.href ?? "/";
    return { ...row, title: content?.title ?? slug.replaceAll("-", " "), href, image: content?.image ?? null };
  });
  return Response.json({ rankings });
}
