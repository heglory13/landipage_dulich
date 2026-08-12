"use client";

import { FormEvent, useState } from "react";
import { ImageIcon, Save, Upload } from "lucide-react";

type Settings = Record<string, string>;

export function AdminSiteEditor({ initialSettings, section = "all" }: { initialSettings: Settings; section?: "all" | "info" | "media" }) {
  const [settings, setSettings] = useState(initialSettings);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");

  function change(key: string, value: string) { setSettings((current) => ({ ...current, [key]: value })); }

  async function save(event: FormEvent) {
    event.preventDefault(); setPending(true); setNotice("");
    const response = await fetch("/api/admin/site-settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setPending(false); setNotice(response.ok ? "저장되었습니다. 웹사이트를 새로고침하면 반영됩니다." : "저장하지 못했습니다.");
  }

  async function upload(key: string, file?: File) {
    if (!file) return;
    setPending(true); setNotice("");
    const form = new FormData(); form.set("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const result = await response.json() as { url?: string; error?: string };
    if (response.ok && result.url) change(key, result.url);
    setPending(false); setNotice(response.ok ? "이미지가 업로드되었습니다. 저장 버튼을 눌러 적용하세요." : result.error ?? "업로드하지 못했습니다.");
  }

  const fieldClass = "mt-2 h-11 w-full rounded-md border border-[#8c8f94] bg-white px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]";
  return (
    <form onSubmit={save} className="space-y-7">
      {section !== "media" ? <section id="site-info" className="rounded-lg border border-[#c3c4c7] bg-white p-5 shadow-sm md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#2271b1]">Website content</p><h2 className="mt-2 text-2xl font-semibold">웹사이트 정보 관리</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[['site_name','사이트 이름'],['hero_eyebrow','메인 상단 문구'],['hero_title_line1','메인 제목 1'],['hero_title_accent','강조 문구'],['hero_title_line2','메인 제목 2'],['contact_email','연락 이메일'],['hotline','핫라인']].map(([key,label]) => <label key={key} className="text-sm font-semibold">{label}<input className={fieldClass} value={settings[key] ?? ""} onChange={(e) => change(key,e.target.value)} /></label>)}
          <label className="text-sm font-semibold md:col-span-2">메인 설명<textarea className={`${fieldClass} h-28 py-3`} value={settings.hero_description ?? ""} onChange={(e) => change("hero_description",e.target.value)} /></label>
        </div>
      </section> : null}
      {section !== "info" ? <section id="media" className="rounded-lg border border-[#c3c4c7] bg-white p-5 shadow-sm md:p-7">
        <div className="flex items-center gap-3"><ImageIcon className="size-6 text-[#2271b1]"/><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#2271b1]">Media</p><h2 className="mt-1 text-2xl font-semibold">이미지 관리</h2></div></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[['hero_poster','메인 비디오 포스터'],['promo_image','환영 팝업 이미지']].map(([key,label]) => <div key={key} className="rounded-lg border border-[#dcdcde] p-4"><p className="font-semibold">{label}</p><div className="mt-3 flex min-h-52 items-center justify-center overflow-hidden rounded-md bg-[#f0f0f1]"><img src={settings[key]} alt="" className="max-h-72 max-w-full object-contain" /></div><input className={fieldClass} value={settings[key] ?? ""} onChange={(e) => change(key,e.target.value)} /><label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#2271b1] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"><Upload className="size-4"/>이미지 업로드<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => upload(key,e.target.files?.[0])}/></label></div>)}
        </div>
      </section> : null}
      {notice ? <p className="rounded-md border border-[#c3c4c7] bg-white p-4 text-sm">{notice}</p> : null}
      <div className="sticky bottom-4 flex justify-end"><button disabled={pending} className="inline-flex items-center gap-2 rounded-md bg-[#2271b1] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#135e96] disabled:opacity-60"><Save className="size-4"/>{pending ? "처리 중..." : "변경사항 저장"}</button></div>
    </form>
  );
}
