import * as React from "react"

import type { TocEntry } from "@/lib/toc"
import { Page } from "@/components/layout/page"
import { DocsHeaderNav } from "@/components/docs/docs-header-nav"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsTableOfContents } from "@/components/docs/table-of-contents"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "../ui/button"

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
        {/* Floating ToC must be a direct child of the tall Page.Main:
                    `sticky` is confined to its parent's box, so wrapping it in a
                    bar-height slot (Page.Toc) left it nothing to stick over. */}
        {hasToc ? (
          <DocsTableOfContents
            toc={toc}
            variant="floating"
            className="border-dashed xl:hidden"
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
        <Page.Aside>
          {/* Fixed header outside the scroll: `position: sticky` misbehaves
              inside Radix ScrollArea's table-display viewport. */}
          <p className="shrink-0 px-4 pt-4 pb-2 text-xs font-medium text-muted-foreground">
            On This Page
          </p>
          <ScrollArea className="min-h-0 flex-1">
            <div className="px-4 pb-4">
              <DocsTableOfContents toc={toc} />
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Deploy your compodex app on Vercel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Trusted by OpenAI, Sonos, Adobe, and more.</p>
                  <p>
                    Vercel provides tools and infrastructure to deploy apps and
                    features at scale.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Deploy Now</Button>
                </CardFooter>
              </Card>
            </div>
          </ScrollArea>
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
