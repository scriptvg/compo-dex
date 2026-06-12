import "server-only"

import type { ComponentType } from "react"

/** Metadata declarada en el frontmatter (`--- title / description ---`) de cada
 * MDX. La expone `remark-mdx-frontmatter` como `export const frontmatter`. */
export type DocFrontmatter = {
    title?: string
    description?: string
    dependencies?: string[]
}

export type DocModule = {
    default: ComponentType
    frontmatter?: DocFrontmatter
}

/** Carga del contenido MDX por slug. Imports estáticos (bundler-friendly).
 *
 * Vive aparte de `lib/docs-registry.ts` porque arrastra `mdx-components` →
 * `ComponentPreview` → `lib/get-file` (fs), que es solo de servidor. Importar
 * esto desde un Client Component rompería el build. */
export const docLoaders: Record<string, () => Promise<DocModule>> = {
    introduction: () => import("@/content/docs/introduction.mdx"),
    installation: () => import("@/content/docs/installation.mdx"),
    "build-a-pokedex": () => import("@/content/docs/build-a-pokedex.mdx"),
    changelog: () => import("@/content/docs/changelog.mdx"),
}
