import { CLInstaller } from "@/components/cli-installer";
import {
  Docs,
  DocsDescription,
  DocsHeader,
  DocsNav,
  DocsNavNext,
  DocsNavPrevious,
  DocsPage,
  DocsSection,
  DocsTitle,
} from "@/components/docs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <DocsPage>
      <DocsHeader>
        <div className="flex items-center justify-between">
          <DocsTitle variant="h1">Installation</DocsTitle>
          <DocsNav>
            <DocsNavPrevious href="/docs" tooltip="Introduction" />
            <DocsNavNext href="/docs/components" tooltip="Components" />
          </DocsNav>
        </div>

        <DocsDescription className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
          Learn how to install and configure compo/dex components in your
          project.
        </DocsDescription>
      </DocsHeader>

      {/* Getting Started */}
      <DocsSection id="getting-started" title="Getting Started">
        <Alert className="bg-green-500/10 border-green-700/40 dark:bg-green-500/10 dark:border-green-700/40">
          <AlertTitle>Don’t have a project yet?</AlertTitle>
          <AlertDescription>
            Use{" "}
            <Link
              href="https://ui.shadcn.com/create"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 font-medium"
            >
              shadcn/create
            </Link>{" "}
            to scaffold a complete app with themes, components, and presets.
            Works with Next.js, Vite, and TanStack Start.
          </AlertDescription>
        </Alert>
      </DocsSection>

      {/* Prerequisites */}
      <DocsSection id="prerequisites" title="Prerequisites">
        <DocsTitle variant="h2">Prerequisites</DocsTitle>

        <DocsDescription>
          Before installing compo/dex, ensure your environment meets the
          following requirements:
        </DocsDescription>
        <DocsDescription asChild>
          <ul className="list-disc my-6 ml-6 space-y-2">
            <li>
              <Badge variant="secondary">Node.js</Badge> version 18 or higher
            </li>
            <li>
              A <Badge variant="secondary">React</Badge> project configured with{" "}
              <Badge variant="secondary">TypeScript</Badge>
            </li>
            <li>
              <Badge variant="secondary">shadcn/ui</Badge> initialized in your
              project (CSS Variables mode).
            </li>
          </ul>
        </DocsDescription>

        <div className="flex flex-col gap-4">
          <Alert className="border-orange-500 bg-orange-500/20 dark:border-orange-500/40 dark:bg-orange-500/10">
            <AlertTriangle className="size-4 text-orange-500 dark:text-orange-400" />
            <AlertTitle>shadcn/ui is required</AlertTitle>
            <AlertDescription>
              Make sure you have completed the official shadcn/ui setup before
              installing compo/dex. Tailwind CSS and base components must be
              properly configured.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-500 bg-blue-500/20 dark:border-blue-500/40 dark:bg-blue-500/10">
            <Info className="size-4 text-blue-500 dark:text-blue-400" />
            <AlertTitle>CSS Variables mode only</AlertTitle>
            <AlertDescription>
              compo/dex currently supports only the CSS Variables version of{" "}
              <Badge variant="secondary">shadcn/ui</Badge>.
            </AlertDescription>
          </Alert>
        </div>
      </DocsSection>

      {/* Registry Configuration */}
      <DocsSection id="registry-configuration" title="Registry Configuration">
        <DocsTitle variant="h2">Registry Configuration</DocsTitle>
        <DocsDescription>
          To use the shorthand installation commands like{" "}
          <Badge variant="secondary">@compodex/component-name</Badge>, you need
          to add the compo/dex registry to your{" "}
          <Badge variant="secondary">components.json</Badge> file.
        </DocsDescription>
        <div className="my-6 rounded-md bg-zinc-950 p-4 dark:bg-zinc-900 border border-border">
          <pre className="text-sm text-zinc-50 overflow-x-auto">
            <code>
              {`{
  "registries": {
    "@compodex": "https://compodex.netlify.app/r/{name}.json"
  }
}`}
            </code>
          </pre>
        </div>
      </DocsSection>

      {/* Installation */}
      <DocsSection id="installation-cli" title="Installation">
        <DocsTitle variant="h2">Installation</DocsTitle>

        <DocsDescription>
          Install compo/dex components using the CLI. You can use the full URL
          or the shorthand if you have configured the registry.
          <br />
          <br />
          For example, to install the{" "}
          <Badge variant="secondary">PokemonImage</Badge> component:
        </DocsDescription>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">
              Using Shorthand (Recommended)
            </h4>
            <CLInstaller
              codes={{
                npm: "npx shadcn@latest add @compodex/pokemon-image",
                pnpm: "pnpm dlx shadcn@latest add @compodex/pokemon-image",
              }}
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Using Direct URL</h4>
            <CLInstaller
              codes={{
                npm: "npx shadcn@latest add https://compodex.netlify.app/r/pokemon-image.json",
                pnpm: "pnpm dlx shadcn@latest add https://compodex.netlify.app/r/pokemon-image.json",
              }}
            />
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  );
}
