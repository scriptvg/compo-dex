

import { Button } from "@/components/ui/button"

import { ArrowUpRight, CirclePlay } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

import { CLICommand } from "@/components/ui/cli-command"
import { Hero, HeroBadge, HeroContainer, HeroCTA, HeroDescription, HeroTitle } from "@/components/ui/hero"
import { Page } from "@/components/layout/page"


export const metadata: Metadata = {
  title: "Compodex UI",
  description: "The best way to build your own Pokedex App",
};

export default async function MainPage() {


  return (
    <Page>

      <Hero>
        <HeroContainer>
          <HeroBadge>
            <Link href="#">Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" /></Link>
          </HeroBadge>
          <HeroTitle>
            A production-ready UI kit for serious Pokédex apps
          </HeroTitle>
          <HeroDescription>
            A domain-driven component library built on top of shadcn/ui, designed
            to handle complex Pokémon data with speed, consistency, and full
            customization.
          </HeroDescription>
          <CLICommand command="pnpm dlx shadcn@latest add @compodex/ui/pokemon-badge" />
          <HeroCTA>
            <Button className="w-full sm:w-auto" size="lg" asChild>
              <Link href="/docs/getting-started">
                Get Started <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button className="w-full sm:w-auto" size="lg" variant="outline" asChild>
              <Link href="/pokedex">
                View Pokedex Demo <CirclePlay data-icon="inline-end" />
              </Link>
            </Button>
          </HeroCTA>
        </HeroContainer>
      </Hero>
        

    </Page>
  )
}
