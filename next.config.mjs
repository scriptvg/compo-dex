import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Permite páginas y contenido .md/.mdx además de ts/tsx.
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
        ],
    },
}

const withMDX = createMDX({
    options: {
        // Plugins como string para que Turbopack pueda serializarlos.
        // remark-frontmatter parsea el bloque YAML; remark-mdx-frontmatter lo
        // expone como `export const frontmatter` (debe ir después).
        remarkPlugins: [
            ["remark-frontmatter"],
            ["remark-mdx-frontmatter"],
            ["remark-gfm"],
        ],
        rehypePlugins: [["rehype-slug"]],
    },
})

export default withMDX(nextConfig)
