"use client";

import { Logo } from "./logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: LucideIcon;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border border-dashed flex-col items-start",
            className,
          )}
          ref={ref}
          {...props}
        >
          <div className="font-medium flex items-center gap-2 text-sm leading-none">
            {Icon && <Icon className="h-4 w-4" />}
            {title}
          </div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const components = [
  {
    title: "Pokemon Image",
    slug: "pokemon-image",
    description: "Re-usable component for displaying Pokemon Image",
    icon: ImageIcon,
  },
  {
    title: "Pokemon Badge",
    slug: "pokemon-badge",
    description: "Re-usable component for displaying Pokemon Badge",
    icon: BadgeIcon,
  },
  {
    title: "Pokemon Card",
    slug: "pokemon-card",
    description: "Re-usable component for displaying Pokemon Card",
    icon: CardSimIcon,
  },
  {
    title: "Pokemon Stats",
    slug: "pokemon-stats",
    description: "Re-usable component for displaying Pokemon Stats",
    icon: ChartArea,
  },
];

export function SiteHeader() {
  return (
    <header className="border-b border-dashed sticky top-0 z-50 bg-background">
      <div className="flex items-center py-2 px-4  border-x border-dashed justify-between">
        <div className="flex items-center gap-2">
          <MobileMenu sections={sections} />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden lg:block"
          >
            <Link href="/">
              <Logo alt="CompoDex" />
            </Link>
          </Button>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-8">
                  Docs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-1 md:w-[480px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full  select-none flex-col justify-end
                          items-start rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-hidden focus:shadow-md border border-dashed"
                          href="/docs"
                        >
                          <h2 className="mt-4 mb-2 font-medium text-lg">
                            Docs
                          </h2>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Collection of customized Shadcn UI blocks and
                            components
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs/introduction" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/components" title="Components">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-8">
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2">
                  <ul className="grid gap-3 py-1 md:w-[480px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        href={`/docs/components/${component.slug}`}
                        title={component.title}
                        icon={component.icon}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuLink asChild>
                <Link href="/blocks">Blocks</Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" className="hidden lg:flex">
            <Link href="/pokedex">Pokedex</Link>
          </Button>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

import {
  BadgeIcon,
  CardSimIcon,
  ChartArea,
  ImageIcon,
  LucideIcon,
  Menu,
  X,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import React, { useState } from "react";

interface Section {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    to: string;
  }[];
}

const sections: Section[] = [
  {
    id: "home",
    title: "Sections",
    items: [
      {
        id: "home",
        title: "Home",
        to: "/",
      },
      {
        id: "pokedex",
        title: "Pokedex",
        to: "/pokedex",
      },
      {
        id: "docs",
        title: "Docs",
        to: "/docs",
      },
      {
        id: "components",
        title: "Components",
        to: "/docs/components",
      },
      {
        id: "blocks",
        title: "Blocks",
        to: "/blocks",
      },
    ],
  },
  {
    id: "docs",
    title: "Docs",
    items: [
      {
        id: "docs",
        title: "Introduction",
        to: "/docs",
      },
      {
        id: "installation",
        title: "Installation",
        to: "/docs/installation",
      },
      {
        id: "components",
        title: "Components",
        to: "/docs/components",
      },
    ],
  },
  {
    id: "components",
    title: "Components",
    items: [
      {
        id: "components",
        title: "Pokemon Image",
        to: "/docs/components/pokemon-image",
      },
      {
        id: "components",
        title: "Pokemon Badge",
        to: "/docs/components/pokemon-badge",
      },
      {
        id: "components",
        title: "Pokemon Card",
        to: "/docs/components/pokemon-card",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
      {
        id: "components",
        title: "Pokemon Stats",
        to: "/docs/components/pokemon-stats",
      },
    ],
  },
];

export function MobileMenu({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          {open ? <X /> : <Menu />}
          Menu
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none! p-0 shadow-none backdrop-blur duration-100 data-open:animate-none! "
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={8}
      >
        <div className="flex flex-col gap-8 overflow-auto px-6 py-6">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col gap-2">
              <h2 className="text-muted-foreground text-sm font-medium">
                {section.title}
              </h2>
              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={item.to}
                      className="text-3xl font-medium"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
