"use client";

import { useDocsSidebar } from "./docs-sidebar";
import { DocsSidebarLink } from "./docs-sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function DocsTOC() {
  const { items, activeItem } = useDocsSidebar();

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((item) => (
        <DocsSidebarLink
          key={item.id}
          asChild
          className={cn(
            "transition-colors",
            activeItem === item.id && "bg-muted/50 text-foreground font-medium",
          )}
        >
          <Link href={`#${item.id}`}>
            <span>{item.title}</span>
          </Link>
        </DocsSidebarLink>
      ))}
    </>
  );
}
