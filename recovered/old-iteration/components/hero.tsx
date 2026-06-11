import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex h-[calc(100dvh-3rem)] p-6 items-center justify-center px-6 border-b border-dashed ">
      <div className="max-w-3xl text-center">
        <Badge asChild className="border-border py-1" variant="secondary">
          <Link href="#">
            Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>

        <h1 className="mt-6 font-semibold text-4xl tracking-tighter sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          A production-ready UI kit for serious Pokédex apps
        </h1>

        <p className="mt-6 text-foreground/80 md:text-lg">
          A domain-driven component library built on top of shadcn/ui, designed
          to handle complex Pokémon data with speed, consistency, and full
          customization.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base">
            Get started <ArrowUpRight className="size-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base shadow-none"
            asChild
          >
            <Link href="/pokedex">
              <CirclePlay className="size-5" /> Watch demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
