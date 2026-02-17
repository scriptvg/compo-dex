import { components } from "@/content/docs/components/components";
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = components.find((c) => c.slug === slug);
  const entry = registry[slug];

  if (!component || !entry) {
    notFound();
  }

  const currentIndex = components.findIndex((c) => c.slug === slug);
  const prevComponent = components[currentIndex - 1];
  const nextComponent = components[currentIndex + 1];

  return (
    <DocsPage>
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
      <DocsSection>
        <div className="flex items-center justify-center">
          <ExampleComponent
            title={entry.title}
            collapsible
            code={entry.code}
            language="tsx"
          >
            {entry.example}
          </ExampleComponent>
        </div>
      </DocsSection>
    </DocsPage>
  );
}
