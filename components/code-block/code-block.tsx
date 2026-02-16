import { cn } from "@/lib/utils";
import { FileIcon } from "@react-symbols/icons/utils";
import * as React from "react";

function CodeBlock({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "not-prose",
        "flex w-full flex-col overflow-clip rounded-lg shadow-xs",
        "bg-neutral-200/40 dark:bg-neutral-800/70",
        "border border-neutral-200 dark:border-neutral-800",
        "text-neutral-950 dark:text-neutral-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CodeBlockHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "not-prose", // Disable Markdown Styles
        "flex h-9 items-center justify-between px-2 py-1.5",
        "text-sm text-neutral-600 dark:text-neutral-400",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CodeBlockIcon({
  language,
  className,
}: React.ComponentProps<"div"> & {
  language?: string;
}) {
  return (
    <FileIcon
      width={16}
      height={16}
      fileName={`.${language ?? ""}`}
      autoAssign={true}
      className={cn(className)}
    />
  );
}

function CodeBlockGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center space-x-2",
        "text-sm text-neutral-600 dark:text-neutral-400",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CodeBlockContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-h-96 overflow-y-auto",
        "bg-neutral-50 dark:bg-neutral-900",
        "rounded-lg font-mono text-sm leading-5 whitespace-pre",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockIcon,
  CodeBlockGroup,
  CodeBlockContent,
};
