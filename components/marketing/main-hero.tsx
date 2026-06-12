import { Hero } from "@/components/ui/hero"
import { siteConfig } from "@/lib/site-config"
import { ArrowUpRight, CirclePlay } from "lucide-react"
import Link from "next/link"
import { CLICommand } from "../ui/cli-command"
import { Button } from "../ui/button"

export function MainHero() {
  return (
    <Hero>
      <Hero.Container>
        <Hero.Badge>
          <Link href={siteConfig.public.hero.badge.link}>
            {siteConfig.public.hero.badge.label}
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Hero.Badge>
        <Hero.Title>{siteConfig.public.hero.title}</Hero.Title>
        <Hero.Description>
          {siteConfig.public.hero.description}
        </Hero.Description>
        <CLICommand command={siteConfig.public.hero.commands[0]} />
        <Hero.CTA>
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
      </Hero.Container>
    </Hero>
  )
}
