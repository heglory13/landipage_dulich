export function articleSlug(href: string) {
  let slug=href.split("/").filter(Boolean).at(-1) ?? "";
  for(let index=0;index<3;index+=1){try{const decoded=decodeURIComponent(slug);if(decoded===slug)break;slug=decoded}catch{break}}
  return slug;
}
export function canonicalArticleHref(category: string, oldHref: string) {
  const slug = articleSlug(oldHref);
  const routes: Record<string,string> = {
    accommodation:"/ho-chi-minh/accommodation",karaoke:"/ho-chi-minh/karaoke",club:"/ho-chi-minh/club",bar:"/ho-chi-minh/bar",salon:"/ho-chi-minh/salon",massage:"/ho-chi-minh/massage",golf:"/ho-chi-minh/golf",sights:"/ho-chi-minh/travel",restaurant:"/ho-chi-minh/restaurant",
    danangroom:"/da-nang/accommodation",danangkaraoke:"/da-nang/karaoke",danangsalon:"/da-nang/salon",danangclub:"/da-nang/club",danangbar:"/da-nang/bar",danangmassage:"/da-nang/massage",danangfood:"/da-nang/restaurant",
    nhatrangktv:"/nha-trang/karaoke",nhatrangsalon:"/nha-trang/salon",nhatrangmassage:"/nha-trang/massage",nhatrangclub:"/nha-trang/club",dalatktv:"/da-lat/karaoke",vungtau:"/vung-tau",phuquoc:"/phu-quoc",
  };
  // Next.js encodes non-ASCII redirect paths itself. Returning an already
  // encoded slug would turn `%EB` into `%25EB` and produce intermittent 404s.
  return routes[category] ? `${routes[category]}/${slug}` : oldHref;
}
