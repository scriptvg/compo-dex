import GithubSlugger from "github-slugger"

export type TocEntry = {
    title: string
    url: string
    depth: number
}

/** Extrae la tabla de contenidos (h2–h4) del markdown crudo. Usa github-slugger
 * para que los `url` (#anchor) coincidan con los `id` que genera rehype-slug. */
export function extractToc(markdown: string): TocEntry[] {
    const slugger = new GithubSlugger()
    const toc: TocEntry[] = []
    let inFence = false

    for (const rawLine of markdown.split("\n")) {
        const line = rawLine.trimEnd()

        if (line.trimStart().startsWith("```")) {
            inFence = !inFence
            continue
        }
        if (inFence) continue

        const match = /^(#{2,4})\s+(.+?)\s*#*$/.exec(line)
        if (!match) continue

        const depth = match[1].length
        // Limpia marcas inline básicas (**bold**, _italic_, `code`, [text](url)).
        const title = match[2]
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/[*_`]/g, "")
            .trim()

        toc.push({ title, url: `#${slugger.slug(title)}`, depth })
    }

    return toc
}
