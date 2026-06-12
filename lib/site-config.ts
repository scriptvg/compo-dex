import { ArrowUpRight } from "lucide-react";

export const siteConfig = {
  title: "Compodex UI",
  description: "The best way to build your own Pokedex App",
  public: {
    hero: {
      badge: {
        label: "Just released v1.0.0",
        link: "#",
      },
      title: "A production-ready UI kit for serious Pokédex apps",
      description: "A domain-driven component library built on top of shadcn/ui, designed to handle complex Pokémon data with speed, consistency, and full customization.",
      commands: ["pnpm dlx shadcn@latest add @compodex/ui/pokemon-badge", "pnpm dlx shadcn@latest add @compodex/ui/pokemon-sprite"],
      cta: {
        getStarted: {
          label: "Get Started",
          link: "/docs/getting-started",
        },
        viewDemo: {
          label: "View Pokedex Demo",
          link: "/pokedex",
        },
      }
    }
  }
  }