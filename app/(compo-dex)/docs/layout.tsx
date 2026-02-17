import {
  DocsBadge,
  DocsSidebar,
  DocsSidebarHeader,
  DocsSidebarLink,
  DocsSidebarNav,
  DocsSidebarProvider,
  DocsSidebarTitle,
} from "@/components/docs/docs-sidebar";
import { DocsTOC } from "@/components/docs/docs-toc";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { components } from "@/content/docs/components/components";

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

const sidebarComponents: {
  title: string;
  href: string;
  badge: "new" | "coming-soon";
  disabled?: boolean;
}[] = components.map((component) => ({
  title: component.title,
  href: component.url,
  badge: "new" as const,
}));

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
            {sidebarComponents.map((component) => (
              <DocsSidebarLink
                key={component.href}
                disabled={component.disabled}
                asChild
              >
                <Link href={component.href}>
                  <span>{component.title}</span>
                  {component.badge && (
                    <DocsBadge variant={component.badge}>
                      {component.badge.includes("new") ? "New" : "Coming Soon"}
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
          <DocsSidebarHeader>
            <DocsSidebarTitle>On this page</DocsSidebarTitle>
          </DocsSidebarHeader>

          <DocsSidebarNav>
            <DocsTOC />
          </DocsSidebarNav>
        </DocsSidebar>
      </div>
    </DocsSidebarProvider>
  );
}
