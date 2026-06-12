import { notFound } from "next/navigation"

import { componentDocs, getComponentDoc } from "@/lib/components-registry"
import { componentLoaders } from "@/lib/components-content"
import { createDocRoute } from "@/lib/doc-route"
import { getFileContent } from "@/lib/get-file"
import { extractToc } from "@/lib/toc"
import { DocShell } from "@/components/docs/doc-shell"
import { FrameworkTabs } from "@/components/docs/framework-tabs"

// Only pre-rendered slugs from the registry are valid; anything else 404s.
export const dynamicParams = false

export const { generateStaticParams, generateMetadata } = createDocRoute({
    entries: componentDocs,
    getEntry: getComponentDoc,
    loaders: componentLoaders,
    getFallback: (doc) => ({
        title: doc.name,
        description: doc.description,
    }),
})

export default async function ComponentDocPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doc = getComponentDoc(slug)

    if (!doc) {
        notFound()
    }

    const load = componentLoaders[slug]
    const mod = load ? await load() : null
    const Content = mod?.default ?? null

    const { content } = Content
        ? await getFileContent(
              `content/docs/components/${slug}.mdx`,
              `${slug}.mdx`,
          )
        : { content: null }
    const toc = content ? extractToc(content) : []

    // El frontmatter del MDX manda; el registry queda como fallback/manifiesto.
    const title = mod?.frontmatter?.title ?? doc.name
    const description = mod?.frontmatter?.description ?? doc.description

    return (
        <DocShell
            title={title}
            description={description}
            href={`/docs/components/${slug}`}
            toc={toc}
        >
            {Content ? (
                <>
                    {/* Selector de implementación a nivel de página (Radix UI / Base UI) */}
                    <FrameworkTabs className="mb-4" />
                    <Content />
                </>
            ) : (
                <p className="flex h-[500px] flex-1 items-center justify-center text-sm text-muted-foreground">
                    Documentación en camino.
                </p>
            )}
        </DocShell>
    )
}
