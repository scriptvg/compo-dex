"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { pageTree } from "@/lib/page-tree"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <SidebarProvider
        className="3xl:fixed:container 3xl:fixed:px-3 min-h-[calc(100svh-var(--header-height))] flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)]"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <DocsSidebar tree={pageTree} />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
