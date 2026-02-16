import { SiteHeader } from "@/components/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="overflow-hidden border-x border-dashed min-h-screen max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}
