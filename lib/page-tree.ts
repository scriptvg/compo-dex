import {
    getComponentsByCategory,
    type ComponentDoc,
} from "@/lib/components-registry"
import { docPages } from "@/lib/docs-registry"

export type PageTreeNode = {
    name: string
    href?: string
    type?: "folder"
    /** `true` to show the "New" badge next to the link. */
    isNew?: boolean
    children?: PageTreeNode[]
}

function toLeaf(c: ComponentDoc): PageTreeNode {
    return {
        name: c.name,
        href: `/docs/components/${c.slug}`,
        isNew: c.isNew,
    }
}

export const pageTree: PageTreeNode = {
    name: "Docs",
    children: [
        {
            name: "Getting Started",
            type: "folder",
            children: docPages.map((p) => ({
                name: p.title,
                href: `/docs/${p.slug}`,
            })),
        },
        {
            name: "Components",
            type: "folder",
            children: getComponentsByCategory("component").map(toLeaf),
        },
        {
            name: "Blocks",
            type: "folder",
            children: getComponentsByCategory("block").map(toLeaf),
        },
    ],
}
