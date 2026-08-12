import { AdminSiteEditor } from "@/components/admin-site-editor";
import { getSiteSettings } from "@/lib/site-settings";
export default function SettingsPage(){return <main className="mx-auto max-w-[1500px] px-4 py-7 md:px-7 lg:px-10 lg:py-10"><div className="mb-6"><h1 className="text-3xl font-semibold">웹사이트 정보</h1><p className="mt-2 text-[#646970]">메인 문구와 연락처 정보를 수정합니다.</p></div><AdminSiteEditor initialSettings={getSiteSettings()} section="info"/></main>}
