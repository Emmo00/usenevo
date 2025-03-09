"use client"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data for invoices
const invoices = [
    {
        id: "NEVO-0001",
        status: "Paid",
        amount: 3000.0,
        client: "TechNova Innovations Inc.",
        lastUpdated: "Mar 04",
    },
    {
        id: "NEVO-0002",
        status: "Paid",
        amount: 2000.0,
        client: "TechNova Innovations Inc.",
        lastUpdated: "Mar 01",
    },
]

export function InvoicesList() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Recent Invoices</h2>
                <Link href="/dashboard/invoices/create">
                    <Button className="text-sm">
                        <Plus className="h-4 w-4 mr-1" /> Create Invoice
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Number</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Client</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Updated</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <InvoiceRow key={invoice.id} invoice={invoice} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function InvoiceRow({ invoice }: { invoice: any }) {
    return (
        <tr className="border-b">
            <td className="px-4 py-3 text-sm">{invoice.id}</td>
            <td className="px-4 py-3">
                <StatusBadge status={invoice.status} />
            </td>
            <td className="px-4 py-3 text-sm">
                ${invoice.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-sm">{invoice.client}</td>
            <td className="px-4 py-3 text-sm">{invoice.lastUpdated}</td>
            <td className="px-4 py-3 text-right">
                <InvoiceActions />
            </td>
        </tr>
    )
}

function StatusBadge({ status }: { status: string }) {
    let bgColor = "bg-gray-100 text-gray-800"

    if (status === "Paid") {
        bgColor = "bg-green-100 text-green-800"
    } else if (status === "Outstanding") {
        bgColor = "bg-amber-100 text-amber-800"
    } else if (status === "Overdue") {
        bgColor = "bg-red-100 text-red-800"
    }

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor}`}>
            {status}
        </span>
    )
}

function InvoiceActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
