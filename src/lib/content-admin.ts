import "server-only";
import { load } from "cheerio";

export type ContentInput = { title?: unknown; slug?: unknown; category?: unknown; summary?: unknown; image?: unknown; body?: unknown; status?: unknown; featured?: unknown; mapName?: unknown; mapAddress?: unknown; mapUrl?: unknown; mapEmbedUrl?: unknown };
export const contentStatuses = new Set(["draft", "published"]);

export function normalizeSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
}

export function parseContentInput(input: ContentInput) {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const slug = normalizeSlug(typeof input.slug === "string" ? input.slug : title);
  const category = typeof input.category === "string" ? input.category.trim().slice(0, 80) : "";
  const summary = typeof input.summary === "string" ? input.summary.trim().slice(0, 500) : "";
  const image = typeof input.image === "string" ? input.image.trim().slice(0, 500) : "";
  const body = typeof input.body === "string" ? input.body.trim().slice(0, 100_000) : "";
  const status = typeof input.status === "string" && contentStatuses.has(input.status) ? input.status : "draft";
  const featured = input.featured === true;
  const mapName = typeof input.mapName === "string" ? input.mapName.trim().slice(0, 200) : "";
  const mapAddress = typeof input.mapAddress === "string" ? input.mapAddress.trim().slice(0, 500) : "";
  const mapUrl = typeof input.mapUrl === "string" ? input.mapUrl.trim().slice(0, 2_000) : "";
  const mapEmbedUrl = typeof input.mapEmbedUrl === "string" ? input.mapEmbedUrl.trim().slice(0, 2_000) : "";
  if (title.length < 2 || title.length > 200 || !slug || body.length < 1) return null;
  if (image && !image.startsWith("/uploads/admin/") && !image.startsWith("/")) return null;
  if ([mapUrl, mapEmbedUrl].some((url) => url && !/^https:\/\/(maps\.app\.goo\.gl\/|(?:www\.)?google\.[^/]+\/maps)/i.test(url))) return null;
  return { title, slug, category, summary, image, body, status, featured, mapName, mapAddress, mapUrl, mapEmbedUrl };
}

export function fallbackMapForArticle(category: string, slug: string) {
  if (category !== "accommodation") return null;
  if (slug.endsWith("-176") || slug.endsWith("-180")) return { name: "The Landmark plus", address: "QPV9+XP6, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh", embedUrl: "https://www.google.com/maps?q=The%20Landmark%20plus%2C%2010.7950932%2C106.7220907&z=17&output=embed&hl=en", url: "https://www.google.com/maps/place/The+Landmark+plus/@10.7950932,106.7220907,17z" };
  if (slug.endsWith("-4342")) return { name: "Sakura Park Quận 7", address: "Đường 16, Tân Phú, Quận 7, Hồ Chí Minh", embedUrl: "https://www.google.com/maps?q=Midtown%20Phu%20My%20Hung%20Sakura%20Park%20District%207&z=17&output=embed&hl=vi", url: "https://www.google.com/maps/search/?api=1&query=Midtown%20Phu%20My%20Hung%20Sakura%20Park" };
  if (["-1792", "-219", "-218"].some((suffix) => slug.endsWith(suffix))) return { name: "Sunrise City", address: "PPV2+664, Khu đô thị Sunrise City, Tân Hưng, Hồ Chí Minh, Vietnam", embedUrl: "https://www.google.com/maps?q=Sunrise%20City%2C%2010.7430044%2C106.700586&z=15&output=embed&hl=vi", url: "https://www.google.com/maps/search/?api=1&query=Sunrise%20City%20Ho%20Chi%20Minh" };
  return null;
}

export function inferMapForArticle(title: string, category: string, html: string) {
  const $ = load(html, null, false);
  const iframe = $("iframe[src*='google.'][src*='/maps']").first().attr("src")?.trim() ?? "";
  const googleLink = $("a[href*='maps.app.goo.gl'],a[href*='google.com/maps']").first().attr("href")?.trim() ?? "";
  const text = $.root().text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  const address = (text.match(/(?:주소|위치|địa chỉ|address)\s*[:：]\s*(.{4,220}?)(?=영업시간|운영시간|구글지도|Google Maps|예약|가격|코스|\s{2,}|$)/i)?.[1] ?? "")
    .replace(/\s*(구글지도바로가기|구글 지도 바로가기|Google Maps?).*$/i, "").replace(/\.{2,}.*$/, "").trim();
  const region = category.startsWith("danang") ? "Đà Nẵng, Vietnam"
    : category.startsWith("nhatrang") ? "Nha Trang, Vietnam"
    : category.startsWith("dalat") ? "Đà Lạt, Vietnam"
    : category === "vungtau" ? "Vũng Tàu, Vietnam"
    : category === "phuquoc" ? "Phú Quốc, Vietnam"
    : "Hồ Chí Minh City, Vietnam";
  const name = title
    .replace(/^\[[^\]]+\]\s*/, "").replace(/^(베트남\s*)?(호치민|다낭|나트랑|달랏|붕따우|푸꾸옥)\s*/i, "")
    .replace(/\s*(예약 문의 안내|예약 빠르게하는 법|예약 주대 정보|예약방법|예약 방법|시스템 및 예약방법|주대 정보|추천|소개).*$/i, "").trim() || title;
  const query = [name, address || region].filter(Boolean).join(", ");
  return {
    name,
    address: address || region,
    url: googleLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    embedUrl: iframe || `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
  };
}

export function sanitizeArticleHtml(html: string) {
  const $ = load(`<main id="cms-root">${html}</main>`, null, false);
  $("script,style,object,embed,form,input,button,textarea,select,link,meta").remove();
  $("*").each((_, element) => {
    const node = $(element);
    for (const name of Object.keys(node.attr() ?? {})) {
      const value = node.attr(name) ?? "";
      if (/^on/i.test(name) || name.startsWith("@") || name.startsWith(":") || name.startsWith("x-") || name === "srcdoc" || name === "contenteditable" || name === "draggable") node.removeAttr(name);
      if ((name === "href" || name === "src") && /^\s*(javascript|data):/i.test(value)) node.removeAttr(name);
    }
    const tagName = node.prop("tagName")?.toLowerCase();
    if (tagName === "iframe") {
      const src = node.attr("src") ?? "";
      const isGoogleEmbed = /^https:\/\/(www\.)?google\.[^/]+\/maps(?:\/embed|\?)/i.test(src) && (/\/maps\/embed/i.test(src) || /[?&]output=embed(?:&|$)/i.test(src));
      if (!isGoogleEmbed) node.remove();
      else node.attr("loading", "lazy").attr("referrerpolicy", "no-referrer-when-downgrade");
    }
    if (tagName === "a") node.attr("rel", "noopener noreferrer");
  });
  return $("#cms-root").html() ?? "";
}

export function editableBody(payload: Record<string, unknown>) {
  const images = Array.isArray(payload.images) ? payload.images as Array<{ src?: string; alt?: string }> : [];
  const imageHtml = images.map((image) => image.src ? `<figure class="image"><img src="${image.src}" alt="${image.alt ?? ""}" /></figure>` : "").join("\n");
  if (typeof payload.html === "string") {
    const html = payload.html;
    const $ = load(html, null, false);
    const content = $("#content");
    return sanitizeArticleHtml(content.length ? content.html() ?? "" : html);
  }
  if (typeof payload.body === "string") return `${imageHtml}\n${payload.body}`;
  if (Array.isArray(payload.sections)) return payload.sections.map((section) => {
    const item = section as { heading?: string; body?: string; paragraphs?: string[]; items?: string[] };
    const paragraphs = item.paragraphs ?? (item.body ? [item.body] : []);
    return `${item.heading ? `<h2>${item.heading}</h2>` : ""}${paragraphs.map((p) => `<p>${p}</p>`).join("")}${item.items?.length ? `<ul>${item.items.map((value) => `<li>${value}</li>`).join("")}</ul>` : ""}`;
  }).join("\n") + imageHtml;
  return "";
}
