import {
  DocsPage,
  DocsHeader,
  DocsTitle,
  DocsSection,
  DocsDescription,
  DocsNav,
  DocsNavPrevious,
  DocsNavNext,
} from "@/components/docs";
import Link from "next/link";
import { components } from "@/content/docs/components/components";

export default function Page() {
  return (
    <DocsPage>
      <DocsHeader>
        <div className="flex items-center justify-between">
          <DocsTitle>Components</DocsTitle>
          <DocsNav>
            <DocsNavPrevious href="/docs/installation" tooltip="Installation" />
            <DocsNavNext
              href="/docs/components/pokemon-image"
              tooltip="Pokemon Image"
            />
          </DocsNav>
        </div>
        <DocsDescription className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
          Here you can find all the components available in the library. We are
          working on adding more components.
        </DocsDescription>
      </DocsHeader>

      <DocsSection className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {components.map((component) => (
          <Link
            key={component.slug}
            href={component.url}
            className="hover:underline hover:underline-offset-4"
          >
            <DocsDescription>{component.title}</DocsDescription>
          </Link>
        ))}
      </DocsSection>
    </DocsPage>
  );
}
