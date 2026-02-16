import {
  Docs,
  DocsDescription,
  DocsHeader,
  DocsPage,
  DocsSection,
  DocsTitle,
} from "@/components/docs";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <DocsPage>
      <DocsHeader>
        <DocsTitle>Introduction</DocsTitle>
        <DocsDescription
          className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]"
          size="lg"
          variant="muted"
        >
          CompoDex is a production-ready UI kit for serious Pokédex apps. It is
          built on top of shadcn/ui, designed to handle complex Pokémon data
          with speed, consistency, and full customization.
        </DocsDescription>
      </DocsHeader>

      <DocsSection>
        <DocsHeader>
          <DocsTitle variant="h2">What is compo/dex?</DocsTitle>
          <DocsDescription size="default">
            compo/dex is a component library built on top of shadcn/ui, designed
            to solve a very specific problem: rendering Pokémon data in a clean,
            scalable, and maintainable way. Whether you're building a Pokédex
            app, a team builder, or any Pokémon-related project, compo/dex
            provides the UI building blocks you need.
          </DocsDescription>
        </DocsHeader>
      </DocsSection>

      <DocsSection>
        <DocsHeader>
          <DocsTitle variant="h2">Why compo/dex?</DocsTitle>
          <DocsDescription size="default">
            Building a Pokédex seems simple at first—display some cards with
            names and images, right? But as your project grows, you quickly run
            into challenges:
          </DocsDescription>
        </DocsHeader>
        <DocsDescription asChild>
          <ul className="list-disc my-6 ml-6 space-y-2">
            <li>
              Inconsistent layouts across different views (grid, list, detail
              pages)
            </li>
            <li>
              Type system complexity with 18+ Pokémon types, each needing proper
              styling
            </li>
            <li>
              Data presentation for stats, abilities, evolutions, and move sets
            </li>
            <li>Responsive design that works on mobile and desktop</li>
            <li>Accessibility for screen readers and keyboard navigation</li>
          </ul>
        </DocsDescription>
        <DocsDescription>
          compo/dex solves these problems by providing pre-built, composable
          components specifically designed for Pokémon data. Instead of
          reinventing type badges, stat bars, or card layouts for every project,
          you get battle-tested components that handle the complexity for you.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsHeader>
          <DocsTitle variant="h2">Who is this for?</DocsTitle>
          <DocsDescription size="default">
            compo/dex is for anyone building Pokémon-related applications who
            wants to save time and ensure consistent, high-quality UI. Whether
            you're:
          </DocsDescription>
        </DocsHeader>
        <DocsDescription asChild>
          <ul className="list-disc my-6 ml-6 space-y-2">
            <li>
              Pokémon app developers who want to focus on features, not UI
              boilerplate
            </li>
            <li>
              Learning projects where you want production-quality components
              without the complexity
            </li>
            <li>
              Portfolio projects that need polished, accessible interfaces
            </li>
            <li>Hackathons where speed matters but quality can't suffer</li>
          </ul>
        </DocsDescription>
        <DocsDescription>
          If you're building anything Pokémon-related in React, compo/dex gets
          you from zero to production-ready UI in minutes, not hours.
        </DocsDescription>
      </DocsSection>
      <DocsSection id="philosophy" title="Philosophy">
        <DocsHeader>
          <DocsTitle variant="h2">Philosophy</DocsTitle>
          <DocsDescription>compo/dex follows these principles:</DocsDescription>
        </DocsHeader>
        <DocsDescription asChild>
          <ul className="list-disc my-6 ml-6 space-y-2">
            <li>
              <Badge variant="secondary">Pokémon-first design:</Badge>{" "}
              Components understand Pokémon data structures out of the box
            </li>
            <li>
              <Badge variant="secondary">Composability:</Badge> Mix and match
              components to build any layout you need
            </li>
            <li>
              <Badge variant="secondary">Accessibility:</Badge> Semantic HTML,
              ARIA labels, and keyboard navigation built-in
            </li>
            <li>
              <Badge variant="secondary">Type safety:</Badge> Full TypeScript
              support with proper type inference for Pokémon data
            </li>
            <li>
              <Badge variant="secondary">Customizable:</Badge> Like shadcn/ui,
              you copy the components and own them—modify anything
            </li>
          </ul>
        </DocsDescription>
      </DocsSection>
    </DocsPage>
  );
}
