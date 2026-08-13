import { requireAdmin, isSameOrigin } from "@/lib/admin";
import { parseContentInput, type ContentInput } from "@/lib/content-admin";
import { database } from "@/lib/database";

export async function POST(request: Request) {
  let admin;
  try { admin = await requireAdmin(); } catch { return Response.json({ error: "권한이 없습니다." }, { status: 403 }); }
  if (!isSameOrigin(request)) return Response.json({ error: "잘못된 요청입니다." }, { status: 403 });
  const input = parseContentInput(await request.json().catch(() => ({})) as ContentInput);
  if (!input) return Response.json({ error: "제목, 주소와 내용을 확인해주세요." }, { status: 400 });
  const duplicate = database.prepare("SELECT id FROM content_items WHERE kind IN ('cms_article','notice','event','service') AND slug=? AND source_key LIKE 'cms:%'").get(input.slug);
  if (duplicate) return Response.json({ error: "이미 사용 중인 주소입니다." }, { status: 409 });
  const benefitKinds=new Set(["notice","event","service"]);const kind=benefitKinds.has(input.category)?input.category:"cms_article";const href=benefitKinds.has(kind)?`/${kind}/${input.slug}`:`/article/${input.slug}`;
  const result = database.prepare("INSERT INTO content_items(source_key,kind,slug,title,category,href,image,summary,payload,status,featured,author_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)").run(`cms:${kind}:${input.slug}`, kind, input.slug, input.title, input.category || null, href, input.image || null, input.summary || null, JSON.stringify({ body: input.body, cmsMap: { name: input.mapName, address: input.mapAddress, url: input.mapUrl, embedUrl: input.mapEmbedUrl } }), input.status, input.featured ? 1 : 0, admin.id);
  return Response.json({ id: Number(result.lastInsertRowid), href }, { status: 201 });
}
