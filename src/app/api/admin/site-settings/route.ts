import { requireAdmin, isSameOrigin } from "@/lib/admin";
import { database } from "@/lib/database";
import { siteSettingKeys } from "@/lib/site-settings";

export async function PATCH(request: Request) {
  try { await requireAdmin(); } catch { return Response.json({ error: "권한이 없습니다." }, { status: 403 }); }
  if (!isSameOrigin(request)) return Response.json({ error: "잘못된 요청입니다." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const update = database.prepare("INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP");
  database.exec("BEGIN");
  try {
    for (const key of siteSettingKeys) {
      if (!(key in body)) continue;
      const value = body[key];
      if (typeof value !== "string" || value.length > 2_000) throw new Error("INVALID");
      update.run(key, value.trim());
    }
    database.exec("COMMIT");
    return Response.json({ ok: true });
  } catch {
    database.exec("ROLLBACK");
    return Response.json({ error: "입력값이 올바르지 않습니다." }, { status: 400 });
  }
}
