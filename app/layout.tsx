import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "Compodex — Pokémon-themed component library",
    template: "%s — Compodex",
  },
  description:
    "Compodex is a showcase and documentation site for a Pokémon-themed React component library built with Next.js, shadcn/ui and Tailwind CSS.",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster
              richColors
              toastOptions={{
                style: {
                  borderRadius: "0",
                  padding: "0.5rem 1rem",
                  margin: "0",
                },
              }}
            />
          </TooltipProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}
