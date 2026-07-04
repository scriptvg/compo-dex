import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { siteConfig } from "@/lib/site-config"

const REPO_URL = "https://github.com/scriptvg/compo-dex"

const footerLinks = [
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs/introduction" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Build a Pokédex", href: "/docs/build-a-pokedex" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Pokemon Badge", href: "/docs/components/pokemon-badge" },
      { label: "Pokemon Card", href: "/docs/components/pokemon-card" },
      { label: "Pokemon Sprite", href: "/docs/components/pokemon-sprite" },
      { label: "Pokemon Stat", href: "/docs/components/pokemon-stat" },
      { label: "Pokedex", href: "/docs/components/pokedex" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Pokedex Demo", href: "/pokedex" },
      { label: "GitHub", href: REPO_URL, external: true },
      { label: "shadcn/ui", href: "https://ui.shadcn.com", external: true },
    ],
  },
]

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground/80 transition-colors hover:text-foreground"
    >
      {children}
    </a>
  )
}

export function SiteFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn("border-t border-dashed", className)}
      {...props}
    >
      <div className="container mx-auto border-x border-dashed">
        <div className="grid w-full gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex w-fit items-center gap-2">
            <Logo alt="Compodex UI" />
            <span className="text-sm font-semibold">{siteConfig.title}</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.public.hero.description}
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            This project is crafted by{" "}
            <ExternalLink href="https://github.com/scriptvg">
              scriptvg
            </ExternalLink>
            . Peep the source code on{" "}
            <ExternalLink href={REPO_URL}>GitHub</ExternalLink>.
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Not affiliated with Nintendo or The Pokémon Company.
          </p>
          <p className="text-sm font-medium">2026 · Compodex UI</p>
        </div>

        {footerLinks.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="mb-3 text-sm font-semibold">{group.title}</p>
            <ul className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        </div>

        {/* Oversized wordmark, cropped by the page's bottom edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none overflow-hidden select-none"
        >
          <p className="translate-y-[11%] text-center text-[clamp(4rem,17vw,15rem)] leading-none font-bold tracking-tighter text-foreground">
            Compodex
          </p>
        </div>
      </div>
    </footer>
  )
}
