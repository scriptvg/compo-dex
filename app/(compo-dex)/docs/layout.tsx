import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-84 shrink-0 border-r border-dashed lg:block">
          <div className="sticky top-12 h-[calc(100dvh-3rem)] overflow-y-auto">
            <header className=" bg-sidebar border-dashed px-4 py-2">
              <h2 className="text-lg font-semibold">Sections</h2>
            </header>

            <nav className="divide-y divide-dashed">
              <a
                href="#introduction"
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/30"
              >
                <span>Introduction</span>
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-muted/30"
              >
                Installation
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-muted/30"
              >
                Components
              </a>
            </nav>

            <header className=" bg-sidebar border-dashed px-4 py-2">
              <h2 className="text-lg font-semibold">Components</h2>
            </header>

            <nav className="divide-y divide-dashed">
              <a
                href="#introduction"
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/30"
              >
                <span>Pokemon Image</span>{" "}
                <Badge variant="secondary" className="bg-sky-500/20 text-sky-600 dark:text-sky-400">New</Badge>
              </a>
              <a
                href="#introduction"
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/30 opacity-50"
              >
                <span>Pokemon Badge</span>
                <Badge>Coming soon</Badge>
              </a>
              <a
                href="#introduction"
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/30 opacity-50"
              >
                <span>Pokemon Card</span>
                <Badge>Coming soon</Badge>
              </a>
              <a
                href="#introduction"
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/30 opacity-50"
              >
                <span>Pokemon Stats</span>
                <Badge>Coming soon</Badge>
              </a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">{children}</main>

        {/* TOC */}
        <aside className="hidden w-84 shrink-0 border-l border-dashed xl:block">
          <div className="sticky top-12 h-[calc(100dvh-3rem)] overflow-y-auto p-4">
            TOC
          </div>
        </aside>
      </div>
    </div>
  );
}
