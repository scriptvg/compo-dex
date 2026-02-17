"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExampleFile } from "./example-file";
import { CodeLanguage } from "./example-context";

interface FileContent {
  title: string;
  code: string;
  language: CodeLanguage;
  path?: string;
}

export function FileTabs({ files }: { files: FileContent[] }) {
  if (!files || files.length === 0) return null;

  return (
    <Tabs defaultValue={files[0].title} className="w-full">
      <TabsList
        className="justify-start gap-4 rounded-none bg-transparent px-0 mb-4"
        variant="line"
      >
        {files.map((file) => (
          <TabsTrigger
            key={file.title}
            value={file.title}
            className="text-muted-foreground data-[state=active]:text-foreground rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none! dark:data-[state=active]:bg-transparent"
          >
            {file.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map((file) => (
        <TabsContent key={file.title} value={file.title} className="mt-0">
          <ExampleFile
            code={file.code}
            language={file.language}
            title={file.title}
            isCollapse={false}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
