import { components } from "@/content/docs/components/components";
import { CLInstaller } from "@/components/cli-installer";
import { registry } from "@/content/docs/components/register";
import {
  DocsDescription,
  DocsHeader,
  DocsNav,
  DocsNavNext,
  DocsNavPrevious,
  DocsPage,
  DocsSection,
  DocsTitle,
} from "@/components/docs";
import { ExampleComponent } from "@/components/example-component";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ManualSteps } from "@/components/manual-steps";
import { getSourceCode } from "@/lib/source-code";
import { FileTabs } from "@/components/file-tabs";
import * as React from "react";
import { cloneElement, isValidElement } from "react";

async function resolvePathsInJSX(
  element: React.ReactNode,
): Promise<React.ReactNode> {
  if (!isValidElement(element)) {
    if (Array.isArray(element)) {
      return Promise.all(element.map(resolvePathsInJSX));
    }
    return element;
  }

  const { props, type } = element as any;
  let newProps = { ...props };

  // If this element has a 'path' prop and we suspect it needs source code
  // We can be specific: check if it's ExampleFile or similar.
  if (props && props.path && !props.code) {
    const code = await getSourceCode(props.path);
    newProps.code = code;
  }

  // Recursively resolve children if any
  if (props && props.children) {
    newProps.children = await resolvePathsInJSX(props.children);
  }

  return cloneElement(element as any, newProps);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = components.find((c) => c.slug === slug);
  const entry = registry[slug];

  if (!component || !entry || !entry.examples) {
    notFound();
  }

  // Fetch true source code from FS
  const overviewCode = entry.overview.path
    ? await getSourceCode(entry.overview.path)
    : entry.overview.code;

  const files = entry.files
    ? await Promise.all(
        entry.files.map(async (file) => ({
          ...file,
          code: await getSourceCode(file.path),
        })),
      )
    : [];

  const manualSteps = await Promise.all(
    entry.manualSteps.map(async (step) => {
      return {
        ...step,
        description: await resolvePathsInJSX(step.description),
        content: await resolvePathsInJSX(step.content),
      };
    }),
  );

  const currentIndex = components.findIndex((c) => c.slug === slug);
  const prevComponent = components[currentIndex - 1];
  const nextComponent = components[currentIndex + 1];

  return (
    <DocsPage>
      <DocsSection id="overview" title="Overview">
        <DocsHeader>
          <div className="flex items-center justify-between">
            <DocsTitle>{component.title}</DocsTitle>
            <DocsNav>
              {prevComponent && (
                <DocsNavPrevious
                  href={prevComponent.url}
                  tooltip={prevComponent.title}
                />
              )}
              {nextComponent && (
                <DocsNavNext
                  href={nextComponent.url}
                  tooltip={nextComponent.title}
                />
              )}
            </DocsNav>
          </div>
          <DocsDescription className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
            {component.description}
          </DocsDescription>
        </DocsHeader>

        <ExampleComponent
          title={entry.overview.filename}
          code={overviewCode}
          language="tsx"
        >
          {entry.overview.example}
        </ExampleComponent>
      </DocsSection>
      <DocsSection id="installation" title="Installation">
        <DocsHeader>
          <DocsTitle variant="h2">Installation</DocsTitle>
        </DocsHeader>
        <Tabs className="relative mt-6 w-full" defaultValue="command">
          <TabsList
            className="justify-start gap-4 rounded-none bg-transparent px-0"
            variant="line"
          >
            <TabsTrigger value="command">Command</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="command">
            <CLInstaller
              codes={{
                npm: `npx shadcn@latest add @compodex/${slug}`,
                pnpm: `pnpm dlx shadcn@latest add @compodex/${slug}`,
              }}
            />
          </TabsContent>
          <TabsContent value="manual">
            <ManualSteps steps={manualSteps} />
          </TabsContent>
        </Tabs>
      </DocsSection>

      <DocsSection>
        <DocsTitle variant="h2">Usage</DocsTitle>
      </DocsSection>

      <DocsSection>
        <DocsTitle variant="h2">Examples</DocsTitle>

        {entry.examples.map((example) => (
          <DocsSection
            key={example.id}
            id={example.id}
            title={example.title as string}
          >
            <DocsHeader>
              <DocsTitle variant="h3">{example.title}</DocsTitle>
              <DocsDescription>{example.description}</DocsDescription>
            </DocsHeader>
            <ExampleComponent
              title={example.filename}
              code={example.code}
              language="tsx"
            >
              {example.example}
            </ExampleComponent>
          </DocsSection>
        ))}
      </DocsSection>
    </DocsPage>
  );
}
