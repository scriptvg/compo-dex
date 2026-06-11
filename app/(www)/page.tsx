

import { Button } from "@/components/ui/button"

import { ArrowUpRight, BookCheck, ChartPie, CirclePlay, FolderSync, Goal, Users, Zap } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

import { CLICommand } from "@/components/ui/cli-command"
import { Hero, HeroBadge, HeroContainer, HeroCTA, HeroDescription, HeroTitle } from "@/components/ui/hero"
import { Page } from "@/components/ui/page"
import { FeaturesSection } from "@/components/layout/features"
import { HowItWorks } from "@/components/how-works"
import { Section } from "@/components/ui/section"


export const metadata: Metadata = {
  title: "Compodex UI",
  description: "The best way to build your own Pokedex App",
};

const MetaHero = {
  badge: {
    text: "Just released v1.0.0",
    href: "/",
  },
  title: "A production-ready UI kit for serious Pokédex apps",
  description: "A domain-driven component library built on top of shadcn/ui, designed to handle complex Pokémon data with speed, consistency, and full customization.",
  command: "pnpm dlx shadcn@latest add @compodex/ui/pokemon-badge",
  cta: [
    {
      text: "Get Started",
      href: "/docs/getting-started",
      icon: ArrowUpRight,
      variant: "default",
    },
    {
      text: "View Pokedex Demo",
      href: "/pokedex",
      icon: CirclePlay,
      variant: "outline",
    },
  ],
} as const;

export default async function MainPage() {


  return (
    <Page>
      <Hero>
        <HeroContainer>
          <HeroBadge>
            <Link href={MetaHero.badge.href}>
              {MetaHero.badge.text} 
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </HeroBadge>
          <HeroTitle>
            {MetaHero.title}
          </HeroTitle>
          <HeroDescription>
            {MetaHero.description}  
          </HeroDescription>
          <CLICommand command={MetaHero.command} />
          <HeroCTA>
            {MetaHero.cta.map((cta) => (
              <Button key={cta.text} className="w-full sm:w-auto" size="lg" variant={cta.variant} asChild>
                <Link href={cta.href}>
                  {cta.text} <cta.icon data-icon="inline-end" />
                </Link>
              </Button>
            ))}
          </HeroCTA>
        </HeroContainer>
      </Hero>

      <Section>

      </Section>
    </Page>
  )
}
