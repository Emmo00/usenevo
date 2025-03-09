
import "@rainbow-me/rainbowkit/styles.css";
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Providers from "../../providers";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nevo - Web3 Invoicing Platform",
  description: "Create and manage crypto invoices for creators and freelancers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookie={cookie}>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
