import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import type { PageTreeNode } from "@/lib/page-tree"

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: PageTreeNode }) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] overscroll-none border-r bg-transparent [--sidebar-menu-width:--spacing(60)] lg:flex xl:border-0"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <div className="absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
      <SidebarContent className="no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2.5">
        {tree.children?.map((group) => {
          if (group.type !== "folder" || !group.children) {
            return null
          }
          return (
            <SidebarGroup key={group.name} className="pt-6">
              <SidebarGroupLabel className="font-medium text-muted-foreground">
                {group.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {group.children.map((page) => {
                    if (!page.href) return null
                    if (page.disabled) {
                      return (
                        <SidebarMenuItem key={page.href}>
                          <SidebarMenuButton
                            aria-disabled="true"
                            className="h-[30px] w-full cursor-not-allowed gap-1.5 text-[0.8rem] font-medium text-muted-foreground/50 hover:bg-transparent hover:text-muted-foreground/50 active:bg-transparent"
                          >
                            <span className="min-w-0 flex-1 truncate">
                              {page.name}
                            </span>
                            <span className="shrink-0 text-[9px] font-medium tracking-wide text-muted-foreground/50 uppercase">
                              Soon
                            </span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    }
                    return (
                      <SidebarMenuItem key={page.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={page.href === pathname}
                          className="3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent"
                        >
                          <Link href={page.href}>
                            <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                            {page.name}
                            {page.isNew && (
                              <span
                                className="flex size-2 rounded-full bg-blue-500"
                                title="New"
                              />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
        <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
      </SidebarContent>
    </Sidebar>
  )
}
