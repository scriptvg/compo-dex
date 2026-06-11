"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";
import { useDocsSidebar } from "./docs-sidebar";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Docs({
  className,
  asChild,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Root : "div";
  return <Comp className={cn("not-prose", className)} {...props} />;
}

Docs.displayName = "Docs";

function DocsPage({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Docs> & {
  className?: string;
}) {
  return (
    <Docs
      className={cn(
        "space-y-8 px-4 md:ml-0 md:mx-0 scroll-mt-16 gap-8",
        className,
      )}
      {...props}
    >
      {children}
    </Docs>
  );
}

function DocsNav({
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-2", className)} {...props} />
  );
}

function DocsNavNext({
  variant = "outline",
  size = "icon-sm",
  radius = "default",
  tooltip = "Next",
  className,
  ...props
}: {
  variant?: "outline" | "ghost";
  size?: "icon-sm" | "icon-md" | "icon-lg";
  radius?: "default" | "sm" | "lg";
  tooltip?: string;
  className?: string;
} & React.ComponentProps<typeof Link> &
  React.ComponentProps<typeof Button> & {
    tooltip?: string;
  }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant={variant}
          size={size}
          className={cn(navVariants({ radius }), className)}
          asChild
          {...props}
        >
          <Link {...props}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

// ============================================================================
// NavPrevious
// ============================================================================

const navVariants = cva("", {
  variants: {
    radius: {
      default: "",
      sm: "rounded-sm",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    radius: "default",
  },
});

function DocsNavPrevious({
  variant = "outline",
  size = "icon-sm",
  radius = "default",
  tooltip = "Previous",
  className,

  ...props
}: {
  variant?: "outline" | "ghost";
  size?: "icon-sm" | "icon-md" | "icon-lg";
  radius?: "default" | "sm" | "lg";
  tooltip?: string;
  className?: string;
} & React.ComponentProps<typeof Link> &
  React.ComponentProps<typeof Button> & {
    tooltip?: string;
  }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant={variant}
          size={size}
          className={cn(navVariants({ radius }), className)}
          asChild
          {...props}
        >
          <Link {...props}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

const titleVariants = cva("", {
  variants: {
    variant: {
      h1: "text-3xl font-bold",
      h2: "text-xl font-semibold tracking-tight",
      h3: "text-lg font-medium tracking-tight",
    },
    appearance: {
      default: "",
      muted: "text-muted-foreground",
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      strikethrough: "line-through",
    },
  },
  defaultVariants: {
    variant: "h1",
    appearance: "default",
  },
});

function DocsTitle({
  variant,
  appearance,
  className,
  ...props
}: React.ComponentProps<"h1"> & {
  variant?: "h1" | "h2" | "h3";
  appearance?:
    | "default"
    | "muted"
    | "bold"
    | "italic"
    | "underline"
    | "strikethrough";
}) {
  return (
    <h1
      className={cn(titleVariants({ variant, appearance }), className)}
      {...props}
    />
  );
}

const descriptionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      muted: "text-muted-foreground",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function DocsDescription({
  variant,
  size,
  asChild,
  className,
  ...props
}: React.ComponentProps<"p"> & {
  variant?: "default" | "muted";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Root : "p";
  return (
    <Comp
      className={cn(descriptionVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function DocsHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header className={cn("space-y-2", className)} {...props} />;
}

function DocsSection({
  className,
  id,
  title,
  level,
  ...props
}: React.ComponentProps<"section"> & {
  id?: string;
  title?: string;
  level?: number;
}) {
  const { register, unregister } = useDocsSidebar();

  useEffect(() => {
    if (id) {
      register(id, title, level);
      return () => unregister(id);
    }
  }, [id, title, level, register, unregister]);

  return <section id={id} className={cn("space-y-4", className)} {...props} />;
}

export { Docs, DocsPage, DocsTitle, DocsDescription, DocsSection, DocsHeader, DocsNavNext, DocsNavPrevious, DocsNav };
