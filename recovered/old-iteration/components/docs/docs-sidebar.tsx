"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";
import { Badge } from "../ui/badge";
import { createContext, useContext, useState, useCallback } from "react";

interface SectionItem {
  id: string;
  title: string;
  level?: number;
}

const DocsSidebarContext = createContext<{
  register: (id: string, title?: string, level?: number) => void;
  unregister: (id: string) => void;
  items: SectionItem[];
  activeId: string | null;
  setActiveId: (id: string) => void;
} | null>(null);

function DocsSidebarProvider({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  className?: string;
}) {
  const [items, setItems] = useState<SectionItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const register = useCallback((id: string, title?: string, level?: number) => {
    setItems((prev) => {
      // Avoid duplicates
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, title: title || id, level }];
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <DocsSidebarContext.Provider
      value={{
        register,
        unregister,
        items,
        activeId,
        setActiveId,
      }}
    >
      <div className={cn("flex min-h-dvh flex-col", className)} {...props}>
        {children}
      </div>
    </DocsSidebarContext.Provider>
  );
}

export const useDocsSidebar = () => {
  const context = useContext(DocsSidebarContext);

  if (!context) {
    throw new Error("DocsSidebar must be used within DocsSidebarProvider");
  }

  return context;
};

const docsSidebarVariants = cva("hidden w-84 shrink-0 border-dashed", {
  variants: {
    variant: {
      default: "lg:block",
      mobile: "xl:block",
    },
    side: {
      left: "border-r",
      right: "border-l",
    },
  },
  defaultVariants: {
    variant: "default",
    side: "left",
  },
});

function DocsSidebar({
  children,
  className,
  variant,
  side,
  ...props
}: React.ComponentProps<"aside"> & {
  className?: string;
  variant?: "default" | "mobile";
  side?: "left" | "right";
}) {
  return (
    <aside
      data-slot="docs-sidebar"
      className={cn(docsSidebarVariants({ variant, side }), className)}
      {...props}
    >
      <div
        data-slot="docs-sidebar-content"
        className="sticky top-12.5 h-[calc(100dvh-10rem)] overflow-y-auto"
      >
        {children}
      </div>
    </aside>
  );
}

function DocsSidebarHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"header"> & {
  className?: string;
}) {
  return (
    <header
      data-slot="docs-sidebar-header"
      className={cn(" bg-sidebar border-dashed px-4 py-2", className)}
      {...props}
    >
      {children}
    </header>
  );
}

function DocsSidebarTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"h2"> & {
  className?: string;
}) {
  return (
    <h2
      data-slot="docs-sidebar-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

function DocsSidebarNav({
  children,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  className?: string;
}) {
  return (
    <nav
      data-slot="docs-sidebar-nav"
      className={cn("divide-y divide-dashed", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

function DocsSidebarLink({
  children,
  className,
  asChild,
  disabled,
  ...props
}: React.ComponentProps<"a"> & {
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Root : "a";

  return (
    <Comp
      data-slot="docs-sidebar-link"
      className={cn(
        "flex items-center justify-between px-4 py-2 hover:bg-muted/30",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

const docsBadgeVariants = cva("", {
  variants: {
    variant: {
      default: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
      new: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
      "coming-soon": "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function DocsBadge({
  children,
  className,
  variant = "default",
  ...props
}: Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  className?: string;
  variant?: "default" | "new" | "coming-soon";
}) {
  return (
    <Badge
      data-slot="docs-badge"
      variant="secondary"
      className={cn(docsBadgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Badge>
  );
}

export {
  DocsSidebarProvider,
  DocsSidebar,
  DocsSidebarHeader,
  DocsSidebarTitle,
  DocsSidebarNav,
  DocsSidebarLink,
  DocsBadge,
};
