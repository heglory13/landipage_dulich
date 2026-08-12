"use client";

import Link from "next/link";
import { useState } from "react";

type ActivityItem = readonly [tag: string, title: string, date: string, href: string];

type RecentActivityTabsProps = {
  posts: readonly ActivityItem[];
  comments: readonly ActivityItem[];
  postLabel?: string;
  commentLabel?: string;
};

export function RecentActivityTabs({ posts, comments, postLabel = "Bài đăng mới", commentLabel = "Bình luận mới" }: RecentActivityTabsProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const items = activeTab === "posts" ? posts : comments;

  return (
    <section className="rounded-2xl bg-card p-5 shadow-[0_8px_25px_rgba(30,26,20,.05)]">
      <div className="mb-5 grid grid-cols-2 border-b border-border text-center text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`pb-3 ${activeTab === "posts" ? "border-b-2 border-[#df3138] text-[#df3138]" : ""}`}
        >
          {postLabel}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("comments")}
          className={`pb-3 ${activeTab === "comments" ? "border-b-2 border-[#df3138] text-[#df3138]" : ""}`}
        >
          {commentLabel}
        </button>
      </div>
      <ul className="space-y-3">
        {items.map(([tag, title, date, href]) => (
          <li key={`${tag}-${title}`} className="text-xs">
            <Link href={href} className="flex min-w-0 items-center gap-2 rounded-md py-0.5 transition-colors hover:text-[#df3138]">
              <span className="shrink-0 text-[#df3138]">[{tag}]</span>
              <span className="min-w-0 flex-1 truncate">{title}</span>
              <span className="shrink-0 text-muted-foreground">{date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
