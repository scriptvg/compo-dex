import { Button } from "@/components/ui/button"

import { ArrowUpRight, CirclePlay, Info } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { CLICommand } from "@/components/ui/cli-command"

import { Page } from "@/components/layout/page"
import { siteConfig } from "@/lib/site-config"
import { MainHero } from "@/components/marketing/main-hero"
import { Features } from "@/components/marketing/features"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { CoreBuilding } from "@/components/marketing/core-building"
import { WhyThisKit } from "@/components/marketing/why-this-kit"
import { Faq } from "@/components/marketing/faq"

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function MainPage() {
  return (
    <Page className="max-w-none">
      <MainHero />
      <Features />
      <HowItWorks />
      <CoreBuilding />
      <WhyThisKit />
      <Faq />
    </Page>
  )
}
