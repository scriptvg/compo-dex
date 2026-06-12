import { notFound } from "next/navigation"

import { docPages, getDocPage } from "@/lib/docs-registry"
import { docLoaders } from "@/lib/docs-content"
import { createDocRoute } from "@/lib/doc-route"
import { getFileContent } from "@/lib/get-file"
import { extractToc } from "@/lib/toc"

import { DocShell } from "@/components/docs/doc-shell"

export const dynamicParams = false

export const { generateStaticParams, generateMetadata } = createDocRoute({
    entries: docPages,
    getEntry: getDocPage,
    loaders: docLoaders,
    getFallback: (page) => ({
        title: page.title,
        description: page.description,
    }),
})

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const page = getDocPage(slug)
    const load = docLoaders[slug]

    if (!page || !load) {
        notFound()
    }

    const { default: Content, frontmatter } = await load()

    const { content } = await getFileContent(
        `content/docs/${slug}.mdx`,
        `${slug}.mdx`,
    )

    const toc = content ? extractToc(content) : []

    // El frontmatter del MDX es la fuente de la cabecera; el registry queda como
    // fallback (y como manifiesto de navegación/rutas).
    const title = frontmatter?.title ?? page.title
    const description = frontmatter?.description ?? page.description

    return (
        <DocShell
            title={title}
            description={description}
            href={`/docs/${slug}`}
            toc={toc}
        >
            <Content />
        </DocShell>
    )
}
