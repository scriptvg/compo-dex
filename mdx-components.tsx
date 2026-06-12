import type { MDXComponents } from "mdx/types"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AnchorHeading } from "@/components/docs/anchor-heading"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ComponentSource } from "@/components/docs/component-source"
import { MdxCodeBlock } from "@/components/docs/mdx-code-block"
import { Steps, Step } from "@/components/docs/steps"
import { EnumType } from "@/components/docs/enum-type"
import { PropsTable } from "@/components/docs/props-table"
import { Callout } from "@/components/docs/callout"
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block"
import { CommandBlock } from "@/components/ui/command-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableCell, TableHead, TableHeader } from "./components/ui/table"
import { Badge } from "./components/ui/badge"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ className, ...props }) => (
            <h1
                className={cn("mt-2 scroll-m-24 text-3xl font-bold", className)}
                {...props}
            />
        ),
        h2: ({ className, ...props }) => (
            <AnchorHeading
                level={2}
                className={cn(
                    "mt-8 mb-3 pb-2 text-2xl font-semibold first:mt-0",
                    className,
                )}
                {...props}
            />
        ),
        h3: ({ className, ...props }) => (
            <AnchorHeading
                level={3}
                className={cn("mt-5 mb-2 text-xl font-semibold", className)}
                {...props}
            />
        ),
        h4: ({ className, ...props }) => (
            <AnchorHeading
                level={4}
                className={cn("mt-5 mb-2 text-lg font-semibold", className)}
                {...props}
            />
        ),
        p: ({ className, ...props }) => (
            <p
                className={cn(
                    "leading-7 text-foreground/90 [&:not(:first-child)]:mt-4",
                    className,
                )}
                {...props}
            />
        ),
        ul: ({ className, ...props }) => (
            <ul
                className={cn("my-4 ml-6 list-disc [&>li]:mt-2", className)}
                {...props}
            />
        ),
        ol: ({ className, ...props }) => (
            <ol
                className={cn("my-4 ml-6 list-decimal [&>li]:mt-2", className)}
                {...props}
            />
        ),
        li: ({ className, ...props }) => (
            <li className={cn("leading-7", className)} {...props} />
        ),
        a: ({ className, href = "", ...props }) => (
            <Link
                href={href}
                className={cn(
                    "font-medium text-primary underline underline-offset-4",
                    className,
                )}
                {...props}
            />
        ),
        table: ({ className, ...props }) => (
            <div className="my-4 w-full overflow-x-auto border">
                <Table
                    className={cn("w-full border-collapse text-sm", className)}
                    {...props}
                />
            </div>
        ),
        thead: ({ className, ...props }) => (
            <TableHeader className={cn("bg-muted/50", className)} {...props} />
        ),
        th: ({ className, ...props }) => (
            <TableHead
                className={cn(
                    "border-b    text-left font-medium",
                    className,
                )}
                {...props}
            />
        ),
        td: ({ className, ...props }) => (
            <TableCell
                className={cn(className)}
                {...props}
            />
        ),
        blockquote: ({ className, ...props }) => (
            <blockquote
                className={cn(
                    "mt-4 border-l-2 border-border pl-4 text-muted-foreground italic",
                    className,
                )}
                {...props}
            />
        ),
        // Bloques con triple backtick (```lang) → Shiki + copiar.
        pre: ({ children }) => {
            const child = children as React.ReactElement<{
                className?: string
                children?: string
            }>
            const lang =
                child?.props?.className?.replace("language-", "") || "tsx"
            const code =
                typeof child?.props?.children === "string"
                    ? child.props.children.replace(/\n$/, "")
                    : ""

            if (!code) {
                return <pre>{children}</pre>
            }
            return <MdxCodeBlock code={code} lang={lang} />
        },
        // `code` inline (sin lenguaje).
        code: ({ className, ...props }) => (
            <Badge variant="secondary" {...props} />
        ),
        ComponentPreview,
        ComponentSource,
        CommandBlock,
        CodeBlock,
        CodeBlockCode,
        Steps,
        Step,
        EnumType,
        PropsTable,
        Callout,
        Tabs,
        TabsList,
        TabsTrigger,
        TabsContent,
        Accordion,
        AccordionItem,
        AccordionTrigger,
        AccordionContent,
        ...components,
    }
}
