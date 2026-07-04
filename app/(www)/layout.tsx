"use client"

import { Layout } from "@/components/layout/layout"
import { Main } from "@/components/layout/main"
import * as React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query"
import { AppNavbar } from "@/components/public/site-navbar"
import { SiteFooter } from "@/components/marketing/site-footer"



export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout className="">
        <AppNavbar />
        <Main className="">
          {children}
        </Main>
        <SiteFooter />
      </Layout>
    </QueryClientProvider>
  )
}
