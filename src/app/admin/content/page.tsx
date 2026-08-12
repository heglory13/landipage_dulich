import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { database } from "@/lib/database";

type Item={id:number;title:string;slug:string|null;kind:string;category:string|null;href:string|null;status:string;updated_at:string};
type Search={q?:string;status?:string;region?:string;section?:string;page?:string};
type Section={key:string;label:string;legacy:string[]};
type Region={key:string;label:string;prefixes:string[];sections:Section[]};

const fullSectionLabel=(region:Region,section:Section)=>`${region.label}${section.label.replaceAll(" ","")}`;

const sharedSections:Section[]=[
  {key:"accommodation",label:"숙소 & 풀빌라",legacy:["accommodation"]},
  {key:"karaoke",label:"가라오케",legacy:["karaoke"]},
  {key:"club",label:"클럽",legacy:["club"]},
  {key:"bar",label:"바 & 주점",legacy:["bar"]},
  {key:"salon",label:"이발소 & 미용실",legacy:["salon"]},
  {key:"massage",label:"마사지",legacy:["massage"]},
  {key:"golf",label:"골프",legacy:["golf"]},
  {key:"travel",label:"여행지",legacy:["sights","travel"]},
  {key:"restaurant",label:"맛집",legacy:["restaurant"]},
];
const destinationSections:Section[]=sharedSections.map(section=>({...section,legacy:[]}));
const regions:Region[]=[
  {key:"ho-chi-minh",label:"호치민",prefixes:["/ho-chi-minh/","/posts/accommodation/"],sections:sharedSections},
  {key:"da-nang",label:"다낭",prefixes:["/da-nang/"],sections:[
    {key:"accommodation",label:"숙소 & 풀빌라",legacy:["danangroom"]},{key:"karaoke",label:"가라오케",legacy:["danangkaraoke"]},{key:"club",label:"클럽",legacy:["danangclub"]},{key:"bar",label:"바 & 주점",legacy:["danangbar"]},{key:"salon",label:"이발소 & 미용실",legacy:["danangsalon"]},{key:"massage",label:"마사지",legacy:["danangmassage"]},{key:"restaurant",label:"맛집",legacy:["danangfood"]},
  ]},
  {key:"nha-trang",label:"나트랑",prefixes:["/nha-trang/"],sections:[
    {key:"accommodation",label:"숙소 & 풀빌라",legacy:["nhatrangroom"]},{key:"karaoke",label:"가라오케",legacy:["nhatrangktv"]},{key:"club",label:"클럽",legacy:["nhatrangclub"]},{key:"bar",label:"바 & 주점",legacy:["nhatrangbar"]},{key:"salon",label:"이발소 & 미용실",legacy:["nhatrangsalon"]},{key:"massage",label:"마사지",legacy:["nhatrangmassage"]},{key:"golf",label:"골프",legacy:["nhatranggolf"]},{key:"travel",label:"여행지",legacy:["nhatrangtravel"]},{key:"restaurant",label:"맛집",legacy:["nhatrangfood"]},
  ]},
  {key:"da-lat",label:"달랏",prefixes:["/da-lat/"],sections:[
    {key:"accommodation",label:"숙소 & 풀빌라",legacy:["dalatroom"]},{key:"karaoke",label:"가라오케",legacy:["dalatktv"]},{key:"club",label:"클럽",legacy:["dalatclub"]},{key:"bar",label:"바 & 주점",legacy:["dalatbar"]},{key:"salon",label:"이발소 & 미용실",legacy:["dalatsalon"]},{key:"massage",label:"마사지",legacy:["dalatmassage"]},{key:"golf",label:"골프",legacy:["dalatgolf"]},{key:"travel",label:"여행지",legacy:["dalattravel"]},{key:"restaurant",label:"맛집",legacy:["dalatfood"]},
  ]},
  {key:"vung-tau",label:"붕따우",prefixes:["/vung-tau/"],sections:destinationSections.map(section=>section.key==="accommodation"?{...section,legacy:["vungtau"]}:section)},
  {key:"phu-quoc",label:"푸꾸옥",prefixes:["/phu-quoc/"],sections:destinationSections.map(section=>section.key==="accommodation"?{...section,legacy:["phuquoc"]}:section)},
  {key:"site",label:"공통 콘텐츠",prefixes:["/notice/","/event/","/service/","/article/"],sections:[
    {key:"notice",label:"공지사항",legacy:[]},{key:"event",label:"이벤트",legacy:[]},{key:"service",label:"서비스",legacy:[]},{key:"other",label:"기타 게시물",legacy:["casino"]},
  ]},
];

function itemRegion(item:Item){
  const category=item.category??"";
  const byCategory=regions.find(region=>region.sections.some(section=>section.legacy.includes(category)));
  if(byCategory)return byCategory.key;
  const href=item.href??"";
  return regions.find(region=>region.prefixes.some(prefix=>href.startsWith(prefix)))?.key??"site";
}
function itemSection(item:Item,region:Region){
  const href=item.href??"";
  if(region.key==="site"){
    if(item.kind==="notice"||href.startsWith("/notice/"))return "notice";
    if(item.kind==="event"||href.startsWith("/event/"))return "event";
    if(item.kind==="service"||href.startsWith("/service/"))return "service";
    return "other";
  }
  const category=item.category??"";
  const byCategory=region.sections.find(section=>section.legacy.includes(category));if(byCategory)return byCategory.key;
  const pathSection=href.match(new RegExp(`^/${region.key}/([^/]+)`))?.[1];
  return pathSection&&region.sections.some(section=>section.key===pathSection)?pathSection:"other";
}
function filterHref(search:Search,changes:Partial<Search>={}){
  const merged={...search,...changes};
  const params=new URLSearchParams();
  for(const [key,value] of Object.entries(merged))if(value&&value!=="all"&&!(key==="page"&&value==="1"))params.set(key,value);
  const string=params.toString();return `/admin/content${string?`?${string}`:""}`;
}

export default async function ContentPage({searchParams}:{searchParams:Promise<Search>}){
  const query=await searchParams;const q=query.q?.trim()??"";const status=query.status??"all";const selectedRegion=query.region??"all";const selectedSection=query.section??"all";
  const clauses=["kind!='category'","status!='deleted'"];const values:string[]=[];
  if(q){clauses.push("title LIKE ?");values.push(`%${q}%`)}if(status==="draft"||status==="published"){clauses.push("status=?");values.push(status)}
  const allItems=database.prepare(`SELECT id,title,slug,kind,category,href,status,updated_at FROM content_items WHERE ${clauses.join(" AND ")} ORDER BY updated_at DESC`).all(...values) as Item[];
  const region=regions.find(item=>item.key===selectedRegion);
  const filtered=allItems.filter(item=>selectedRegion==="all"||itemRegion(item)===selectedRegion).filter(item=>!region||selectedSection==="all"||itemSection(item,region)===selectedSection);
  const pageSize=20;const pageCount=Math.max(1,Math.ceil(filtered.length/pageSize));const requested=Number.parseInt(query.page??"1",10);const page=Number.isFinite(requested)?Math.min(Math.max(requested,1),pageCount):1;const items=filtered.slice((page-1)*pageSize,page*pageSize);
  const regionCounts=new Map(regions.map(item=>[item.key,allItems.filter(row=>itemRegion(row)===item.key).length]));
  return <main className="mx-auto max-w-[1500px] px-4 py-7 md:px-7 lg:px-10 lg:py-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-semibold">게시물 관리</h1><p className="mt-2 text-[#646970]">웹사이트 메뉴에 맞게 지역과 카테고리를 선택하세요.</p></div><Link href="/admin/content/new" className="inline-flex items-center gap-2 rounded-md bg-[#2271b1] px-5 py-3 font-semibold text-white"><Plus className="size-4"/>새 게시물</Link></div>
    <nav className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"><Link href={filterHref(query,{region:"all",section:"all",page:"1"})} className={`rounded-md border px-4 py-3 text-sm font-semibold ${selectedRegion==="all"?"border-[#2271b1] bg-[#2271b1] text-white":"border-[#c3c4c7] bg-white hover:border-[#2271b1]"}`}>전체 <span className="ml-1 opacity-70">({allItems.length})</span></Link>{regions.map(item=><Link key={item.key} href={filterHref(query,{region:item.key,section:"all",page:"1"})} className={`rounded-md border px-4 py-3 text-sm font-semibold ${selectedRegion===item.key?"border-[#2271b1] bg-[#2271b1] text-white":"border-[#c3c4c7] bg-white hover:border-[#2271b1]"}`}>{item.label} <span className="ml-1 opacity-70">({regionCounts.get(item.key)??0})</span></Link>)}</nav>
    {region?<nav className="mt-3 grid gap-2 rounded-md border border-[#c3c4c7] bg-white p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"><Link href={filterHref(query,{section:"all",page:"1"})} className={`rounded-md border px-4 py-3 text-sm font-semibold ${selectedSection==="all"?"border-[#1d2327] bg-[#1d2327] text-white":"border-[#dcdcde] bg-[#f6f7f7] hover:border-[#2271b1]"}`}>{region.label} 전체 ({regionCounts.get(region.key)??0})</Link>{region.sections.map(section=>{const count=allItems.filter(item=>itemRegion(item)===region.key&&itemSection(item,region)===section.key).length;return <Link key={section.key} href={filterHref(query,{section:section.key,page:"1"})} className={`rounded-md border px-4 py-3 text-sm font-semibold ${selectedSection===section.key?"border-[#2271b1] bg-[#2271b1] text-white":"border-[#dcdcde] bg-white hover:border-[#2271b1]"}`}>{fullSectionLabel(region,section)} ({count})</Link>})}</nav>:null}
    <form className="mt-5 flex max-w-3xl flex-wrap gap-2"><input type="hidden" name="region" value={selectedRegion}/><input type="hidden" name="section" value={selectedSection}/><input name="q" defaultValue={q} placeholder="제목 검색" className="h-11 min-w-60 flex-1 rounded-md border border-[#8c8f94] bg-white px-3"/><select name="status" defaultValue={status} className="h-11 rounded-md border border-[#8c8f94] bg-white px-3"><option value="all">전체 상태</option><option value="published">공개</option><option value="draft">임시글</option></select><button className="rounded-md border border-[#2271b1] px-5 font-semibold text-[#2271b1]">필터</button>{q||status!=="all"?<Link href={filterHref(query,{q:"",status:"all",page:"1"})} className="flex items-center px-3 text-sm text-[#646970] underline">필터 초기화</Link>:null}</form>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-[#646970]"><span>총 <strong className="text-[#1d2327]">{filtered.length}</strong>개 게시물 · {page}/{pageCount} 페이지</span><span>{filtered.length?((page-1)*pageSize)+1:0}–{Math.min(page*pageSize,filtered.length)} 표시</span></div>
    <div className="mt-3 overflow-x-auto rounded-lg border border-[#c3c4c7] bg-white"><table className="w-full min-w-[1000px] text-left text-sm"><thead className="border-b bg-[#f6f7f7]"><tr><th className="p-4">제목</th><th>지역</th><th>카테고리</th><th>URL</th><th>상태</th><th>업데이트</th><th></th></tr></thead><tbody className="divide-y">{items.map(item=>{const itemRegionKey=itemRegion(item);const itemRegionData=regions.find(value=>value.key===itemRegionKey);const sectionKey=itemRegionData?itemSection(item,itemRegionData):"other";const sectionLabel=itemRegionData?.sections.find(value=>value.key===sectionKey)?.label??item.category??"기타";return <tr key={item.id} className="hover:bg-[#f9f9f9]"><td className="p-4"><Link href={`/admin/content/${item.id}`} className="font-semibold text-[#2271b1] hover:underline">{item.title}</Link></td><td>{itemRegionData?.label??"기타"}</td><td>{sectionLabel}</td><td className="max-w-56 truncate">{item.href??(item.slug?`/article/${item.slug}`:"-")}</td><td><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status==="published"?"bg-green-100 text-green-800":"bg-amber-100 text-amber-800"}`}>{item.status==="published"?"공개":"임시글"}</span></td><td>{new Date(item.updated_at).toLocaleDateString("ko-KR")}</td><td className="pr-4">{item.status==="published"&&item.href?<a href={item.href} target="_blank" className="text-[#2271b1] hover:underline">보기</a>:null}</td></tr>})}{!items.length?<tr><td colSpan={7} className="p-12 text-center text-[#646970]">조건에 맞는 게시물이 없습니다.</td></tr>:null}</tbody></table></div>
    {pageCount>1?<nav className="mt-5 flex flex-wrap items-center justify-center gap-1" aria-label="Phân trang"><Link aria-disabled={page===1} href={filterHref(query,{page:String(Math.max(1,page-1))})} className={`grid size-10 place-items-center rounded-md border ${page===1?"pointer-events-none opacity-40":"bg-white hover:border-[#2271b1]"}`}><ChevronLeft className="size-4"/></Link>{Array.from({length:pageCount},(_,index)=>index+1).filter(number=>number===1||number===pageCount||Math.abs(number-page)<=2).map((number,index,array)=><span key={number} className="contents">{index>0&&number-array[index-1]>1?<span className="grid size-10 place-items-center">…</span>:null}<Link href={filterHref(query,{page:String(number)})} className={`grid size-10 place-items-center rounded-md border text-sm font-semibold ${number===page?"border-[#2271b1] bg-[#2271b1] text-white":"bg-white hover:border-[#2271b1]"}`}>{number}</Link></span>)}<Link aria-disabled={page===pageCount} href={filterHref(query,{page:String(Math.min(pageCount,page+1))})} className={`grid size-10 place-items-center rounded-md border ${page===pageCount?"pointer-events-none opacity-40":"bg-white hover:border-[#2271b1]"}`}><ChevronRight className="size-4"/></Link></nav>:null}
  </main>;
}
