import "server-only";
import { database } from "@/lib/database";

export const siteSettingKeys = ["site_name", "hero_eyebrow", "hero_title_line1", "hero_title_accent", "hero_title_line2", "hero_description", "hero_poster", "promo_image", "contact_email", "hotline"] as const;
export type SiteSettingKey = typeof siteSettingKeys[number];

export function getSiteSettings() {
  const rows = database.prepare("SELECT key, value FROM site_settings").all() as Array<{ key: string; value: string }>;
  return Object.fromEntries(rows.map((row) => [row.key, row.value])) as Record<SiteSettingKey, string>;
}
