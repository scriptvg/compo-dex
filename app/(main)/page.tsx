

import { Button } from "@/components/ui/button"

import { ArrowUpRight, CirclePlay } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

import { CLICommand } from "@/components/ui/cli-command"


export const metadata: Metadata = {
  title: "Compodex UI",
  description: "The best way to build your own Pokedex App",
};

export default async function MainPage() {


  return (
    <div className="flex flex-col items-center justify-center">
      {/* <Hero /> */}
      <div className="flex min-h-[calc(100dvh-2rem)] mx-auto border-b border-dashed w-full items-center justify-center px-4 sm:px-6">
        <div className="max-w-3xl text-center mx-auto py-6 w-full">
          <Badge
            asChild
            className="rounded-full border-border py-1"
            variant="secondary"
          >
            <Link href="#">
              Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>
          <h1 className="mt-6 font-satoshi font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
            A production-ready UI kit for serious Pokédex apps
          </h1>
          <p className="mt-6 text-foreground/80 md:text-lg">
            A domain-driven component library built on top of shadcn/ui, designed
            to handle complex Pokémon data with speed, consistency, and full
            customization.
          </p>
          <CLICommand command="pnpm dlx shadcn@latest add @compodex/ui/pokemon-badge" />
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button className="rounded-full text-base w-full sm:w-auto" size="lg">
              Get Started <ArrowUpRight className="size-5" />
            </Button>
            <Button
              className="rounded-full text-base shadow-none w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="size-5" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
