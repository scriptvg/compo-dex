import { notFound } from "next/navigation"

import { componentDocs, getComponentDoc } from "@/lib/components-registry"
import { componentLoaders } from "@/lib/components-content"
import { getFileContent } from "@/lib/get-file"
import { extractToc } from "@/lib/toc"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsHeaderNav } from "@/components/docs/docs-header-nav"
import { DocsTableOfContents } from "@/components/docs/table-of-contents"

// Only pre-rendered slugs from the registry are valid; anything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
    return componentDocs.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doc = getComponentDoc(slug)
    if (!doc) return {}
    return {
        title: doc.name,
        description: doc.description,
    }
}

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

    
    const Content = load ? (await load()).default : null
    const { content } = Content
        ? await getFileContent(
              `content/docs/components/${slug}.mdx`,
              `${slug}.mdx`,
          )
        : { content: null }
    const toc = content ? extractToc(content) : []

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
                <header className="flex flex-col gap-3 pt-6 px-4 mx-auto flex w-full max-w-160 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 flex-col gap-3">
                            <h1 className="text-3xl font-bold">{doc.name}</h1>
                            {doc.description ? (
                                <p className="text-base text-muted-foreground">
                                    {doc.description}
                                </p>
                            ) : null}
                        </div>
                        <DocsHeaderNav href={href} className="shrink-0" />
                    </div>
                </header>

                <div className="min-w-0 px-4  mx-auto w-full max-w-160">
                    {Content ? <Content /> : <p className="text-sm text-muted-foreground flex-1 h-[500px] flex items-center justify-center">No content found</p>}
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
