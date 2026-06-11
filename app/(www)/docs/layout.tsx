import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}