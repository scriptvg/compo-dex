import {
  DocsBadge,
  DocsSidebar,
  DocsSidebarHeader,
  DocsSidebarLink,
  DocsSidebarNav,
  DocsSidebarProvider,
  DocsSidebarTitle,
} from "@/components/docs/docs-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const navLinks = [
  {
    title: "Introduction",
    href: "/docs/introduction",
  },
  {
    title: "Installation",
    href: "/docs/installation",
  },
  {
    title: "Components",
    href: "/docs/components",
  },
];

const components = [
  {
    title: "Pokemon Image",
    href: "/docs/components/pokemon-image",
    badge: "new" as const,
  },
  {
    title: "Pokemon Badge",
    href: "/docs/components/pokemon-badge",
    badge: "coming-soon" as const,
    disabled: true,
  },
  {
    title: "Pokemon Card",
    href: "/docs/components/pokemon-card",
    badge: "coming-soon" as const,
    disabled: true,
  },
  {
    title: "Pokemon Stats",
    href: "/docs/components/pokemon-stats",
    badge: "coming-soon" as const,
    disabled: true,
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsSidebarProvider>
      <SiteHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <DocsSidebar side="left">
          <DocsSidebarHeader>
            <DocsSidebarTitle>Sections</DocsSidebarTitle>
          </DocsSidebarHeader>

          <DocsSidebarNav>
            {navLinks.map((link) => (
              <DocsSidebarLink key={link.href} asChild>
                <Link href={link.href}>
                  <span>{link.title}</span>
                </Link>
              </DocsSidebarLink>
            ))}
          </DocsSidebarNav>

          <DocsSidebarHeader>
            <DocsSidebarTitle>Components</DocsSidebarTitle>
          </DocsSidebarHeader>

          <DocsSidebarNav>
            {components.map((component) => (
              <DocsSidebarLink
                key={component.href}
                disabled={component.disabled}
                asChild
              >
                <Link href={component.href}>
                  <span>{component.title}</span>
                  {component.badge && (
                    <DocsBadge variant={component.badge}>
                      {component.badge}
                    </DocsBadge>
                  )}
                </Link>
              </DocsSidebarLink>
            ))}
          </DocsSidebarNav>
        </DocsSidebar>

        {/* Content */}
        <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">{children}</main>

        {/* TOC */}
        <DocsSidebar side="right" variant="mobile">
          TOC
        </DocsSidebar>
      </div>
    </DocsSidebarProvider>
  );
}
