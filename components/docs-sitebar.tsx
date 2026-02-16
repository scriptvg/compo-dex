"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const TOP_LEVEL_SECTIONS = [
  { name: "Introduction", href: "/docs" },
  {
    name: "Components",
    href: "/docs/components",
  },
  {
    name: "Installation",
    href: "/docs/installation",
  },
  {
    name: "Directory",
    href: "/docs/directory",
  },
  {
    name: "RTL",
    href: "/docs/rtl",
  },
  {
    name: "MCP Server",
    href: "/docs/mcp",
  },
  {
    name: "Registry",
    href: "/docs/registry",
  },
  {
    name: "Forms",
    href: "/docs/forms",
  },
  {
    name: "Changelog",
    href: "/docs/changelog",
  },
];

const EXCLUDED_SECTIONS = ["installation", "dark-mode", "changelog", "rtl"];
const EXCLUDED_PAGES = ["/docs", "/docs/changelog", "/docs/rtl"];
const PAGES_NEW: string[] = [];
const showMcpDocs = true;

function getCurrentBase(pathname: string) {
  return pathname.split("/")[2] || "";
}

function getPagesFromFolder(item: any, currentBase: string) {
  if (item.type === "folder") {
    return item.children.filter((child: any) => child.type === "page");
  }
  return [];
}

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: any }) {
  const pathname = usePathname();
  const currentBase = getCurrentBase(pathname);

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-3.10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex border-r border-dashed"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />


      <SidebarContent className="no-scrollbar mx-auto w-(--sidebar-menu-width) overflow-x-hidden px-2">
        <SidebarGroup className="pt-6">
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => {
                if (!showMcpDocs && href.includes("/mcp")) {
                  return null;
                }
                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        href === "/docs"
                          ? pathname === href
                          : pathname.startsWith(href)
                      }
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                    >
                      <Link href={href}>
                        <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                        {name}
                        {PAGES_NEW.includes(href) && (
                          <span
                            className="flex size-2 rounded-full bg-blue-500"
                            title="New"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {tree.children.map((item: any) => {
          if (EXCLUDED_SECTIONS.includes(item.$id ?? "")) {
            return null;
          }

          if (item.type === "page") {
            return (
              <SidebarGroup key={item.url}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={item.url === pathname}
                        className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                      >
                        <Link href={item.url}>
                          <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }

          return (
            <SidebarGroup key={item.$id}>
              <SidebarGroupLabel className="text-muted-foreground font-medium">
                {item.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {item.type === "folder" && (
                  <SidebarMenu className="gap-0.5">
                    {getPagesFromFolder(item, currentBase).map((page: any) => {
                      if (!showMcpDocs && page.url.includes("/mcp")) {
                        return null;
                      }

                      if (EXCLUDED_PAGES.includes(page.url)) {
                        return null;
                      }

                      return (
                        <SidebarMenuItem key={page.url}>
                          <SidebarMenuButton
                            asChild
                            isActive={page.url === pathname}
                            className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                          >
                            <Link href={page.url}>
                              <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                              {page.name}
                              {PAGES_NEW.includes(page.url) && (
                                <span
                                  className="flex size-2 rounded-full bg-blue-500"
                                  title="New"
                                />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
