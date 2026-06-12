import { Hero } from "@/components/ui/hero"
import { HeroShowcase } from "@/components/marketing/hero-showcase"
import { siteConfig } from "@/lib/site-config"
import { ArrowUpRight, CirclePlay } from "lucide-react"
import Link from "next/link"
import { CLICommand } from "../ui/cli-command"
import { Button } from "../ui/button"

export function MainHero() {
  return (
    <Hero>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 py-6 lg:grid-cols-2 lg:gap-16">
        {/* Copy + CTA */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Hero.Badge>
            <Link href={siteConfig.public.hero.badge.link}>
              {siteConfig.public.hero.badge.label}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Hero.Badge>
          <Hero.Title className="lg:text-5xl xl:text-6xl">
            {siteConfig.public.hero.title}
          </Hero.Title>
          <Hero.Description>
            {siteConfig.public.hero.description}
          </Hero.Description>
          <CLICommand className="lg:mx-0" command={siteConfig.public.hero.commands[0]} />
          <Hero.CTA className="lg:justify-start">
            <Button className="w-full sm:w-auto" size="lg" asChild>
              <Link href={siteConfig.public.hero.cta.getStarted.link}>
                {siteConfig.public.hero.cta.getStarted.label}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href={siteConfig.public.hero.cta.viewDemo.link}>
                {siteConfig.public.hero.cta.viewDemo.label}
                <CirclePlay data-icon="inline-end" />
              </Link>
            </Button>
          </Hero.CTA>
        </div>

        {/* Live component showcase */}
        <HeroShowcase className="w-full max-w-md justify-self-center lg:max-w-none" />
      </div>
    </Hero>
  )
}
