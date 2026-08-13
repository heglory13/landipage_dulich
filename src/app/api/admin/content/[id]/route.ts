import { requireAdmin, isSameOrigin } from "@/lib/admin";
import { parseContentInput, sanitizeArticleHtml, type ContentInput } from "@/lib/content-admin";
import { database } from "@/lib/database";

async function authorized(request: Request) { try { await requireAdmin(); return isSameOrigin(request); } catch { return false; } }
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authorized(request))) return Response.json({ error: "권한이 없습니다." }, { status: 403 });
  const id = Number((await params).id); const input = parseContentInput(await request.json().catch(() => ({})) as ContentInput);
  if (!Number.isSafeInteger(id) || !input) return Response.json({ error: "입력값을 확인해주세요." }, { status: 400 });
  const current = database.prepare("SELECT kind, source_key, slug, payload, href FROM content_items WHERE id=? AND kind!='category'").get(id) as { kind: string; source_key: string; slug: string | null; payload: string; href: string | null } | undefined;
  if (!current) return Response.json({ error: "게시물을 찾을 수 없습니다." }, { status: 404 });
  const duplicate = database.prepare("SELECT id FROM content_items WHERE kind='cms_article' AND slug=? AND id!=?").get(input.slug, id);
  if (duplicate) return Response.json({ error: "이미 사용 중인 주소입니다." }, { status: 409 });
  const payload = JSON.parse(current.payload) as Record<string, unknown>;
  const safeBody = sanitizeArticleHtml(input.body);
  if (current.kind === "article" || current.kind === "accommodation") payload.html = safeBody;
  else payload.body = safeBody;
  payload.title = input.title; payload.summary = input.summary; payload.description = input.summary;
  payload.cmsMap = { name: input.mapName, address: input.mapAddress, url: input.mapUrl, embedUrl: input.mapEmbedUrl };
  if (input.image) payload.imageUrl = input.image;
  const managed = current.kind === "cms_article"||current.source_key.startsWith("cms:");const benefits=new Set(["notice","event","service"]);const managedKind=benefits.has(input.category)?input.category:"cms_article";const managedHref=benefits.has(managedKind)?`/${managedKind}/${input.slug}`:`/article/${input.slug}`;
  const result = database.prepare("UPDATE content_items SET source_key=?,kind=?,slug=?,title=?,category=?,href=?,image=?,summary=?,payload=?,status=?,featured=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(managed ? `cms:${managedKind}:${input.slug}` : current.source_key,managed?managedKind:current.kind, managed ? input.slug : current.slug, input.title, input.category || null, managed ? managedHref : current.href, input.image || null, input.summary || null, JSON.stringify(managed ? { body: safeBody, cmsMap: payload.cmsMap } : payload), input.status, input.featured ? 1 : 0, id);
  if (!result.changes) return Response.json({ error: "게시물을 찾을 수 없습니다." }, { status: 404 });
  return Response.json({ ok: true, href: managedHref });
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await authorized(request))) return Response.json({ error: "권한이 없습니다." }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id)) return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  const row = database.prepare("SELECT kind FROM content_items WHERE id=? AND kind!='category'").get(id) as { kind: string } | undefined;
  if (!row) return Response.json({ error: "게시물을 찾을 수 없습니다." }, { status: 404 });
  const result = row.kind === "cms_article" ? database.prepare("DELETE FROM content_items WHERE id=?").run(id) : database.prepare("UPDATE content_items SET status='deleted', updated_at=CURRENT_TIMESTAMP WHERE id=?").run(id);
  return result.changes ? Response.json({ ok: true }) : Response.json({ error: "게시물을 찾을 수 없습니다." }, { status: 404 });
}
