"use client"

import { useState, type ReactNode } from "react"
import { ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"
import { CopyButton } from "@/components/ui/copy-button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ComponentPreviewTabs({
    code,
    children,
    className,
}: {
    code: string | null
    fileName?: string
    children: ReactNode
    className?: string
}) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={cn(
                "mt-4 overflow-hidden border bg-card not-prose",
                className,
            )}
        >
            {/* Preview */}
            <div className="flex min-h-72 w-full items-center justify-center p-6 sm:p-10">
                {children}
            </div>

            {code ? (
                <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="relative border-t">
                        {/* Acciones (copiar + colapsar): solo al abrir */}
                        {open ? (
                            <div className="absolute right-2 top-2 z-20 flex items-center gap-1">
                                <CollapsibleTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 gap-1.5 px-2.5 text-muted-foreground"
                                    >
                                        <ChevronUp className="size-3.5" />
                                        Collapse
                                    </Button>
                                </CollapsibleTrigger>
                                <CopyButton value={code} />
                            </div>
                        ) : null}

                        <CollapsibleContent
                            forceMount
                            className={cn(
                                "relative overflow-hidden",
                                !open &&
                                    "max-h-44 [&_*]:pointer-events-none",
                            )}
                        >
                            <ScrollArea
                                className={cn(
                                    "w-full",
                                    open &&
                                        "[&>[data-slot=scroll-area-viewport]]:max-h-[40rem]",
                                )}
                            >
                                {/* w-max para que Radix detecte el overflow horizontal. */}
                                <CodeBlock className="w-max border-0 overflow-visible">
                                    <CodeBlockCode
                                        language="tsx"
                                        code={code}
                                        showLineNumbers
                                        className="w-max overflow-visible"
                                    />
                                </CodeBlock>
                            </ScrollArea>
                        </CollapsibleContent>

                        {/* Degradado + botón Expand cuando está cerrado */}
                        {!open ? (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-gradient-to-t from-card via-card/90 to-transparent pb-3">
                                <CollapsibleTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="pointer-events-auto h-8 gap-1.5 px-3"
                                    >
                                        
                                        View Code
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        ) : null}
                    </div>
                </Collapsible>
            ) : null}
        </div>
    )
}
