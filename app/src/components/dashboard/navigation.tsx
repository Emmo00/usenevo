"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, PlusCircle, Settings, LogOut, User, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
    title: string
    href: string
    icon: React.ElementType
}

export function Navigation() {
    const pathname = usePathname()

    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: Home,
        },
        {
            title: "Invoices",
            href: "/invoices",
            icon: FileText,
        },
        {
            title: "Create Invoice",
            href: "/invoices/create",
            icon: PlusCircle,
        },
        {
            title: "Profile",
            href: "/profile",
            icon: User,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ]

    return (
        <nav className="grid gap-1">
            {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start gap-2", pathname === item.href && "bg-muted font-medium")}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Button>
                </Link>
            ))}

            <div className="my-2 border-t" />

            <Button variant="outline" className="w-full justify-start gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600">
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
        </nav>
    )
}
