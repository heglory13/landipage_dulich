"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Bookmark, Check, Image as ImageIcon, MessageCircle, Share2, Star, ThumbsUp } from "lucide-react";
import { openAuthModal } from "@/components/auth-modal";

type Comment = { id: number; parentId: number | null; author: string; body: string; imageData: string | null; createdAt: string; likes: number; liked: number };
type InteractionData = {
  comments: Comment[];
  stats: { likes: number; bookmarks: number; rating: number | null; ratingCount: number };
  mine: { liked: number; bookmarked: number; rating: number | null } | null;
  authenticated: boolean;
};

export function ArticleInteractions({ contentKey }: { contentKey: string }) {
  const [data, setData] = useState<InteractionData | null>(null);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [isPending, setIsPending] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch(`/api/interactions?contentKey=${encodeURIComponent(contentKey)}`, { cache: "no-store" });
    if (response.ok) setData(await response.json() as InteractionData);
  }, [contentKey]);

  useEffect(() => { void load(); }, [load]);

  const perform = async (action: string, extra: Record<string, unknown> = {}) => {
    setNotice("");
    const response = await fetch("/api/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, contentKey, ...extra }),
    });
    const result = await response.json() as { error?: string };
    if (response.status === 401) {
      openAuthModal("login");
      setNotice("로그인 후 이용할 수 있습니다.");
      return false;
    }
    if (!response.ok) {
      setNotice(result.error ?? "처리하지 못했습니다.");
      return false;
    }
    await load();
    return true;
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    setIsPending(true);
    const ok = await perform("comment", { body: message, imageData, parentId: replyTo?.id });
    if (ok) { setMessage(""); setImageData(null); setReplyTo(null); setNotice("댓글이 등록되었습니다."); }
    setIsPending(false);
  };

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: document.title, url: location.href });
      else await navigator.clipboard.writeText(location.href);
      setNotice("링크가 공유되었습니다.");
    } catch { setNotice("공유가 취소되었습니다."); }
  };

  const roots = data?.comments.filter((comment) => !comment.parentId) ?? [];
  const replies = (id: number) => data?.comments.filter((comment) => comment.parentId === id) ?? [];
  const date = (value: string) => new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));

  const commentCard = (comment: Comment, reply = false) => (
    <article key={comment.id} className={reply ? "ml-6 border-l-2 border-accent/30 py-4 pl-5 md:ml-12" : "py-5"}>
      <div className="flex items-center justify-between gap-4"><strong className="text-sm">{comment.author}</strong><time className="text-xs text-muted-foreground">{date(comment.createdAt)}</time></div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6">{comment.body}</p>
      {comment.imageData ? <img src={comment.imageData} alt="댓글 첨부 이미지" className="mt-3 max-h-80 max-w-full rounded-xl object-contain" /> : null}
      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
        {!reply ? <button type="button" onClick={() => { setReplyTo(comment); setMessage(""); }} className="hover:text-accent">답글</button> : null}
        <button type="button" onClick={() => void perform("commentLike", { commentId: comment.id })} className={comment.liked ? "text-accent" : "hover:text-accent"}>추천 {comment.likes}</button>
      </div>
    </article>
  );

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <span className="text-xs text-muted-foreground">추천 {data?.stats.likes ?? 0} · 저장 {data?.stats.bookmarks ?? 0}</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => void perform("bookmark")} className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs ${data?.mine?.bookmarked ? "border-accent bg-accent/10 text-accent" : "border-border"}`}><Bookmark className="h-3.5 w-3.5" fill={data?.mine?.bookmarked ? "currentColor" : "none"}/>저장</button>
          <button type="button" onClick={() => void share()} className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs"><Share2 className="h-3.5 w-3.5"/>공유</button>
          <button type="button" onClick={() => void perform("like")} className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs ${data?.mine?.liked ? "border-accent bg-accent/10 text-accent" : "border-border"}`}><ThumbsUp className="h-3.5 w-3.5" fill={data?.mine?.liked ? "currentColor" : "none"}/>추천 {data?.stats.likes ?? 0}</button>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-border bg-secondary/25 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="text-sm font-bold">실제 회원 평가</p><p className="mt-1 text-xs text-muted-foreground">평균 {data?.stats.rating ?? "-"}점 · {data?.stats.ratingCount ?? 0}개 평가</p></div>
          <div className="flex gap-1" aria-label="별점 선택">{[1,2,3,4,5].map((score) => <button key={score} type="button" onClick={() => void perform("rating", { score })} aria-label={`${score}점`} className="p-1"><Star className={`size-6 transition ${(data?.mine?.rating ?? 0) >= score ? "fill-accent text-accent" : "text-muted-foreground/50 hover:text-accent"}`}/></button>)}</div>
        </div>
      </section>

      {notice ? <p className="mt-4 flex items-center gap-2 rounded-lg bg-secondary p-3 text-xs"><Check className="size-4 text-accent"/>{notice}</p> : null}

      <section id="comments" className="pt-7">
        <h2 className="flex items-center gap-2 font-sans text-xl font-bold"><MessageCircle className="h-5 w-5 text-accent"/>댓글 {data?.comments.length ?? 0}</h2>
        <div className="mt-5 divide-y divide-border border-y border-border">{roots.length ? roots.map((comment) => <div key={comment.id}>{commentCard(comment)}{replies(comment.id).map((item) => commentCard(item, true))}</div>) : <p className="py-7 text-center text-sm text-muted-foreground">아직 등록된 댓글이 없습니다.</p>}</div>
        <form onSubmit={submitComment} className="mt-4 rounded-lg border border-border p-4">
          {replyTo ? <div className="mb-2 flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs"><span><strong>{replyTo.author}</strong>님에게 답글</span><button type="button" onClick={() => setReplyTo(null)}>취소</button></div> : null}
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} aria-label="댓글 내용" placeholder={data?.authenticated ? "메시지를 입력하세요" : "로그인 후 댓글을 작성할 수 있습니다"} className="h-36 w-full resize-y bg-transparent text-sm outline-none placeholder:text-muted-foreground"/>
          {imageData ? <div className="relative mt-2 w-fit"><img src={imageData} alt="첨부 이미지 미리보기" className="h-24 max-w-48 rounded-lg object-cover"/><button type="button" onClick={() => setImageData(null)} className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-primary text-xs text-white">×</button></div> : null}
          <div className="mt-2 flex items-center justify-between"><label className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg bg-secondary text-muted-foreground hover:text-accent" title="이미지 추가"><ImageIcon className="h-4 w-4"/><input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => { const file=event.target.files?.[0]; if (!file) return; if (file.size>2_000_000) { setNotice("이미지는 2MB 이하만 가능합니다."); return; } const reader=new FileReader(); reader.onload=()=>setImageData(typeof reader.result==="string"?reader.result:null); reader.readAsDataURL(file); }}/></label><button disabled={isPending || !message.trim()} type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-40">{isPending ? "등록 중..." : "작성"}</button></div>
        </form>
      </section>
    </>
  );
}
