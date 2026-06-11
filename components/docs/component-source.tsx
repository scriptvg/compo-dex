import { getFileContent } from "@/lib/get-file"
import { MdxCodeBlock } from "@/components/docs/mdx-code-block"

/** Muestra el código fuente real de un archivo del repo (leído de disco en
 * build, como `ComponentPreview`). Evita embeber código en el MDX, que se
 * desincroniza con cada refactor. Uso:
 * `<ComponentSource src="components/compodex/ui/badge-type.tsx" />` */
export async function ComponentSource({
  src,
  lang = "tsx",
}: {
  /** Ruta relativa a la raíz del repo. */
  src: string
  lang?: string
}) {
  const fileName = src.split("/").pop() ?? src
  const { content } = await getFileContent(src, fileName)

  if (!content) {
    return (
      <p className="text-sm text-destructive">
        ComponentSource: no se pudo leer «{src}».
      </p>
    )
  }

  return <MdxCodeBlock code={content.replace(/\r\n/g, "\n").trimEnd()} lang={lang} />
}
