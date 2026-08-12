import { requireAdmin, isSameOrigin } from "@/lib/admin";
import { database } from "@/lib/database";

const allowedStatuses = new Set(["new", "in_progress", "resolved"]);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "권한이 없습니다." }, { status: 403 });
  }
  if (!isSameOrigin(request)) {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 403 });
  }

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  const body = await request.json().catch(() => ({})) as { status?: string };
  if (!Number.isSafeInteger(id) || id < 1 || !body.status || !allowedStatuses.has(body.status)) {
    return Response.json({ error: "입력값이 올바르지 않습니다." }, { status: 400 });
  }

  const result = database.prepare("UPDATE inquiries SET status = ? WHERE id = ?").run(body.status, id);
  if (result.changes === 0) return Response.json({ error: "문의를 찾을 수 없습니다." }, { status: 404 });
  return Response.json({ ok: true });
}
