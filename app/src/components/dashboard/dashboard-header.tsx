import type React from "react"
interface DashboardHeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
                {text && <p className="text-muted-foreground">{text}</p>}
            </div>
            {children}
        </div>
    )
}
