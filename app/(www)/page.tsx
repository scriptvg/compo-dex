import { Button } from "@/components/ui/button"

import { ArrowUpRight, CirclePlay, Info } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { CLICommand } from "@/components/ui/cli-command"

import { Page } from "@/components/layout/page"
import { FeaturesSection } from "@/components/layout/features"
import { siteConfig } from "@/lib/site-config"
import {MainHero} from "@/components/marketing/main-hero"

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function MainPage() {
  return (
    <Page className="">
        <MainHero/>
     
    </Page>
  )
}
