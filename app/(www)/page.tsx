

import { Button } from "@/components/ui/button"

import { ArrowUpRight, BookCheck, ChartPie, CirclePlay, FolderSync, Goal, Users, Zap } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { CLICommand } from "@/components/ui/cli-command"
import { Hero, HeroBadge, HeroContainer, HeroCTA, HeroDescription, HeroTitle } from "@/components/ui/hero"
import { Page } from "@/components/layout/page"
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
  description:
    "A domain-driven component library built on top of shadcn/ui, designed to handle complex Pokémon data with speed, consistency, and full customization.",
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

const MetaFeatures = {
  badge: "Features",
  title: "Everything you need to build a real Pokédex",
  description: "Purpose-built components for data-heavy Pokémon applications.",
  features: [
    {
      icon: Zap,
      title: "Fast by default",
      description: "Optimized data fetching and rendering for large lists of Pokémon.",
    },
    {
      icon: ChartPie,
      title: "Rich data display",
      description: "Stats, types, evolutions and sprites as ready-to-use building blocks.",
    },
    {
      icon: FolderSync,
      title: "Bring your own source",
      description: "Works with PokéAPI, GraphQL, local JSON or your own backend.",
    },
    {
      icon: Goal,
      title: "Domain-driven",
      description: "Components model real Pokémon concepts, not generic primitives.",
    },
    {
      icon: BookCheck,
      title: "Fully typed",
      description: "End-to-end TypeScript so your data and UI stay in sync.",
    },
    {
      icon: Users,
      title: "Composable",
      description: "Customize styling, layout and state without fighting abstractions.",
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

{/*       <Section>
        <FeaturesSection
          badge={MetaFeatures.badge}
          title={MetaFeatures.title}
          description={MetaFeatures.description}
          features={[...MetaFeatures.features]}
        />
      </Section>

      <HowItWorks /> */}
    </Page>
  )
}
