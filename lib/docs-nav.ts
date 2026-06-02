import { pageTree } from "@/lib/page-tree"

export type FlatDoc = {
    href: string
    name: string
    /** Nombre del grupo al que pertenece (Getting Started, Components, Blocks). */
    group: string
}

/** Lista plana y ordenada de todas las páginas de docs (según el orden del
 * `pageTree`). Base para breadcrumb y pager prev/next. */
export const flatDocs: FlatDoc[] = (pageTree.children ?? []).flatMap((group) =>
    (group.children ?? [])
        .filter((page) => Boolean(page.href))
        .map((page) => ({
            href: page.href as string,
            name: page.name,
            group: group.name,
        })),
)

export type DocNav = {
    current?: FlatDoc
    prev?: FlatDoc
    next?: FlatDoc
}

export function getDocNav(href: string): DocNav {
    const index = flatDocs.findIndex((d) => d.href === href)
    if (index === -1) {
        return {}
    }
    return {
        current: flatDocs[index],
        prev: index > 0 ? flatDocs[index - 1] : undefined,
        next: index < flatDocs.length - 1 ? flatDocs[index + 1] : undefined,
    }
}
