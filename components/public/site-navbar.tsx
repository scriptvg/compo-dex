import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { MobileMenu } from "@/components/mobile-nav"
import { DocsSearch } from "@/components/docs/docs-search"
import { GithubStars } from "@/components/docs/github-stars"
import { ToggleTheme } from "@/components/ui/toggle-theme"
import { Navbar, NavbarContainer } from "@/components/ui/navbar"
import { DesktopMenu } from "./desktop-menu"

export function AppNavbar() {
  return (
    <Navbar className="sticky top-0 z-50 h-(--header-height) bg-background">
      <NavbarContainer className="h-full">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            asChild
            size="icon"
            className="hidden md:flex"
          >
            <Link href="/">
              <Logo alt="Kromm Solutions" />
            </Link>
          </Button>
          <MobileMenu />
          <DesktopMenu />
        </div>
        <div className="flex items-center gap-2">
          <DocsSearch className="hidden md:flex" />
          <GithubStars />
          <ToggleTheme />
        </div>
      </NavbarContainer>
    </Navbar>
  )
}
