import "server-only";
import { database } from "@/lib/database";

export type ArchivedArticle = { href:string; title:string; imageUrl:string|null; summary:string; category:string; html:string; text:string; assets:string[] };
export function getArchivedArticle(category:string,slug:string):ArchivedArticle|null|undefined {
  const row=database.prepare("SELECT title,image,summary,payload,status,href FROM content_items WHERE kind='article' AND category=? AND slug=? ORDER BY id LIMIT 1").get(category,decodeURIComponent(slug)) as {title:string;image:string|null;summary:string|null;payload:string;status:string;href:string}|undefined;
  if(!row)return undefined; if(row.status!=="published")return null;
  const payload=JSON.parse(row.payload) as ArchivedArticle;
  return {...payload,href:row.href,title:row.title,imageUrl:row.image??payload.imageUrl,summary:row.summary??payload.summary,category};
}
