import type React from "react"
interface DashboardShellProps {
    children: React.ReactNode
}

import NevoLogo from "@/components/logos/nevo"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { ConnectBtn } from "../connectButton"

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Navigation */}
            <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <NevoLogo className="h-8 w-8" />
                    <span className="text-xl font-bold">Nevo</span>
                </Link>
                <nav className="md:flex items-center gap-6">
                    <ConnectBtn />
                </nav>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="mx-auto w-[90%] md:w-[60%] max-w-6xl space-y-6">{children}</div>
            </main>
        </div>
    )
}
