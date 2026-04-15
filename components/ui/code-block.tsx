"use client";

import { cn } from "@/lib/utils";
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
            "not-prose flex h-fit w-full min-w-0 flex-col overflow-clip border",
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



export type CodeBlockCodeProps = {
    code: string;
    language?: BundledLanguage;
    showLineNumbers?: boolean;
    theme?: BundledTheme;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlockCode({
    code,
    language = "tsx",
    showLineNumbers = false,
    theme: themeProp,
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

    const classNames = cn(
        "mt-0 w-full min-w-0 overflow-x-auto text-[13px] [&_.line]:block [&>pre]:min-w-0 [&>pre]:w-fit [&>pre]:whitespace-pre [&>pre]:px-2 [&>pre]:py-2 [&>pre>code]:whitespace-pre",
        className
    );

    return highlightedHtml ? (
        <div
            className={classNames}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            {...props}
        />
    ) : (
        <div className={classNames}>
            <pre className="whitespace-pre">
                <code>{code}</code>
            </pre>
        </div>
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

export { CodeBlock, CodeBlockCode, CodeBlockGroup, CodeBlockHeader };