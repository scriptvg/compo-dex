import { notFound } from "next/navigation"

import { docPages, getDocPage } from "@/lib/docs-registry"
import { docLoaders } from "@/lib/docs-content"
import { getFileContent } from "@/lib/get-file"
import { extractToc } from "@/lib/toc"
import { DocsTableOfContents } from "@/components/docs/table-of-contents"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsHeaderNav } from "@/components/docs/docs-header-nav"

// Solo los slugs del registro son válidos; cualquier otro 404.
export const dynamicParams = false

export function generateStaticParams() {
    return docPages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const page = getDocPage(slug)
    if (!page) return {}
    return {
        title: page.title,
        description: page.description,
    }
}

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

    const { default: Content } = await load()
    const { content } = await getFileContent(
        `content/docs/${slug}.mdx`,
        `${slug}.mdx`,
    )
    const toc = content ? extractToc(content) : []
    const href = `/docs/${slug}`

    return (
        <div className="w-full min-w-0 xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-8">
            <article className="relative mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 pb-4">
                {toc.length > 0 ? (
                    <DocsTableOfContents
                        toc={toc}
                        variant="floating"
                        className="xl:hidden border-dashed"
                    />
                ) : null}
                <header className="flex flex-col gap-3 py-6 px-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 flex-col gap-3">
                            <h1 className="text-3xl font-bold">{page.title}</h1>
                            {page.description ? (
                                <p className="text-base text-muted-foreground">
                                    {page.description}
                                </p>
                            ) : null}
                        </div>
                        <DocsHeaderNav href={href} className="shrink-0" />
                    </div>
                </header>

                <div className="min-w-0 px-4">
                    <Content />
                </div>
                <DocsPager href={href} className="px-4" />
            </article>

            {toc.length > 0 ? (
                <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-56 shrink-0 overflow-y-auto py-6 xl:block">
                    <DocsTableOfContents toc={toc} />
                </aside>
            ) : null}
        </div>
    )
}
