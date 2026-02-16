import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compo-dex | A production-ready UI kit for serious Pokédex apps",
  description: "A production-ready UI kit for serious Pokédex apps",
  openGraph: {
    title: "Compo-dex",
    description: "A production-ready UI kit for serious Pokédex apps",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Compo-dex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compo-dex",
    description: "A production-ready UI kit for serious Pokédex apps",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <div data-slot="home-page" className="flex-1">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}
