import { getCurrentUser } from "@/lib/auth";
import { database } from "@/lib/database";

type CommentRow = {
  id: number;
  parentId: number | null;
  author: string;
  body: string;
  imageData: string | null;
  createdAt: string;
  likes: number;
  liked: number;
};

function cleanKey(value: string | null) {
  return (value ?? "").trim().slice(0, 500);
}

export async function GET(request: Request) {
  const contentKey = cleanKey(new URL(request.url).searchParams.get("contentKey"));
  if (!contentKey) return Response.json({ error: "contentKey가 필요합니다." }, { status: 400 });
  const user = await getCurrentUser();
  const comments = database.prepare(`
    SELECT comments.id, comments.parent_id AS parentId,
      COALESCE(users.name, comments.display_name, '회원') AS author,
      comments.body, comments.image_data AS imageData, comments.created_at AS createdAt,
      COUNT(comment_likes.user_id) AS likes,
      MAX(CASE WHEN comment_likes.user_id = ? THEN 1 ELSE 0 END) AS liked
    FROM comments
    LEFT JOIN users ON users.id = comments.user_id
    LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id
    WHERE comments.content_key = ?
    GROUP BY comments.id
    ORDER BY comments.created_at ASC
  `).all(user?.id ?? -1, contentKey) as CommentRow[];
  const stats = database.prepare(`
    SELECT
      (SELECT COUNT(*) FROM content_likes WHERE content_key = ?) AS likes,
      (SELECT COUNT(*) FROM bookmarks WHERE content_key = ?) AS bookmarks,
      (SELECT ROUND(AVG(score), 1) FROM ratings WHERE content_key = ?) AS rating,
      (SELECT COUNT(*) FROM ratings WHERE content_key = ?) AS ratingCount
  `).get(contentKey, contentKey, contentKey, contentKey) as { likes: number; bookmarks: number; rating: number | null; ratingCount: number };
  const mine = user ? database.prepare(`
    SELECT
      EXISTS(SELECT 1 FROM content_likes WHERE content_key = ? AND user_id = ?) AS liked,
      EXISTS(SELECT 1 FROM bookmarks WHERE content_key = ? AND user_id = ?) AS bookmarked,
      (SELECT score FROM ratings WHERE content_key = ? AND user_id = ?) AS rating
  `).get(contentKey, user.id, contentKey, user.id, contentKey, user.id) as { liked: number; bookmarked: number; rating: number | null } : null;
  return Response.json({ comments, stats, mine, authenticated: Boolean(user) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const body = await request.json() as { action?: string; contentKey?: string; body?: string; imageData?: string; parentId?: number; commentId?: number; score?: number };
  const contentKey = cleanKey(body.contentKey ?? null);
  if (!contentKey) return Response.json({ error: "contentKey가 필요합니다." }, { status: 400 });

  if (body.action === "comment") {
    const message = body.body?.trim() ?? "";
    const imageData = body.imageData?.trim() || null;
    if (message.length < 1 || message.length > 2000) return Response.json({ error: "댓글은 1~2000자로 입력해주세요." }, { status: 400 });
    if (imageData && (!/^data:image\/(jpeg|png|webp);base64,/.test(imageData) || imageData.length > 3_000_000)) {
      return Response.json({ error: "이미지는 JPG, PNG, WEBP 형식으로 2MB 이하만 가능합니다." }, { status: 400 });
    }
    if (body.parentId) {
      const parent = database.prepare("SELECT id FROM comments WHERE id = ? AND content_key = ?").get(body.parentId, contentKey);
      if (!parent) return Response.json({ error: "답글 대상이 없습니다." }, { status: 404 });
    }
    database.prepare("INSERT INTO comments (content_key, user_id, parent_id, body, image_data) VALUES (?, ?, ?, ?, ?)")
      .run(contentKey, user.id, body.parentId ?? null, message, imageData);
  } else if (body.action === "like") {
    const deleted = database.prepare("DELETE FROM content_likes WHERE content_key = ? AND user_id = ?").run(contentKey, user.id);
    if (deleted.changes === 0) database.prepare("INSERT INTO content_likes (content_key, user_id) VALUES (?, ?)").run(contentKey, user.id);
  } else if (body.action === "bookmark") {
    const deleted = database.prepare("DELETE FROM bookmarks WHERE content_key = ? AND user_id = ?").run(contentKey, user.id);
    if (deleted.changes === 0) database.prepare("INSERT INTO bookmarks (content_key, user_id) VALUES (?, ?)").run(contentKey, user.id);
  } else if (body.action === "commentLike" && body.commentId) {
    const comment = database.prepare("SELECT id FROM comments WHERE id = ? AND content_key = ?").get(body.commentId, contentKey);
    if (!comment) return Response.json({ error: "댓글이 없습니다." }, { status: 404 });
    const deleted = database.prepare("DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?").run(body.commentId, user.id);
    if (deleted.changes === 0) database.prepare("INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)").run(body.commentId, user.id);
  } else if (body.action === "rating") {
    const score = Number(body.score);
    if (!Number.isInteger(score) || score < 1 || score > 5) return Response.json({ error: "별점은 1~5점이어야 합니다." }, { status: 400 });
    database.prepare(`
      INSERT INTO ratings (content_key, user_id, score) VALUES (?, ?, ?)
      ON CONFLICT(content_key, user_id) DO UPDATE SET score = excluded.score, updated_at = CURRENT_TIMESTAMP
    `).run(contentKey, user.id, score);
  } else {
    return Response.json({ error: "지원하지 않는 작업입니다." }, { status: 400 });
  }
  return Response.json({ ok: true });
}
