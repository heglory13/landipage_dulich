import { DatabaseSync } from "node:sqlite";
import { load } from "cheerio";

const database = new DatabaseSync("data/ho-chi-minh-game.sqlite");
const rows = database.prepare("SELECT id,title,category,payload FROM content_items WHERE kind='article' AND status!='deleted'").all();

function regionFor(category) {
  if (category.startsWith("danang")) return "Đà Nẵng, Vietnam";
  if (category.startsWith("nhatrang")) return "Nha Trang, Vietnam";
  if (category.startsWith("dalat")) return "Đà Lạt, Vietnam";
  if (category === "vungtau") return "Vũng Tàu, Vietnam";
  if (category === "phuquoc") return "Phú Quốc, Vietnam";
  return "Hồ Chí Minh City, Vietnam";
}

function venueName(title) {
  return title.replace(/^\[[^\]]+\]\s*/, "")
    .replace(/^(베트남\s*)?(호치민|다낭|나트랑|달랏|붕따우|푸꾸옥)\s*/i, "")
    .replace(/\s*(예약 문의 안내|예약 빠르게하는 법|예약 주대 정보|예약방법|예약 방법|시스템 및 예약방법|주대 정보|추천|소개).*$/i, "")
    .trim() || title;
}

function mapFromPayload(row, payload) {
  const html = typeof payload.html === "string" ? payload.html : typeof payload.body === "string" ? payload.body : "";
  const $ = load(html, null, false);
  const iframe = $("iframe[src*='google.'][src*='/maps']").first().attr("src")?.trim() || "";
  const googleLink = $("a[href*='maps.app.goo.gl'],a[href*='google.com/maps']").first().attr("href")?.trim() || "";
  const addressHtml = html.match(/(?:주소|위치|địa chỉ|address)\s*[:：]\s*([\s\S]{4,260}?)(?=<\/p>|<\/li>|<br\s*\/?>|<a\b|영업시간|운영시간|구글지도|Google Maps|예약|가격|코스|$)/i)?.[1] || "";
  const address = load(`<div>${addressHtml}</div>`, null, false).root().text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").replace(/\.{2,}.*$/, "").trim();
  const name = venueName(row.title);
  const location = address || regionFor(row.category || "");
  const query = `${name}, ${location}`;
  return {
    name,
    address: location,
    url: googleLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    embedUrl: iframe || `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
  };
}

const update = database.prepare("UPDATE content_items SET payload=?,updated_at=updated_at WHERE id=?");
let synced = 0;
database.exec("BEGIN");
try {
  for (const row of rows) {
    const payload = JSON.parse(row.payload);
    if (payload.cmsMap?.embedUrl) continue;
    payload.cmsMap = mapFromPayload(row, payload);
    update.run(JSON.stringify(payload), row.id);
    synced += 1;
  }
  database.exec("COMMIT");
} catch (error) {
  database.exec("ROLLBACK");
  throw error;
}
console.log(`Synced maps for ${synced} articles.`);
