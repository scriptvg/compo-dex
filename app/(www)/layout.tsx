"use client"

import { Layout } from "@/components/layout/layout"
import { Main } from "@/components/layout/main"
import { Logo } from "@/components/ui/logo"
import { Navbar, NavbarContainer } from "@/components/ui/navbar"
import { ToggleTheme } from "@/components/ui/toggle-theme"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query"
import { DocsSearch } from "@/components/docs/docs-search"
import { MobileMenu } from "@/components/mobile-nav"


function AppNavbar() {
    return (
        <Navbar className="sticky top-0 z-50 h-(--header-height) bg-background">
            <NavbarContainer className="h-full">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild size="icon" className="hidden md:flex">
                        <Link href="/">
                            <Logo alt="Logo" />
                        </Link>
                    </Button>
                    <MobileMenu />
                    {/*                     <Button variant="ghost" asChild>
                        <Link href="/docs">
                            Docs
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/pokedex">
                            Pokedex
                        </Link>
                    </Button> */}
                </div>
                <div className="flex items-center gap-2">
                    <DocsSearch className="hidden md:flex" />
                    {/* <GithubStars /> */}
                    <ToggleTheme />
                </div>
            </NavbarContainer>
        </Navbar>
    )
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <AppNavbar />
                <Main>{children}</Main>
            </Layout>
        </QueryClientProvider>
    )
}