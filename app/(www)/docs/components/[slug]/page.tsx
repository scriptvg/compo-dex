import { notFound } from "next/navigation"

import { componentDocs, getComponentDoc } from "@/lib/components-registry"
import { componentLoaders } from "@/lib/components-content"
import { createDocRoute } from "@/lib/doc-route"
import { getFileContent } from "@/lib/get-file"
import { extractToc } from "@/lib/toc"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsHeaderNav } from "@/components/docs/docs-header-nav"
import { DocsTableOfContents } from "@/components/docs/table-of-contents"
import { FrameworkTabs } from "@/components/docs/framework-tabs"
import { Page } from "@/components/layout/page"
import { Badge } from "@/components/ui/badge"
import { de } from "date-fns/locale"

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


    const href = `/docs/components/${slug}`
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
    const dependencies = mod?.frontmatter?.dependencies ?? doc.dependencies

    return (
        <Page variant="sidebar" className="max-w-none">
            <Page.Main>
                {toc.length > 0 ? (
                    <Page.Toc >
                        <DocsTableOfContents
                            toc={toc}
                            variant="floating"
                            className="border-dashed"
                        />
                    </Page.Toc>
                ) : null}

                <Page.Header className="mx-auto w-full max-w-160 py-10">
                    <Page.Heading>
                        <Page.Title>{title}</Page.Title>
                        {description ? (
                            <Page.Description>
                                {description}
                            </Page.Description>
                        ) : null}
                    </Page.Heading>
                    <Page.Actions>
                        <DocsHeaderNav href={href} />
                    </Page.Actions>
                </Page.Header>

                <Page.Content className="mx-auto w-full max-w-160 ">
                    {/* Selector de implementación a nivel de página (Radix UI / Base UI) */}
                    <FrameworkTabs className="mb-4" />
                    {Content ? (
                        <Content />
                    ) : (
                        <p className="flex h-[500px] flex-1 items-center justify-center text-sm text-muted-foreground">
                            No content found
                        </p>
                    )}
                </Page.Content>
                <DocsPager href={href} className="mx-auto w-full max-w-160 px-4" />
            </Page.Main>

            {toc.length > 0 ? (
                <Page.Aside className="border-l border-dashed h-full p-4">
                    <DocsTableOfContents toc={toc} />
                </Page.Aside>
            ) : null}
        </Page>
    )
}
