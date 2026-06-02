import { demoComponents } from "@/components/demo"
import { getFileContent } from "@/lib/get-file"
import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs"
import { cn } from "@/lib/utils"

export type ComponentPreviewProps = {
    /** Slug del demo en `components/demo/<name>.tsx` (igual al de components-registry). */
    name: string
    className?: string
}

/** Renderiza el demo en vivo en tabs Preview/Code. El código se lee desde
 * `components/demo/<name>.tsx`. Server Component (lee el archivo en disco). */
export async function ComponentPreview({ name, className }: ComponentPreviewProps) {
    const Demo = demoComponents[name]
    const fileName = `${name}.tsx`
    const { content } = await getFileContent(
        `components/demo/${fileName}`,
        fileName,
    )

    if (!Demo) {
        return (
            <div
                className={cn(
                    "flex min-h-72 w-full items-center justify-center border border-dashed p-10",
                    className,
                )}
            >
                <p className="text-sm text-muted-foreground">
                    Demo no disponible todavía.
                </p>
            </div>
        )
    }

    return (
        <ComponentPreviewTabs code={content} fileName={fileName} className={className}>
            <Demo />
        </ComponentPreviewTabs>
    )
}
