import type { Metadata } from "next"

/** Forma mínima de un módulo MDX que nos interesa para la metadata. */
type FrontmatterModule = {
    frontmatter?: {
        title?: string
        description?: string
    }
}

type SlugParams = { params: Promise<{ slug: string }> }

export type DocRouteConfig<TEntry extends { slug: string }> = {
    /** Entradas del registry: definen las rutas estáticas válidas. */
    entries: TEntry[]
    /** Resuelve una entrada por slug (undefined si no existe). */
    getEntry: (slug: string) => TEntry | undefined
    /** Loaders MDX por slug. */
    loaders: Record<string, () => Promise<FrontmatterModule>>
    /**
     * Metadata de respaldo tomada del registry, usada cuando el frontmatter
     * del MDX no la trae. Normaliza las diferencias entre registries
     * (p. ej. `page.title` vs `doc.name`).
     */
    getFallback: (entry: TEntry) => { title: string; description?: string }
}

/**
 * Genera `generateStaticParams` y `generateMetadata` para una ruta de docs
 * basada en slug. Centraliza el patrón repetido entre `/docs/[slug]` y
 * `/docs/components/[slug]`: el frontmatter del MDX manda y el registry actúa
 * como fallback/manifiesto de rutas.
 */
export function createDocRoute<TEntry extends { slug: string }>(
    config: DocRouteConfig<TEntry>,
) {
    function generateStaticParams() {
        return config.entries.map((entry) => ({ slug: entry.slug }))
    }

    async function generateMetadata({
        params,
    }: SlugParams): Promise<Metadata> {
        const { slug } = await params

        const entry = config.getEntry(slug)
        const load = config.loaders[slug]

        if (!entry || !load) return {}

        const { frontmatter } = await load()
        const fallback = config.getFallback(entry)

        return {
            title: frontmatter?.title ?? fallback.title,
            description: frontmatter?.description ?? fallback.description,
        }
    }

    return { generateStaticParams, generateMetadata }
}
