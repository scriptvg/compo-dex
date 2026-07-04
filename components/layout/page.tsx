import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Page — presentational compound layout for a centered content column
 * with an optional sticky sidebar.
 *
 * It owns structure and spacing only; it is intentionally "dumb": callers
 * decide *what* goes in each slot (table of contents, pager, actions...),
 * the component only decides *where* and *how* it sits.
 *
 * The root is a neutral centered container. The two-column "main + sticky
 * aside" grid is NOT the default — it is a docs-layout concern callers opt
 * into with `variant="sidebar"` (so generic pages like the landing or the
 * Pokédex are not forced into the sidebar grid).
 *
 * Usage (docs layout with sidebar):
 *   <Page variant="sidebar">
 *     <Page.Main>
 *       <Page.Toc>{mobileToc}</Page.Toc>
 *       <Page.Header>
 *         <Page.Heading>
 *           <Page.Title>{title}</Page.Title>
 *           <Page.Description>{description}</Page.Description>
 *         </Page.Heading>
 *         <Page.Actions>{actions}</Page.Actions>
 *       </Page.Header>
 *       <Page.Content>{children}</Page.Content>
 *     </Page.Main>
 *     <Page.Aside>{desktopToc}</Page.Aside>
 *   </Page>
 *
 * Usage (generic page, no sidebar):
 *   <Page>
 *     <Page.Header>…</Page.Header>
 *     <Page.Content>{children}</Page.Content>
 *   </Page>
 */
const pageVariants = cva("mx-auto w-full max-w-[1400px]", {
    variants: {
        variant: {
            default: "",
            sidebar: "xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-8",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

function Page({
    className,
    variant,
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageVariants>) {
    return (
        <div
            data-slot="page"
            {...props}
            className={cn(pageVariants({ variant }), className)}
        />
    )
}

/** The primary reading column. */
function PageMain({ className, ...props }: React.ComponentProps<"article">) {
    return (
        <article
            data-slot="page-main"
            {...props}
            className={cn(
                "relative mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-4 pb-4",
                className,
            )}
        />
    )
}

/** In-flow slot for a mobile/floating table of contents; hidden on desktop. */
function PageToc({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="page-toc"
            {...props}
            className={cn("xl:hidden ", className)}
        />
    )
}

/** Header row: heading block on the left, actions on the right. */
function PageHeader({ className, ...props }: React.ComponentProps<"header">) {
    return (
        <header
            data-slot="page-header"
            {...props}
            className={cn(
                "flex items-start justify-between gap-4 px-4 py-4",
                className,
            )}
        />
    )
}

/** Stacked title + description, truncates gracefully when space is tight. */
function PageHeading({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="page-heading"
            {...props}
            className={cn("flex min-w-0 flex-col gap-2", className)}
        />
    )
}

function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
    return (
        <h1
            data-slot="page-title"
            {...props}
            className={cn("text-3xl font-bold", className)}
        />
    )
}

function PageDescription({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="page-description"
            {...props}
            className={cn("text-base text-muted-foreground", className)}
        />
    )
}

/** Right-aligned action slot in the header; never shrinks. */
function PageActions({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="page-actions"
            {...props}
            className={cn("shrink-0", className)}
        />
    )
}

function PageContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="page-content"
            {...props}
            className={cn("flex min-w-0 flex-col px-4", className)}
        />
    )
}

/** Sticky sidebar, only visible from xl up. */
function PageAside({ className, ...props }: React.ComponentProps<"aside">) {
    return (
        <aside
            data-slot="page-aside"
            {...props}
            className={cn(
                // Fixed height + overflow-hidden so an inner ScrollArea owns the
                // scrolling (auto-hiding scrollbar) instead of the native one.
                "sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-72 shrink-0 flex-col self-start overflow-hidden xl:flex",
                className,
            )}
        />
    )
}

function PageSection({ className, ...props }: React.ComponentProps<"section">) {
    return (
        <section
            data-slot="page-section"
            {...props}
            className={cn("flex flex-col gap-6 py-4", className)}
        />
    )
}

const PageRoot = Object.assign(Page, {
    Main: PageMain,
    Toc: PageToc,
    Header: PageHeader,
    Heading: PageHeading,
    Title: PageTitle,
    Description: PageDescription,
    Actions: PageActions,
    Content: PageContent,
    Aside: PageAside,
    Section: PageSection,
})

export {
    PageRoot as Page,
    PageMain,
    PageToc,
    PageHeader,
    PageHeading,
    PageTitle,
    PageDescription,
    PageActions,
    PageContent,
    PageAside,
    PageSection,
}
