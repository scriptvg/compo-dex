import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";

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
        "max-w-3xl space-y-8 px-4 mx-auto md:ml-0 md:mx-0 scroll-mt-16 gap-8",
        className,
      )}
      {...props}
    >
      {children}
    </Docs>
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

function DocsSection({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("space-y-4", className)} {...props} />;
}

export { Docs, DocsPage, DocsTitle, DocsDescription, DocsSection, DocsHeader };
