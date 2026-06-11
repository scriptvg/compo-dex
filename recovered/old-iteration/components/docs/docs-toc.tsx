"use client";

import { useDocsSidebar } from "./docs-sidebar";
import { DocsSidebarLink } from "./docs-sidebar";
import { Scrollspy } from "@/components/reui/scrollspy";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

export function DocsTOC() {
  const { items, activeId, setActiveId } = useDocsSidebar();

  // Use a stable ref for document - only initialize once
  const documentRef = useRef<Document | null>(null);
  if (documentRef.current === null && typeof document !== "undefined") {
    documentRef.current = document;
  }

  // Memoize the callback to prevent re-renders
  const handleUpdate = useCallback(
    (id: string) => {
      setActiveId(id);
    },
    [setActiveId],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <Scrollspy
      targetRef={documentRef as any}
      onUpdate={handleUpdate}
      offset={100}
      smooth={true}
      history={false}
    >
      {items.map((item) => (
        <DocsSidebarLink
          key={item.id}
          asChild
          className={cn(
            "transition-colors",
            activeId === item.id && "bg-muted/30 text-foreground font-medium",
            item.level === 3 && "pl-8 text-sm",
            item.level === 4 && "pl-12 text-sm",
          )}
        >
          <Link href={`#${item.id}`} data-scrollspy-anchor={item.id}>
            <span>{item.title}</span>
          </Link>
        </DocsSidebarLink>
      ))}
    </Scrollspy>
  );
}
