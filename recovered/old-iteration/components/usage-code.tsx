"use client";

import { ExampleCode } from "./example-code";
import { ExampleFileContext, type CodeLanguage } from "./example-context";
import { ExampleWrapper } from "./example-wrapper";
import { ExampleCopyButton } from "./example-copy-button";
/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type CodeSnippet = {
  code: string;
  language?: CodeLanguage;
};

interface UsageCodeProps {
  importCode?: CodeSnippet;
  usageCode?: CodeSnippet;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  highlightLines?: number[] | string;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function UsageCode({
  importCode,
  usageCode,
  radius = "none",
  highlightLines,
}: UsageCodeProps) {
  if (!importCode && !usageCode) return null;

  return (
    <ExampleFileContext.Provider
      value={{
        code: importCode?.code as string,
        language: importCode?.language ?? "tsx",
        title: "Import",
        open: true,
        setOpen: () => {},
        showLineNumbers: false,
        collapsible: false,
      }}
    >
      {importCode && (
        <ExampleWrapper radius={radius}>
          <ExampleCode
            toolbar={<ExampleCopyButton radius={radius} />}
            className="h-fit [&_pre]:p-3"
            classFallback="h-12"
            classNameBlock=""
            highlightLines={highlightLines}
            radius="none"
          />
        </ExampleWrapper>
      )}

      {usageCode && (
        <ExampleFileContext.Provider
          value={{
            code: usageCode.code,
            language: usageCode.language ?? "tsx",
            title: "Usage",
            open: true,
            setOpen: () => {},
            showLineNumbers: false,
            collapsible: false,
          }}
        >
          <ExampleWrapper radius={radius}>
            <ExampleCode
              toolbar={<ExampleCopyButton radius={radius} />}
              highlightLines={highlightLines}
              className="rounded-none [&_pre]:p-3"
              classFallback="h-40"
            />
          </ExampleWrapper>
        </ExampleFileContext.Provider>
      )}
    </ExampleFileContext.Provider>
  );
}
