"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { nevoContractABI as contractABI, nevoContractAddress as contractAddress } from "@/lib/contract";
import { formatUnits } from "ethers";

export function InvoicesList() {
    const { address, isConnected } = useAccount();

    // Fetch user invoices from smart contract
    const { data: userInvoices } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getUserInvoices",
        args: address ? [address] : undefined,
    });

    // Ensure invoices are an array
    const invoices = Array.isArray(userInvoices) ? userInvoices : [];

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
                            {isConnected && invoices.length > 0 ? (
                                invoices.map((invoice, index) => (
                                    <InvoiceRow key={index} invoice={invoice} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-3 text-center text-sm text-gray-500">
                                        {isConnected ? "No invoices found." : "Connect your wallet to view invoices."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function InvoiceRow({ invoice }) {
    return (
        <tr className="border-b">
            <td className="px-4 py-3 text-sm">{invoice.id}</td>
            <td className="px-4 py-3">
                <StatusBadge status={invoice.status} />
            </td>
            <td className="px-4 py-3 text-sm">
                ${parseFloat(formatUnits(invoice.total, 18)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-sm">{invoice.client}</td>
            <td className="px-4 py-3 text-sm">{invoice.lastUpdated}</td>
            <td className="px-4 py-3 text-right">
                <InvoiceActions />
            </td>
        </tr>
    );
}

function StatusBadge({ status }) {
    let bgColor = "bg-gray-100 text-gray-800";
    if (status === "Paid") bgColor = "bg-green-100 text-green-800";
    else if (status === "Outstanding") bgColor = "bg-amber-100 text-amber-800";
    else if (status === "Overdue") bgColor = "bg-red-100 text-red-800";

    return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor}`}>{status}</span>;
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
    );
}
