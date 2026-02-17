"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useExampleFile, languageIcons } from "./example-context";

const languageIconsVariants = cva("p-1 ", {
  variants: {
    size: {
      xs: "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
      sm: "size-7 rounded-none",
      lg: "size-9",
    },
    variant: {
      default: "",
      outline: "border-border border dark:border-input",
      secondary:
        "bg-secondary text-secondary-foreground dark:bg-secondary/50 dark:border-secondary/50",
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

const iconLanguageVariants = cva("size-4", {
  variants: {
    language: {
      tsx: "text-blue-500 dark:text-blue-400",
      jsx: "text-blue-500 dark:text-blue-400",
      ts: "text-blue-500 dark:text-blue-400",
      typescript: "text-blue-500 dark:text-blue-400",
      js: "text-yellow-500 dark:text-yellow-400",
      javascript: "text-yellow-500 dark:text-yellow-400",
      bash: "text-gray-500 dark:text-gray-400",
    },
  },
  defaultVariants: {
    language: "tsx",
  },
});

export function IconLanguageWrapper({
  className,
  size,
  variant,
  radius,
  ...props
}: React.ComponentProps<"div"> & {
  className?: string;
  size?: "xs" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary";
  radius?: "none" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div
      data-slot="icon-language-wrapper"
      {...props}
      className={cn(
        languageIconsVariants({ size, variant, radius }),
        className,
      )}
    />
  );
}

export function IconLanguage({
  w_size,
  w_variant,
  w_radius,
}: React.ComponentProps<typeof IconLanguageWrapper> & {
  w_variant?: "default" | "outline" | "secondary";
  w_size?: "xs" | "sm" | "lg";
  w_radius?: "none" | "sm" | "md" | "lg" | "xl";
}) {
  const { language } = useExampleFile();

  const Icon = languageIcons[language] || languageIcons["tsx"];
  return (
    <IconLanguageWrapper size={w_size} variant={w_variant} radius={w_radius}>
      <Icon
        data-slot="icon-language"
        className={cn(
          iconLanguageVariants({
            language: language as any,
          }),
        )}
      />
    </IconLanguageWrapper>
  );
}
