import * as React from "react"

import type { TocEntry } from "@/lib/toc"
import { Page } from "@/components/layout/page"
import { DocsHeaderNav } from "@/components/docs/docs-header-nav"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsTableOfContents } from "@/components/docs/table-of-contents"
import { LibraryCard } from "@/components/docs/library-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import PokemonCardDemo from "../demo/pokemon-card"

export type DocShellProps = {
  /** Page title (frontmatter wins, registry is the fallback). */
  title: string
  description?: string
  /** Base path of the page, e.g. `/docs/components/pokemon-stat`. */
  href: string
  /** Headings extracted from the MDX; drives both ToCs. */
  toc: TocEntry[]
  children: React.ReactNode
}

/**
 * Shared chrome for every docs page (`/docs/[slug]` and
 * `/docs/components/[slug]`): floating + sticky ToC, header with title /
 * description / nav, the centered content column, and the prev/next pager.
 *
 * The two routes used to hand-roll this layout each, which let them drift
 * (spacing, aside borders, empty-content handling). Centralizing it keeps them
 * identical by construction — only the `children` differ.
 */
export function DocShell({
  title,
  description,
  href,
  toc,
  children,
}: DocShellProps) {
  const hasToc = toc.length > 0

  return (
    <Page variant="sidebar" className="max-w-none">
      <Page.Main>
        {hasToc ? (
          <DocsTableOfContents
            toc={toc}
            variant="floating"
            className="xl:hidden"
          />
        ) : null}

        <Page.Header className="mx-auto w-full max-w-160 py-10">
          <Page.Heading>
            <Page.Title>{title}</Page.Title>
            {description ? (
              <Page.Description>{description}</Page.Description>
            ) : null}
          </Page.Heading>
          <Page.Actions>
            <DocsHeaderNav href={href} />
          </Page.Actions>
        </Page.Header>

        <Page.Content className="mx-auto w-full max-w-160">
          {children}
        </Page.Content>

        <DocsPager href={href} className="mx-auto w-full max-w-160 px-4" />
      </Page.Main>

      {hasToc ? (
        <Page.Aside className="flex flex-col border-l border-dashed border-border">
          <p className="shrink-0 px-4 pt-4 pb-2 text-xs font-medium text-muted-foreground">
            On This Page
          </p>
          <ScrollArea className="min-h-0 flex-1">
            <div className="px-4 pb-4">
              <DocsTableOfContents toc={toc} variant="list" />
            </div>
          </ScrollArea>
          <LibraryCard
            title="Compodex."
            description="Despliega más rápido con bloques y plantillas listos para usar"
            linkText="Ver más"
            linkHref="/docs/components"
            preview={<PokemonCardDemo />}
          />
        </Page.Aside>
      ) : null}
    </Page>
  )
}

/*

Deploy your shadcn/ui app on Vercel
Trusted by OpenAI, Sonos, Adobe, and more.
Vercel provides tools and infrastructure to deploy apps and features at scale.


*/
