"use client"

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { usePathname } from "next/navigation";
import Link from "next/link";

export interface SidebarProps extends React.ComponentProps<"aside"> {
  side?: "left" | "right";
  sections?: {
    title: string;
    href: string;
  }[];
}

const sidebarVariants = cva(
  "fixed hidden lg:block top-12 h-[calc(100vh-2rem)] w-80",
  {
    variants: {
      side: {
        left: "left-0",
        right: "right-0",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

export function Sidebar({
  side = "left",
  className,
  ...props
}: React.ComponentProps<"aside"> & VariantProps<typeof sidebarVariants>) {
  return (
    <aside className={cn(sidebarVariants({ side }), className)} {...props} />
  );
}

export function SidebarTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-xs font-bold text-muted-foreground pl-2 pt-10",
        className,
      )}
      {...props}
    />
  );
}

const sidebarSectionButtonVariants = cva(
  "px-2 py-1 w-fit rounded hover:bg-muted/20 hover:text-muted-foreground",
  {
    variants: {
      active: {
        true: "bg-muted ",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export function SidebarSection({
  sections,
  className,
  active,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  sections: { title: string; href: string }[];
  active?: boolean;
}) {
  const pathname = usePathname();

  if (!sections) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-2 transition-colors duration-300 pt-2",
        className,
      )}
      {...props}
    >
      {sections.map((section) => (
        <Link
          className={cn(
            sidebarSectionButtonVariants({ active: pathname === section.href }),
            className,
          )}
          key={section.title}
          href={section.href}
        >
          {section.title}
        </Link>
      ))}
    </div>
  );
}
