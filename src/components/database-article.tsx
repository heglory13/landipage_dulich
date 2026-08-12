import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { sanitizeArticleHtml, editableBody } from "@/lib/content-admin";
import { database } from "@/lib/database";

type Row={title:string;category:string|null;summary:string|null;image:string|null;payload:string;status:string;updated_at:string};
export function getDatabaseArticle(kind:string,slug:string){return database.prepare("SELECT title,category,summary,image,payload,status,updated_at FROM content_items WHERE kind=? AND slug=? ORDER BY id LIMIT 1").get(kind,slug) as Row|undefined}
export function DatabaseArticle({row,listHref}:{row:Row;listHref:string}){let body="";try{body=sanitizeArticleHtml(editableBody(JSON.parse(row.payload) as Record<string,unknown>))}catch{}return <main className="min-h-screen bg-background text-foreground"><Header/><article className="px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36"><div className="mx-auto max-w-5xl bg-card p-7 shadow-sm md:p-12 xl:p-16"><Link href={listHref} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"><ArrowLeft className="size-4"/>목록으로</Link><p className="text-xs uppercase tracking-[.4em] text-accent">{row.category??"Article"}</p><h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">{row.title}</h1>{row.summary?<p className="mt-7 text-xl leading-9 text-muted-foreground">{row.summary}</p>:null}<p className="mt-5 text-sm text-muted-foreground">{new Date(row.updated_at).toLocaleDateString("ko-KR")}</p>{row.image?<div className="relative mt-10 aspect-[16/9] overflow-hidden"><Image src={row.image} alt={row.title} fill unoptimized className="object-cover"/></div>:null}<div className="article-content mt-12" dangerouslySetInnerHTML={{__html:body}}/></div></article><Footer/></main>}
