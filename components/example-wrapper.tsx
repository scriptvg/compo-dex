"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const exampleWrapperVariants = cva("border w-full overflow-hidden relative", {
  variants: {
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
  defaultVariants: {
    radius: "none",
  },
});

export type ExampleWrapperProps = React.ComponentProps<"div"> &
  VariantProps<typeof exampleWrapperVariants>;

export function ExampleWrapper({
  radius,
  className,
  ...props
}: ExampleWrapperProps) {
  return (
    <div
      {...props}
      data-slot="example-wrapper"
      className={cn(exampleWrapperVariants({ radius }), className)}
    />
  );
}
