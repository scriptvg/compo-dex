"use client"

import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarMenuItem, SidebarMenuButton, SidebarMenu, SidebarGroupContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { pageTree, type PageTreeNode } from "@/lib/page-tree"

export function DocsSidebar({
    tree,
    ...props
}: React.ComponentProps<typeof Sidebar> & { tree: PageTreeNode }) {
    const pathname = usePathname()

    return (
        <Sidebar
            className="sticky top-0 z-30 hidden h-[calc(100svh-var(--header-height))] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
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
                                                        className="h-[30px] w-fit cursor-not-allowed text-[0.8rem] font-medium text-muted-foreground/50 hover:bg-transparent hover:text-muted-foreground/50 active:bg-transparent"
                                                    >
                                                        {page.name}
                                                        <span className="text-[9px] font-medium tracking-wide text-muted-foreground/50 uppercase">
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
                                                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
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



export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <SidebarProvider className="min-h-[calc(100svh-var(--header-height))] flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)] 3xl:fixed:container 3xl:fixed:px-3 "
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                    } as React.CSSProperties
                }>
                <DocsSidebar tree={pageTree} />
                <SidebarInset>
                    <main>
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
