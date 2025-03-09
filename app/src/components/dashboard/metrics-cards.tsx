"use client"

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, FileText, Clock } from "lucide-react"
import { nevoContractABI as contractABI, nevoContractAddress as contractAddress } from "@/lib/contract";
import { useAccount, useContractRead, useReadContract } from "wagmi";
import { formatUnits } from "ethers";

export function MetricsCards() {
    const { address, isConnected } = useAccount();

    // Read the total invoice count for the connected user.
    const { data: totalInvoiceData } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getUserInvoiceCount",
        args: address ? [address] : undefined,
    });

    // Read the pending invoice count for the connected user.
    const { data: pendingInvoiceData } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getUserPendingInvoiceCount",
        args: address ? [address] : undefined,
    });

    // Read all invoices for the connected user.
    const { data: userInvoices } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getUserInvoices",
        args: address ? [address] : undefined,
    });

    // Compute total revenue by summing invoice totals of paid invoices.
    // Assuming: Invoice.status is a BigNumber (0: Pending, 1: Paid, etc.)
    // and invoice.total is a BigNumber with 18 decimals.
    const totalRevenue = useMemo(() => {
        if (!userInvoices) return 0;
        return userInvoices.reduce((acc: bigint, invoice: any) => {
            // Ensure invoice.total is a bigint
            const invoiceTotal = typeof invoice.total === "bigint" ? invoice.total : BigInt(invoice.total);
            // Check if invoice status indicates it's paid (assuming "1" is paid)
            if (invoice.status?.toString() === "1") {
                return acc + invoiceTotal;
            }
            return acc;
        }, 0);
    }, [userInvoices]);

    // Format the total revenue (assumes 18 decimals for USDC, adjust if needed)
    const formattedTotalRevenue = parseFloat(formatUnits(totalRevenue, 18));

    // Convert invoice counts to numbers (assuming they're returned as BigInts or numbers)
    const totalInvoices = totalInvoiceData ? Number(totalInvoiceData) : 0;
    const outstandingInvoices = pendingInvoiceData ? Number(pendingInvoiceData) : 0;

    // Fallback metrics if not connected or data is not available.
    const metrics = {
        totalInvoices,
        outstandingInvoices,
        totalRevenue: formattedTotalRevenue,
    };

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-gray-100 p-2">
                            <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">All Invoices</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">{metrics.totalInvoices}</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                            <Clock className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Outstanding Invoices</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">{metrics.outstandingInvoices}</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-2">
                            <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="mt-3 text-2xl font-bold">
                        ${metrics.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
