import { Button } from "@/components/ui/button"
import { CodeBlock, CodeBlockCode, CodeBlockHeader } from "@/components/ui/code-block"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Copy, File } from "lucide-react"
import { readFile } from "fs/promises"
import path from "path"



export default async function Page() {
  const buttonCode = await readFile(path.join(process.cwd(), "components", "ui", "button.tsx"), "utf-8")

  return (
    <div className="flex flex-col gap-4 min-h-svh p-6">


      <div className="flex flex-col gap-4 ">
        <CodeBlock>
          <CodeBlockHeader>
            <div className="flex items-center gap-2">
              <File className="size-4" />
              <h1 className="text-[14px] font-medium">button.tsx</h1>
            </div>
            <Button variant="ghost" size="icon-xs">
              <Copy className="size-4" />
            </Button>
          </CodeBlockHeader>
          <ScrollArea className="w-full h-[200px] ">
            <CodeBlockCode code={buttonCode} language="typescript" showLineNumbers={true} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CodeBlock>
      </div>

      <CodeBlock className="relative">
        <Button variant="ghost" size="icon-xs" className="absolute top-1.5 right-1.5">
          <Copy className="size-4" />
        </Button>
        <CodeBlockCode code="npm install @/components/ui/code-block" language="bash" />
      </CodeBlock>
    </div>
  )
}
