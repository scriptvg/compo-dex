import { cn } from "@/lib/utils"
import { Layout } from "@/components/ui/layout"
import { Main } from "@/components/ui/main"
import { Logo } from "@/components/ui/logo"
import { Header, HeaderContainer } from "@/components/ui/header"
import { ToggleTheme } from "@/components/ui/toggle-theme"

import Link from "next/link"
import { Button } from "@/components/ui/button"


function Navbar() {
    return (
        <Header className="sticky top-0 z-50 bg-background/50 backdrop-blur-sm">
            <HeaderContainer>
                <Button variant="ghost" asChild size="icon">
                    <Link href="/">
                        <Logo alt="Logo" />
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="/pokedex">
                            Pokedex
                        </Link>
                    </Button>
                    
                    <ToggleTheme />
                </div>
            </HeaderContainer>
        </Header>
    )
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Layout>
            <Navbar />
            <Main>{children}</Main>
        </Layout>
    )
}