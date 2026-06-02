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
        remarkPlugins: [["remark-frontmatter"], ["remark-gfm"]],
        rehypePlugins: [["rehype-slug"]],
    },
})

export default withMDX(nextConfig)
