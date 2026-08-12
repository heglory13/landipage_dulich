import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Collections } from "@/components/collections";
import { FeaturedProducts } from "@/components/featured-products";
import { Heritage } from "@/components/heritage";
import { Personalization } from "@/components/personalization";
import { Sustainability } from "@/components/sustainability";
import { Press } from "@/components/press";
import { Services } from "@/components/services";
import { Journal } from "@/components/journal";
import { Newsletter } from "@/components/newsletter";
import { Boutiques } from "@/components/boutiques";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Collections />
      <FeaturedProducts />
      <Heritage />
      <Personalization />
      <Sustainability />
      <Press />
      <Services />
      <Journal />
      <Boutiques />
      <Newsletter />
      <Footer />
    </main>
  );
}
