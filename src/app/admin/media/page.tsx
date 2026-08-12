import { AdminSiteEditor } from "@/components/admin-site-editor";
import { getSiteSettings } from "@/lib/site-settings";
export default function MediaPage(){return <main className="mx-auto max-w-[1500px] px-4 py-7 md:px-7 lg:px-10 lg:py-10"><div className="mb-6"><h1 className="text-3xl font-semibold">이미지 관리</h1><p className="mt-2 text-[#646970]">웹사이트에 표시되는 주요 이미지를 업로드합니다.</p></div><AdminSiteEditor initialSettings={getSiteSettings()} section="media"/></main>}
