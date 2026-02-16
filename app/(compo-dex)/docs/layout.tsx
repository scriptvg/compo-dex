import { SiteHeader } from "@/components/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="overflow-hidden relative border-x border-dashed min-h-screen  p-4">
          {children}
        </div>

      </main>
    </>
  );
}
