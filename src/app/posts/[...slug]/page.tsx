import { notFound, redirect } from "next/navigation";
import { canonicalArticleHref } from "@/lib/content-routes";

const listingRoutes: Record<string,string> = {
  accommodation:"/ho-chi-minh/accommodation", karaoke:"/ho-chi-minh/karaoke", club:"/ho-chi-minh/club",
  bar:"/ho-chi-minh/bar", salon:"/ho-chi-minh/salon", massage:"/ho-chi-minh/massage", golf:"/ho-chi-minh/golf",
  sights:"/ho-chi-minh/travel", restaurant:"/ho-chi-minh/restaurant", notice:"/notice", event:"/event", service:"/service",
  danangroom:"/da-nang/accommodation", danangkaraoke:"/da-nang/karaoke", danangsalon:"/da-nang/salon",
  danangclub:"/da-nang/club", danangbar:"/da-nang/bar", danangmassage:"/da-nang/massage", danangfood:"/da-nang/restaurant",
  nhatrangktv:"/nha-trang/karaoke", nhatrangsalon:"/nha-trang/salon", nhatrangmassage:"/nha-trang/massage",
  nhatrangclub:"/nha-trang/club", dalatktv:"/da-lat/karaoke", vungtau:"/vung-tau", phuquoc:"/phu-quoc",
};

export default async function LegacyPostsRedirect({params}:{params:Promise<{slug:string[]}>}) {
  const parts=(await params).slug;
  const category=parts[0];
  if(!category || !listingRoutes[category]) return notFound();
  if(parts.length===1) return redirect(listingRoutes[category]);
  if(category==="notice"||category==="event"||category==="service") return redirect(`/${category}/${encodeURIComponent(parts.at(-1)!)}`);
  const oldHref=`/posts/${parts.map(encodeURIComponent).join("/")}`;
  return redirect(canonicalArticleHref(category,oldHref));
}
