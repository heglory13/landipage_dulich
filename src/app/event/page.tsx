import { BenefitPage } from "@/components/benefit-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default async function EventPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page ?? "1") || 1;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BenefitPage kind="event" currentPage={currentPage} />
      <Footer />
    </main>
  );
}
