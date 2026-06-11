import { components } from "@/content/docs/components/components";
import { registry } from "@/content/docs/components/register";
import {
  DocsDescription,
  DocsHeader,
  DocsNav,
  DocsNavNext,
  DocsNavPrevious,
  DocsTitle,
} from "@/components/docs";

export function ComponentDocOverviewHeader({ slug }: { slug: string }) {
  const entry = registry[slug];
  if (!entry) {
    return null;
  }

  const currentIndex = components.findIndex((c) => c.slug === slug);
  const prevComponent = components[currentIndex - 1];
  const nextComponent = components[currentIndex + 1];

  return (
    <DocsHeader>
      <div className="flex items-center justify-between">
        <DocsTitle>{entry.title}</DocsTitle>
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
        {entry.description}
      </DocsDescription>
    </DocsHeader>
  );
}
