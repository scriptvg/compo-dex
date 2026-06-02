export type DocPage = {
    /** URL slug bajo /docs/<slug> y nombre del archivo content/docs/<slug>.mdx */
    slug: string
    title: string
    description?: string
}

/** Páginas de guía (no-componentes). Fuente única para el sidebar (Getting
 * Started) y las rutas. Datos puros: seguro de importar desde cliente o
 * servidor (los loaders MDX viven en `lib/docs-content.ts`). */
export const docPages: DocPage[] = [
    {
        slug: "introduction",
        title: "Introduction",
        description: "Qué es compodex y qué incluye.",
    },
    {
        slug: "installation",
        title: "Installation",
        description: "Cómo instalar y arrancar el proyecto.",
    },
]

export function getDocPage(slug: string): DocPage | undefined {
    return docPages.find((p) => p.slug === slug)
}
