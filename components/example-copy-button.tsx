"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export type ExampleCopyButtonProps = {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  children?: React.ReactNode;
  className?: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
};

export const ExampleCopyButton = ({
  onCopy,
  onError,
  radius = "none",
  timeout = 2000,
  children,
  className,
  ...props
}: ExampleCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useExampleFile();

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn(copyButtonVariants({ radius }), className)}
      onClick={copyToClipboard}
      size="icon-sm"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};
