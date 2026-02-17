"use client";

import * as React from "react";
import { useState } from "react";
import { ExampleFileContext, type CodeLanguage } from "./example-context";
import { ExampleWrapper } from "./example-wrapper";
import { ExamplePreview, Example, ExampleBadge } from "./example-preview";
import {
  ExampleCode,
  ExampleShowCodeButton,
  ExampleCodeOverlay,
} from "./example-code";
import { Separator } from "@/components/ui/separator";
import { ExampleCopyButton } from "./example-copy-button";
import { cn } from "@/lib/utils";

export function ExampleComponent({
  isOpen,
  radius = "none",
  code,
  language,
  title,
  collapsible = true,
  showLineNumbers = true,
  hideScrollbar = false,
  highlightLines,
  children,
}: {
  isOpen?: boolean;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  code: string;
  language: CodeLanguage;
  collapsible?: boolean;
  title?: string;
  showLineNumbers?: boolean;
  hideScrollbar?: boolean;
  highlightLines?: number[] | string;
}) {
  const [open, setOpen] = useState(isOpen ?? false);

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      code,
      language,
      title,
      showLineNumbers,
      collapsible,
    }),
    [open, code, language, title, showLineNumbers, collapsible],
  );

  return (
    <ExampleFileContext.Provider value={contextValue}>
      <ExampleWrapper radius={radius}>
        <ExamplePreview>
          <Example>{children}</Example>
          <ExampleBadge>{title}</ExampleBadge>
        </ExamplePreview>

        <ExampleCode
          highlightLines={highlightLines}
          toolbar={
            <>
              {open && <ExampleShowCodeButton radius={radius} />}
              {open && <Separator orientation="vertical" />}
              <ExampleCopyButton radius={radius} />
            </>
          }
          showLineNumbers={showLineNumbers}
          hideScrollbar={hideScrollbar}
        >
          <ExampleCodeOverlay>
            <ExampleShowCodeButton variant="outline" radius={radius} />
          </ExampleCodeOverlay>
        </ExampleCode>
      </ExampleWrapper>
    </ExampleFileContext.Provider>
  );
}
