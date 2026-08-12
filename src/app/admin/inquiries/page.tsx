import { database } from "@/lib/database";
import { AdminInquiries } from "@/components/admin-dashboard";
type Inquiry={id:number;name:string;contact:string;topic:string;message:string;status:string;created_at:string};
export default function InquiriesPage(){const items=database.prepare("SELECT id,name,contact,topic,message,status,created_at FROM inquiries ORDER BY created_at DESC LIMIT 100").all() as Inquiry[];return <main className="mx-auto max-w-[1500px] space-y-6 px-4 py-7 md:px-7 lg:px-10 lg:py-10"><div><h1 className="text-3xl font-semibold">문의 관리</h1><p className="mt-2 text-[#646970]">고객 문의 상태를 확인하고 변경합니다.</p></div><AdminInquiries inquiries={items}/></main>}
