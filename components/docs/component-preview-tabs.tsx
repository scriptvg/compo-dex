"use client"

import { useState, type ReactNode } from "react"

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
    fileName,
    children,
    className,
}: {
    code: string | null
    fileName: string
    children: ReactNode
    className?: string
}) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={cn(
                "overflow-hidden border bg-card",
                className,
            )}
        >
            {/* Preview */}
            <div className="flex min-h-72 w-full items-center justify-center p-10">
                {children}
            </div>

            {code ? (
                <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="relative border-t">
                        {/* Copy button (visible cuando está abierto) */}
                        {open ? (
                            <div className="absolute right-2 top-2 z-20">
                                <CopyButton value={code} />
                            </div>
                        ) : null}

                        <CollapsibleContent
                            forceMount
                            className={cn(
                                "relative overflow-hidden",
                                !open &&
                                    "max-h-32 [&_*]:pointer-events-none",
                            )}
                        >
                            <ScrollArea
                                className={cn(
                                    open &&
                                        "[&>[data-slot=scroll-area-viewport]]:max-h-[40rem]",
                                )}
                            >
                                <CodeBlock className="w-fit rounded-none border-0 overflow-visible">
                                    <CodeBlockCode
                                        language="tsx"
                                        code={code}
                                        showLineNumbers
                                        className="overflow-x-visible"
                                    />
                                </CodeBlock>
                            </ScrollArea>
                        </CollapsibleContent>

                        {/* Degradado + botón cuando está cerrado */}
                        {!open ? (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-32 items-center justify-center bg-gradient-to-t from-card via-card/80 to-transparent pb-3">
                                <CollapsibleTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="pointer-events-auto h-8 px-3 shadow"
                                    >
                                        View Code
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        ) : (
                            
                            <></>
                        )}
                    </div>
                </Collapsible>
            ) : null}
        </div>
    )
}
