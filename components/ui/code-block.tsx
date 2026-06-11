"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Element } from "hast";
import React, { useState, useEffect } from "react";
import { BundledLanguage, BundledTheme, codeToHtml, type ShikiTransformer } from "shiki";
import { useTheme } from "next-themes";

function isLineElement(node: unknown): boolean {
    if (!node || typeof node !== "object" || !("type" in node) || node.type !== "element") {
        return false;
    }
    const props = (node as Element).properties;
    if (!props) {
        return false;
    }
    const raw = props.class ?? props.className;
    const classes = Array.isArray(raw) ? raw.join(" ") : typeof raw === "string" ? raw : "";
    return classes.split(/\s+/).includes("line");
}

/** Shiki inserts `\n` text nodes between `.line` spans; inside `<pre>` they become extra blank lines. */
function stripShikiLineGapNewlines(): ShikiTransformer {
    return {
        name: "strip-shiki-line-gaps",
        code(node) {
            const out = node.children.filter((child, i, arr) => {
                if (child.type !== "text" || child.value !== "\n") {
                    return true;
                }
                return !(
                    isLineElement(arr[i - 1]) &&
                    isLineElement(arr[i + 1])
                );
            });
            node.children = out;
        },
    };
}

function lineNumberTransformer(): ShikiTransformer {
    return {
        name: "line-numbers",
        line(node, lineNo) {
            const gutter: Element = {
                type: "element",
                tagName: "span",
                properties: {
                    class: "inline-block min-w-[4ch] shrink-0 select-none text-right tabular-nums font-mono text-muted-foreground border-border border-r pr-3 mr-3",
                },
                children: [{ type: "text", value: String(lineNo) }],
            };
            const cls = node.properties.className;
            const parts = Array.isArray(cls) ? [...cls] : typeof cls === "string" ? cls.split(/\s+/).filter(Boolean) : [];
            parts.push("flex", "items-start", "gap-0");
            node.properties.className = [...new Set(parts)].join(" ");
            node.children.unshift(gutter);
        },
    };
}

export type CodeBlockProps = {
    children?: React.ReactNode;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    return (
        <div className={cn(
            "not-prose flex h-fit w-full flex-col overflow-hidden border relative",
            "border-border bg-card text-card-foreground",
            className
        )} {...props}>
            {children}
        </div>
    )
}

export type CodeBlockHeaderProps = {
    children?: React.ReactNode;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlockHeader({ children, className, ...props }: CodeBlockHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between px-2 py-1 border-b", className)} {...props}>
            {children}
        </div>
    )
}



/** Clases compartidas por el código resaltado y su skeleton, para que ambos
 *  tengan EXACTAMENTE el mismo box (padding del `pre`, scroll, tipografía...). */
const CODE_BLOCK_CLASSNAMES =
    "mt-0 w-full min-w-0 overflow-x-auto text-[13px] [&_.line]:block [&>pre]:min-w-0 [&>pre]:w-fit [&>pre]:whitespace-pre [&>pre]:px-2 [&>pre]:py-2 [&>pre>code]:whitespace-pre";

/** Mismo gutter que `lineNumberTransformer`, para que el número de línea cuadre. */
const GUTTER_CLASSNAMES =
    "inline-flex min-w-[4ch] shrink-0 select-none items-center justify-end border-border border-r pr-3 mr-3";

/** Anchos deterministas en `ch` (como longitudes de línea de código real; evita Math.random e hidratación inconsistente). */
const SKELETON_CH = [
    "w-[28ch]", "w-[42ch]", "w-[20ch]", "w-[36ch]", "w-[16ch]",
    "w-[40ch]", "w-[24ch]", "w-[33ch]", "w-[18ch]", "w-[30ch]",
] as const;

export type CodeBlockSkeletonProps = {
    /** Número de líneas a mostrar. */
    lines?: number;
    /** Reserva la columna de "número de línea" para igualar el layout final. */
    showLineNumbers?: boolean;
    className?: string;
};

/**
 * Placeholder de carga para `CodeBlockCode` mientras Shiki resalta en el cliente.
 * Usa la MISMA estructura `div.classNames > pre > code` que el código real, para
 * que las clases dirigidas al `pre` (padding, whitespace, scroll) le apliquen igual.
 */
function CodeBlockSkeleton({
    lines = 8,
    showLineNumbers = false,
    className,
}: CodeBlockSkeletonProps) {
    return (
        <div
            data-slot="code-block-skeleton"
            aria-hidden
            className={cn(CODE_BLOCK_CLASSNAMES, className)}
        >
            <pre className="!bg-transparent">
                <code>
                    {Array.from({ length: Math.max(1, lines) }).map((_, i) => (
                        <span key={i} className="flex h-5 items-center">
                            {showLineNumbers ? (
                                <span className={GUTTER_CLASSNAMES}>
                                    <Skeleton className="h-3 w-3" />
                                </span>
                            ) : null}
                            <Skeleton
                                className={cn(
                                    "h-3",
                                    SKELETON_CH[i % SKELETON_CH.length]
                                )}
                            />
                        </span>
                    ))}
                </code>
            </pre>
        </div>
    );
}

export type CodeBlockCodeProps = {
    code: string;
    language?: BundledLanguage;
    showLineNumbers?: boolean;
    theme?: BundledTheme;
    /** Líneas del skeleton de carga. Por defecto se infiere del código (máx. 16). */
    skeletonLines?: number;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlockCode({
    code,
    language = "tsx",
    showLineNumbers = false,
    theme: themeProp,
    skeletonLines,
    className,
    ...props
}: CodeBlockCodeProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

    const shikiTheme: BundledTheme =
        themeProp ??
        (resolvedTheme === "dark" ? "github-dark-default" : "github-light-default");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- mount guard to defer Shiki highlight until client
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        async function highlight() {
            if (!code) {
                setHighlightedHtml("<pre><code></code></pre>");
                return;
            }

            const html = await codeToHtml(code, {
                lang: language,
                theme: shikiTheme,
                rootStyle: false,
                transformers: [
                    stripShikiLineGapNewlines(),
                    ...(showLineNumbers ? [lineNumberTransformer()] : []),
                ],
            });
            setHighlightedHtml(html);
        }
        highlight();
    }, [code, language, shikiTheme, mounted, showLineNumbers]);

    const classNames = cn(CODE_BLOCK_CLASSNAMES, className);

    // Mientras Shiki resalta (en cliente), mostramos un skeleton.
    // El nº de líneas sigue al código real (acotado a 40) para que llene igual
    // el contenedor y haga scroll/clip como el resultado final.
    const fallbackLines =
        skeletonLines ??
        Math.min(Math.max(code ? code.split("\n").length : 0, 1), 40);

    return highlightedHtml ? (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            {...props}
        />
    ) : (
        <CodeBlockSkeleton
            lines={fallbackLines}
            showLineNumbers={showLineNumbers}
            className={className}
        />
    )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    className?: string;
}

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { CodeBlock, CodeBlockCode, CodeBlockGroup, CodeBlockHeader, CodeBlockSkeleton };