"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useExampleFile } from "./example-context";
import { IconLanguage } from "./icon-language";

export function ExamplePreview({
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center border-b min-h-[400px] p-10 bg-muted/10",
        className,
      )}
      {...props}
    />
  );
}

export function Example({
  className,
  ...props
}: {
  className?: string;
} & React.ComponentProps<"div">) {
  return <div className={cn("w-full", className)} {...props} />;
}

export function ExampleBadge({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof Badge>) {
  const { language } = useExampleFile();
  return (
    <Badge
      variant="secondary"
      className={cn(
        "absolute rounded-tr-md bottom-0 left-0 flex items-center p-3",
        className,
      )}
      {...props}
    >
      <IconLanguage className="p-0 pr-1" />
      {children}.{language}
    </Badge>
  );
}
