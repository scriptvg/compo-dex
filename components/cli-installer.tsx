"use client";

import * as React from "react";
import { ExampleFileContext, type CodeLanguage } from "./example-context";
import { ExampleWrapper } from "./example-wrapper";
import { ExampleHeader, ExampleTitle, ExampleToolbar } from "./example-header";
import { ExampleCopyButton } from "./example-copy-button";
import { ExampleCode } from "./example-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CLIstallerProps = {
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  codes: {
    pnpm: string;
    npm: string;
  };
  language?: CodeLanguage;
  title?: {
    pnpm: string;
    npm: string;
  };
  showLineNumbers?: boolean;
};

export function CLInstaller({
  codes,
  language = "bash",
  title = {
    pnpm: "pnpm",
    npm: "npm",
  },
  radius = "none",
}: CLIstallerProps) {
  const [activeTab, setActiveTab] = React.useState(title.pnpm);

  const contextValue = React.useMemo(
    () => ({
      code: activeTab === title.pnpm ? codes.pnpm : codes.npm,
      language,
      title: activeTab,
      open: false,
      setOpen: () => {},
    }),
    [activeTab, codes, language, title],
  );

  return (
    <ExampleFileContext.Provider value={contextValue}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
        <ExampleWrapper radius={radius}>
          <ExampleHeader>
            <ExampleTitle>
              <TabsList
                className="bg-transparent p-0 h-fit! gap-2"
                variant="default"
              >
                <TabsTrigger className="px-1 data-[state=active]:border h-fit" value={title.pnpm}>
                  {title.pnpm}
                </TabsTrigger>
                <TabsTrigger className="px-1 data-[state=active]:border h-fit" value={title.npm}>
                  {title.npm}
                </TabsTrigger>
              </TabsList>
            </ExampleTitle>
            <ExampleToolbar>
              <ExampleCopyButton radius={radius} />
            </ExampleToolbar>
          </ExampleHeader>
          <TabsContent value={title.pnpm} className="mt-0">
            <ExampleCode
              className="min-h-8 [&_pre]:px-4 [&_pre]:py-2"
              classFallback="h-9"
            ></ExampleCode>
          </TabsContent>
          <TabsContent value={title.npm} className="mt-0">
            <ExampleCode
              className="min-h-8 [&_pre]:px-4 [&_pre]:py-2"
              classFallback="h-9"
            ></ExampleCode>
          </TabsContent>
        </ExampleWrapper>
      </Tabs>
    </ExampleFileContext.Provider>
  );
}
