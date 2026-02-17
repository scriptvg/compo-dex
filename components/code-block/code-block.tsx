"use client";

import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { type BundledLanguage, codeToHtml, type ShikiTransformer } from "shiki";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cva } from "class-variance-authority";
import { Skeleton } from "../ui/skeleton";

/* -------------------------------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------------------------------- */

const EMPTY_ARRAY: number[] = [];

/* -------------------------------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------------------------------- */

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: BundledLanguage;
  showLineNumbers?: boolean;
  highlightLines?: number[] | string;
  classNameBlock?: string;
  classFallback?: string;
  hideScrollbar?: boolean;
  collapseLine?: boolean;
  splitLines?: boolean;
};

interface CodeBlockContextType {
  code: string;
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * ------------------------------------------------------------------------------------------------- */

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

/* -------------------------------------------------------------------------------------------------
 * Shiki transformers
 * ------------------------------------------------------------------------------------------------- */

const lineNumberTransformer: ShikiTransformer = {
  name: "line-numbers",
  line(node, line) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        className: [
          "sticky",
          "left-0",
          "z-5",
          "inline-flex",
          "justify-end",
          "min-w-10",
          "pr-3",
          "mr-4",
          "select-none",
          "text-muted-foreground/40",
          "border-r",
          "bg-background",
        ],
      },
      children: [{ type: "text", value: String(line) }],
    });
  },
};

function parseHighlightLines(highlight?: number[] | string): number[] {
  if (!highlight) return [];
  if (Array.isArray(highlight)) return highlight;

  return highlight.split(",").flatMap((part) => {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }
    }
    const num = Number(part.trim());
    return Number.isFinite(num) ? [num] : [];
  });
}

const commonLineTransformer: ShikiTransformer = {
  name: "common-line",
  line(node) {
    this.addClassToHast(node, "w-full min-h-[1.25rem]");
  },
};

const lineHighlightTransformer = (lines: number[]): ShikiTransformer => ({
  name: "line-highlight",
  line(node, line) {
    if (lines.includes(line)) {
      this.addClassToHast(node, "w-full bg-muted/50");
    }
  },
});

async function highlightCode(
  code: string,
  language: BundledLanguage,
  showLineNumbers: boolean,
  highlightLines: number[] | string,
) {
  const parsed = parseHighlightLines(highlightLines);

  const transformers: ShikiTransformer[] = [
    commonLineTransformer,
    ...(showLineNumbers ? [lineNumberTransformer] : []),
    ...(parsed.length ? [lineHighlightTransformer(parsed)] : []),
  ];

  return Promise.all([
    codeToHtml(code, { lang: language, theme: "one-light", transformers }),
    codeToHtml(code, { lang: language, theme: "one-dark-pro", transformers }),
  ]);
}

/* -------------------------------------------------------------------------------------------------
 * Hook — responsabilidad clara
 * ------------------------------------------------------------------------------------------------- */

function useHighlightedCode(
  code: string,
  language: BundledLanguage,
  showLineNumbers: boolean,
  highlightLines: number[] | string,
) {
  const [state, setState] = useState<{ light: string; dark: string } | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    highlightCode(code, language, showLineNumbers, highlightLines).then(
      ([light, dark]) => {
        if (active) setState({ light, dark });
      },
    );

    return () => {
      active = false;
    };
  }, [code, language, showLineNumbers, JSON.stringify(highlightLines)]);

  return state;
}

/* -------------------------------------------------------------------------------------------------
 * UI helpers
 * ------------------------------------------------------------------------------------------------- */

export function CodeBlockScrollArea({
  children,
  className,
  ...props
}: ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      className={cn(
        "group relative grid grid-rows-[1fr] mx-auto overflow-auto rounded-md border text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

const lineVariants = cva(
  "[&>pre]:m-0 [&>pre]:overflow-visible! [&>pre]:bg-background! [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono ",
  {
    variants: {
      theme: {
        light: "block dark:hidden",
        dark: "hidden dark:block",
      },
    },
  },
);

function Line({
  html,
  theme,
  classNameBlock,
}: {
  html: string;
  theme: "light" | "dark";
  classNameBlock?: string;
}) {
  return (
    <div
      data-theme={theme}
      className={cn(lineVariants({ theme }), classNameBlock)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * splitLines helpers
 * ------------------------------------------------------------------------------------------------- */

function splitShikiHtmlLines(html: string) {
  return html.match(/<span class="line">[\s\S]*?<\/span>/g) ?? [];
}

function CodeBlockLines({
  html,
  classNameBlock,
}: {
  html: string;
  classNameBlock?: string;
}) {
  const lines = splitShikiHtmlLines(html);

  return (
    <div data-slot="code-lines">
      {lines.map((lineHtml, index) => (
        <div key={index} className="flex">
          <span className="inline-flex min-w-10 justify-end px-3 mr-4 text-muted-foreground/40 select-none">
            {index + 1}
          </span>
          <span
            className={cn("w-full ", classNameBlock)}
            dangerouslySetInnerHTML={{ __html: lineHtml }}
          />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * CodeBlock
 * ------------------------------------------------------------------------------------------------- */

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  highlightLines = EMPTY_ARRAY,
  splitLines = false,
  className,
  classNameBlock,
  classFallback,
  children,
}: CodeBlockProps) {
  const highlighted = useHighlightedCode(
    code,
    language,
    showLineNumbers && !splitLines,
    highlightLines,
  );

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <CodeBlockScrollArea className={className}>
        {children && (
          <div className="absolute top-2 right-2 z-20 flex gap-2">
            {children}
          </div>
        )}

        <div className="relative min-w-full">
          {!highlighted ? (
            <div
              className={cn(
                "flex h-40 items-center justify-center",
                classFallback,
              )}
            >
              <Skeleton className="w-full h-full " />
            </div>
          ) : splitLines ? (
            <>
              <div className="dark:hidden">
                <CodeBlockLines
                  html={highlighted.light}
                  classNameBlock={classNameBlock}
                />
              </div>
              <div className="hidden dark:block">
                <CodeBlockLines
                  html={highlighted.dark}
                  classNameBlock={classNameBlock}
                />
              </div>
            </>
          ) : (
            <>
              <Line
                html={highlighted.light}
                theme="light"
                classNameBlock={classNameBlock}
              />
              <Line
                html={highlighted.dark}
                theme="dark"
                classNameBlock={cn("", classNameBlock)}
              />
            </>
          )}
        </div>
      </CodeBlockScrollArea>
    </CodeBlockContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Copy button
 * ------------------------------------------------------------------------------------------------- */

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export function CodeBlockCopyButton({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) {
  const { code } = useContext(CodeBlockContext);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), timeout);
    } catch (e) {
      onError?.(e as Error);
    }
  }

  const Icon = copied ? CheckIcon : CopyIcon;

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("shrink-0", className)}
      onClick={handleCopy}
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
}
