import "server-only"

import type { ComponentType } from "react"

/** Carga del contenido MDX por slug. Imports estáticos (bundler-friendly).
 *
 * Vive aparte de `lib/docs-registry.ts` porque arrastra `mdx-components` →
 * `ComponentPreview` → `lib/get-file` (fs), que es solo de servidor. Importar
 * esto desde un Client Component rompería el build. */
export const docLoaders: Record<
    string,
    () => Promise<{ default: ComponentType }>
> = {
    introduction: () => import("@/content/docs/introduction.mdx"),
    installation: () => import("@/content/docs/installation.mdx"),
}
