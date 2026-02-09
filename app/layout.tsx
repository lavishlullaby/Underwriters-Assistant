import type { Metadata } from "next"
import { DM_Sans, DM_Mono } from "next/font/google"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
})

export const metadata: Metadata = {
  title: "UWA Agent - Underwriting Assistant",
  description:
    "AI-powered command center for commercial property insurance underwriting assistants.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
