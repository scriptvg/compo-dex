"use client"

import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { pageTree } from "@/lib/page-tree"

const TOP_LEVEL_SECTIONS = [
    { name: "Docs", href: "/docs" },
    { name: "Pokedex", href: "/pokedex" },
]

function MobileMenu() {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none  bg-background/90 p-0 shadow-none ring-0 backdrop-blur duration-100 data-open:animate-none!"
                align="start"
                side="bottom"
                alignOffset={-16}
                sideOffset={10}
            >
                <div className="flex flex-col gap-10 px-6 py-6">
                    <div className="flex flex-col gap-4">
                        <div className="text-sm font-medium text-muted-foreground">
                            Menu
                        </div>
                        <div className="flex flex-col gap-3">
                            {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                                <MobileLink
                                    key={href}
                                    href={href}
                                    onOpenChange={setOpen}
                                    active={
                                        href === "/docs"
                                            ? pathname.startsWith("/docs")
                                            : pathname === href
                                    }
                                >
                                    {name}
                                </MobileLink>
                            ))}
                        </div>
                    </div>

                    {(pageTree.children ?? []).map((group) =>
                        group.type === "folder" && group.children ? (
                            <div key={group.name} className="flex flex-col gap-4">
                                <div className="text-sm font-medium text-muted-foreground">
                                    {group.name}
                                </div>
                                <div className="flex flex-col gap-3">
                                    {group.children.map((page) =>
                                        page.href ? (
                                            page.disabled ? (
                                                <span
                                                    key={page.href}
                                                    aria-disabled="true"
                                                    className="flex items-center gap-2 text-lg text-muted-foreground/50"
                                                >
                                                    {page.name}
                                                    <span className="text-[10px] font-medium tracking-wide uppercase">
                                                        Soon
                                                    </span>
                                                </span>
                                            ) : (
                                                <MobileLink
                                                    key={page.href}
                                                    href={page.href}
                                                    onOpenChange={setOpen}
                                                    active={pathname === page.href}
                                                >
                                                    {page.name}
                                                    {page.isNew && (
                                                        <span
                                                            className="flex size-2 rounded-full bg-blue-500"
                                                            title="New"
                                                        />
                                                    )}
                                                </MobileLink>
                                            )
                                        ) : null,
                                    )}
                                </div>
                            </div>
                        ) : null,
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

function MobileLink({
    href,
    onOpenChange,
    className,
    active,
    children,
    ...props
}: LinkProps & {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
    active?: boolean
}) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={cn(
                "flex items-center gap-2 text-2xl font-medium text-muted-foreground transition-colors hover:text-foreground",
                active && "text-foreground",
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    )
}

export { MobileMenu }
