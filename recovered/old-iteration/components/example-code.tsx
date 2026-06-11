"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./code-block/code-block";
import { useExampleFile } from "./example-context";

const copyButtonVariants = cva("", {
  variants: {
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
});

const codeBlockVariants = cva("border-none rounded-none  ", {
  variants: {
    collapsible: {
      true: "transition-all duration-300",
      false: "",
    },
    open: {
      true: "max-h-[700px]",
      false: "max-h-40",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
});

const codeOverlayVariants = cva(
  "absolute inset-0 z-10 bg-muted/20 backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      align: {
        center: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
      justify: {
        center: "items-center",
        start: "items-start",
        end: "items-end",
      },
    },
  },
);
export type ExampleShowCodeButtonProps = {
  className?: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
};

export function ExampleShowCodeButton({
  className,
  variant = "ghost",
  size = "sm",
  radius = "none",
  ...props
}: ExampleShowCodeButtonProps & React.ComponentProps<typeof Button>) {
  const { open, setOpen } = useExampleFile();

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <Button
      className={cn(copyButtonVariants({ radius }), className)}
      onClick={toggleOpen}
      size={size}
      variant={variant}
      {...props}
    >
      {open ? "Hide code" : "Show code"}
    </Button>
  );
}

export type ExampleCodeProps = {
  className?: string;
  showLineNumbers?: boolean;
  children?: React.ReactNode;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  hideScrollbar?: boolean;
  toolbar?: React.ReactNode;
  classNameBlock?: string;
  classFallback?: string;
  highlightLines?: number[] | string;
};

export function ExampleCode({
  showLineNumbers,
  radius = "none",
  className,
  classNameBlock,
  classFallback,
  children,
  hideScrollbar = false,
  highlightLines,
  toolbar,
  ...props
}: ExampleCodeProps & React.ComponentProps<"div">) {
  const {
    open: openContext,
    collapsible,
    code: codeContext,
    language: languageContext,
  } = useExampleFile();
  return (
    <div className={cn("relative w-full", className)} {...props}>
      <CodeBlock
        showLineNumbers={showLineNumbers}
        code={codeContext}
        hideScrollbar={hideScrollbar}
        highlightLines={highlightLines}
        language={languageContext}
        classNameBlock={cn("", classNameBlock)}
        className={cn(
          codeBlockVariants({
            collapsible,
            open: openContext,
            radius,
          }),
        )}
        classFallback={classFallback}
      >
        {toolbar}
      </CodeBlock>

      {children}
    </div>
  );
}

export function ExampleCodeOverlay({
  children,
  align = "center",
  justify = "center",
}: {
  children?: React.ReactNode;
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end";
}) {
  const { open: openContext, collapsible: collapsibleContext } =
    useExampleFile();

  if (collapsibleContext && !openContext) {
    return (
      <div
        className={cn("h-full flex", codeOverlayVariants({ align, justify }))}
      >
        {children}
      </div>
    );
  }

  return null;
}
