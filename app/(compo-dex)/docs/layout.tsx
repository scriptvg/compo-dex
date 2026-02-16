import { SiteHeader } from "@/components/site-header";

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
                className="block px-4 py-2 hover:bg-accent/50"
              >
                Introduction
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-accent/50"
              >
                Installation
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-accent/50"
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
                className="block px-4 py-2 hover:bg-accent/50"
              >
                Pokemon Image
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-accent/50"
              >
                Pokemon Badge
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-accent/50"
              >
                Pokemon Card
              </a>
              <a
                href="#introduction"
                className="block px-4 py-2 hover:bg-accent/50"
              >
                Pokemon Stats
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
