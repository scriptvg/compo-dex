"use client"

import type { BundledLanguage } from "shiki"

import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"
import { CopyButton } from "@/components/ui/copy-button"
import { ScrollArea } from "../ui/scroll-area"

/** Bloque de código para MDX: sin header, con botón copiar flotante. */
export function MdxCodeBlock({
    code,
    lang,
}: {
    code: string
    lang: string
}) {
    return (
        <CodeBlock className="group/code relative my-4">
            <CopyButton
                value={code}
                className="absolute top-1.5 right-1.5 z-10 opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
            />
            <ScrollArea className="w-full [&>[data-slot=scroll-area-viewport]]:max-h-64">
                <CodeBlockCode
                    code={code}
                    language={lang as BundledLanguage}
                    className="overflow-x-visible"
                />
            </ScrollArea>
        </CodeBlock>
    )
}
