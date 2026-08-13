import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Collections } from "@/components/collections";
import { FeaturedProducts, type FeaturedProduct } from "@/components/featured-products";
import { Heritage } from "@/components/heritage";
import { Personalization } from "@/components/personalization";
import { Sustainability } from "@/components/sustainability";
import { Press } from "@/components/press";
import { Services } from "@/components/services";
import { Journal } from "@/components/journal";
import { Newsletter } from "@/components/newsletter";
import { Boutiques } from "@/components/boutiques";
import { Footer } from "@/components/footer";
import { database } from "@/lib/database";

export default function Home() {
  const rows = database.prepare(`
    SELECT id, title, kind, href, image
    FROM content_items
    WHERE status = 'published'
      AND featured = 1
    ORDER BY updated_at DESC
    LIMIT 20
  `).all() as Array<{ id: number; title: string; kind: string; href: string | null; image: string | null }>;
  const labels: Record<string, string> = { notice: "공지사항", event: "이벤트", service: "서비스" };
  const landingImage = (image: string | null) => {
    if (!image) return "/placeholder.svg";
    if (!image.startsWith("/upload/")) return image;
    const [pathname, query] = image.split("?");
    const archivedPath = query === "thumbnail"
      ? pathname.replace(/\.webp$/i, ".thumbnail.webp")
      : pathname;
    return `/vietdalbam${archivedPath}`;
  };
  const featured: FeaturedProduct[] = rows.filter((row) => row.href).map((row) => ({
    id: row.id,
    href: row.href!,
    name: row.title,
    category: labels[row.kind] ?? (row.kind === "article" ? "호치민" : "추천"),
    price: "추천 글",
    image: landingImage(row.image),
    isNew: true,
  }));
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Collections />
      <FeaturedProducts products={featured} />
      <Heritage />
      <Personalization />
      <Sustainability />
      <Press />
      <Services />
      <Journal />
      <Boutiques />
      <Newsletter />
      <Footer />
    </main>
  );
}
