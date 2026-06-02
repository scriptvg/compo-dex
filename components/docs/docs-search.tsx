"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { flatDocs } from "@/lib/docs-nav"

/** Agrupa las páginas planas por su grupo, preservando el orden. */
const GROUPED = flatDocs.reduce<Record<string, typeof flatDocs>>((acc, doc) => {
    ;(acc[doc.group] ??= []).push(doc)
    return acc
}, {})

export function DocsSearch({ className }: { className?: string }) {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [])

    const go = (href: string) => {
        setOpen(false)
        router.push(href)
    }

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className={cn(
                    "text-muted-foreground relative w-full justify-start gap-2 sm:w-56",
                    className,
                )}
            >
                <Search className="size-4" />
                <span className="hidden sm:inline-flex">Search docs...</span>
                <span className="inline-flex sm:hidden">Search...</span>
                <kbd className="pointer-events-none absolute top-1/2 right-1.5 hidden h-5 -translate-y-1/2 items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium select-none sm:inline-flex">
                    ⌘K
                </kbd>
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Buscar en la documentación..." />
                <CommandList>
                    <CommandEmpty>Sin resultados.</CommandEmpty>
                    {Object.entries(GROUPED).map(([group, docs]) => (
                        <CommandGroup key={group} heading={group}>
                            {docs.map((doc) => (
                                <CommandItem
                                    key={doc.href}
                                    value={`${doc.group} ${doc.name}`}
                                    onSelect={() => go(doc.href)}
                                >
                                    {doc.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    )
}
