"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, KeyRound, Save } from "lucide-react";

export function AdminChangePasswordForm(){
  const [pending,setPending]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const [visible,setVisible]=useState<Record<string,boolean>>({});
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setError("");setSuccess("");
    const formElement=event.currentTarget;const form=new FormData(formElement);const currentPassword=String(form.get("currentPassword")??"");const newPassword=String(form.get("newPassword")??"");const confirmPassword=String(form.get("confirmPassword")??"");
    if(newPassword!==confirmPassword)return setError("새 비밀번호가 일치하지 않습니다.");
    setPending(true);const response=await fetch("/api/auth/change-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword,newPassword})});const result=await response.json() as {error?:string};setPending(false);
    if(!response.ok)return setError(result.error??"비밀번호를 변경하지 못했습니다.");
    formElement.reset();setVisible({});setSuccess("비밀번호가 안전하게 변경되었습니다.");
  }
  const field="h-12 w-full rounded-md border border-[#8c8f94] bg-white px-4 pr-12 outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]";
  const passwordField=(name:string,label:string,autoComplete:string)=><label className="block text-sm font-semibold">{label}<span className="relative mt-2 block"><input required minLength={name==="currentPassword"?undefined:8} type={visible[name]?"text":"password"} name={name} autoComplete={autoComplete} className={field}/><button type="button" onClick={()=>setVisible(current=>({...current,[name]:!current[name]}))} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-[#646970] hover:text-[#2271b1]" aria-label={visible[name]?"비밀번호 숨기기":"비밀번호 보기"}>{visible[name]?<EyeOff className="size-5"/>:<Eye className="size-5"/>}</button></span></label>;
  return <form onSubmit={submit} className="mt-6 space-y-5 rounded-lg border border-[#c3c4c7] bg-white p-6 shadow-sm md:p-8"><div className="flex items-center gap-3 border-b border-[#dcdcde] pb-5"><span className="grid size-11 place-items-center rounded-full bg-[#e5f3ff] text-[#2271b1]"><KeyRound className="size-5"/></span><div><h2 className="font-semibold">관리자 비밀번호 변경</h2><p className="mt-1 text-sm text-[#646970]">영문과 숫자를 포함해 8자 이상 입력하세요.</p></div></div>{passwordField("currentPassword","현재 비밀번호","current-password")}{passwordField("newPassword","새 비밀번호","new-password")}{passwordField("confirmPassword","새 비밀번호 확인","new-password")}{error?<p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>:null}{success?<p className="rounded-md bg-green-50 p-3 text-sm text-green-800">{success}</p>:null}<button disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-md bg-[#2271b1] px-5 py-3 font-semibold text-white disabled:opacity-50"><Save className="size-4"/>{pending?"변경 중...":"비밀번호 변경"}</button></form>;
}
