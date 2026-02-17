import { createContext, useContext } from "react";
import { SiTypescript, SiJavascript, SiReact, SiGnubash } from "react-icons/si";

export type CodeLanguage =
  | "tsx"
  | "jsx"
  | "ts"
  | "js"
  | "html"
  | "css"
  | "json"
  | "bash"
  | "python"
  | "java"
  | "c"
  | "cpp"
  | "csharp"
  | "go"
  | "kotlin"
  | "php"
  | "ruby"
  | "rust"
  | "scala"
  | "swift"
  | "typescript";

export const languageIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  tsx: SiReact,
  jsx: SiReact,
  ts: SiTypescript,
  typescript: SiTypescript,
  js: SiJavascript,
  javascript: SiJavascript,
  bash: SiGnubash,
};

export type ExampleFileContextType = {
  code: string;
  language: CodeLanguage;
  title?: string;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ExampleFileContext = createContext<ExampleFileContextType | null>(
  null,
);

export function useExampleFile() {
  const context = useContext(ExampleFileContext);
  if (!context) {
    throw new Error("useExampleFile must be used within <ExampleFile />");
  }
  return context;
}
