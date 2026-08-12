import { getSiteSettings } from "@/lib/site-settings";

export async function GET() {
  return Response.json({ settings: getSiteSettings() }, { headers: { "Cache-Control": "no-store" } });
}
