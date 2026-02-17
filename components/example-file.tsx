"use client";

import * as React from "react";
import { useState } from "react";
import { ExampleFileContext, type CodeLanguage } from "./example-context";
import { ExampleWrapper } from "./example-wrapper";
import { ExampleHeader, ExampleTitle, ExampleToolbar } from "./example-header";
import { Separator } from "@/components/ui/separator";
import {
  ExampleShowCodeButton,
  ExampleCode,
  ExampleCodeOverlay,
} from "./example-code";
import { ExampleCopyButton } from "./example-copy-button";

export type ExampleFileProps = React.ComponentProps<"div"> & {
  code?: string;
  path?: string;
  language: CodeLanguage;
  isCollapse?: boolean;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[] | string;
  hideScrollbar?: boolean;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
};

export function ExampleFile({
  code,
  language,
  title,
  isCollapse = true,
  showLineNumbers = true,
  hideScrollbar = false,
  highlightLines,
  radius = "none",
}: ExampleFileProps) {
  const [open, setOpen] = useState(false);

  return (
    <ExampleFileContext.Provider
      value={{
        open,
        setOpen,
        code: code ?? "",
        language,
        title,
        showLineNumbers,
        collapsible: isCollapse,
      }}
    >
      <ExampleWrapper radius={radius}>
        <ExampleHeader>
          <ExampleTitle>
            {title}.{language}
          </ExampleTitle>
          <ExampleToolbar>
            {isCollapse && <ExampleShowCodeButton radius={radius} />}
            {isCollapse && <Separator orientation="vertical" />}
            <ExampleCopyButton radius={radius} />
          </ExampleToolbar>
        </ExampleHeader>

        <ExampleCode
          classNameBlock=""
          highlightLines={highlightLines}
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
