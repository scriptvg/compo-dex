import { notFound } from "next/navigation"

import { docPages, getDocPage } from "@/lib/docs-registry"
import { docLoaders } from "@/lib/docs-content"
import { createDocRoute } from "@/lib/doc-route"
import { getFileContent } from "@/lib/get-file"
import { extractToc } from "@/lib/toc"

import { DocsHeaderNav } from "@/components/docs/docs-header-nav"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsTableOfContents } from "@/components/docs/table-of-contents"

import { Page } from "@/components/layout/page"

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
    const href = `/docs/${slug}`

    // El frontmatter del MDX es la fuente de la cabecera; el registry queda como
    // fallback (y como manifiesto de navegación/rutas).
    const title = frontmatter?.title ?? page.title
    const description = frontmatter?.description ?? page.description

    return (
        <Page variant="sidebar" className="max-w-none ">
            <Page.Main className="py-6">
                {toc.length > 0 && (
                    <Page.Toc>
                        <DocsTableOfContents
                            toc={toc}
                            variant="floating"
                            className="border-dashed"
                        />
                    </Page.Toc>
                )}

                <Page.Header className="mx-auto w-full max-w-160">
                    <Page.Heading>
                        <Page.Title>{title}</Page.Title>
                        {description && (
                            <Page.Description>
                                {description}
                            </Page.Description>
                        )}
                    </Page.Heading>

                    <Page.Actions>
                        <DocsHeaderNav href={href} />
                    </Page.Actions>
                </Page.Header>

                <Page.Content className="mx-auto w-full max-w-160">
                    <Content />
                </Page.Content>
                <DocsPager href={href} className="mx-auto w-full max-w-160 px-4" />
            </Page.Main>

            {toc.length > 0 && (
                <Page.Aside className="">
                    <DocsTableOfContents toc={toc} />
                </Page.Aside>
            )}
        </Page>
    )
}
