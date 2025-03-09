"use client"

import { use, useState } from "react"
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { InvoiceDetailsPDF } from "@/components/invoices/invoice-details-pdfs"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { formatDate } from "@/lib/utils"

// This would normally come from an API or database
const invoiceData = {
    id: "NEVO-0001",
    title: "Website Development - March",
    client: "TechNova Innovations Inc.",
    status: "Paid",
    dueDate: new Date(2025, 2, 15),
    createdAt: new Date(2025, 2, 1),
    items: [
        {
            id: "item-1",
            description: "Homepage Redesign",
            price: 1500.0,
        },
        {
            id: "item-2",
            description: "Responsive Layout Implementation",
            price: 800.0,
        },
        {
            id: "item-3",
            description: "Content Migration",
            price: 700.0,
        },
    ],
}

export default function InvoiceDetailsPage() {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
    const params = useParams();

    // Calculate the total invoice amount
    const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.price, 0)

    // Function to determine status badge styling
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return {
                    icon: <CheckCircle2 className="h-4 w-4" />,
                    color: "text-green-700 bg-green-100",
                }
            case "Pending":
                return {
                    icon: <Clock className="h-4 w-4" />,
                    color: "text-amber-700 bg-amber-100",
                }
            case "Expired":
                return {
                    icon: <AlertCircle className="h-4 w-4" />,
                    color: "text-red-700 bg-red-100",
                }
            default:
                return {
                    icon: <Clock className="h-4 w-4" />,
                    color: "text-gray-700 bg-gray-100",
                }
        }
    }

    const statusBadge = getStatusBadge(invoiceData.status)

    return (
        <DashboardShell>
            <div className="flex flex-col space-y-6">
                {/* Back Button and Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <DashboardHeader heading="Invoice Details" text={`View details for invoice ${params.id}`} />
                    </div>

                    {/* PDF Download Button */}
                    <div className="flex items-center">
                        <PDFDownloadLink
                            document={<InvoiceDetailsPDF invoice={invoiceData} total={totalAmount} />}
                            fileName={`${invoiceData.id}.pdf`}
                            className="hidden md:inline-flex"
                        >
                            {({ loading }) => (
                                <Button disabled={loading} className="md:w-auto">
                                    <Download className="mr-2 h-4 w-4" />
                                    {loading ? "Generating PDF..." : "Download as PDF"}
                                </Button>
                            )}
                        </PDFDownloadLink>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-6">
                    {/* Invoice Summary Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Invoice ID</h3>
                                    <p className="text-xl font-semibold">{invoiceData.id}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                                    <div className="flex items-center mt-1 md:justify-end">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
                                        >
                                            {statusBadge.icon}
                                            <span className="ml-1">{invoiceData.status}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Invoice Title</h3>
                                    <p className="text-lg">{invoiceData.title}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                                    <p className="text-lg">{invoiceData.client}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Created Date</h3>
                                    <p>{formatDate(invoiceData.createdAt)}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                                    <p>{formatDate(invoiceData.dueDate)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Invoice Items Card */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Invoice Items</h3>
                            <div className="border rounded-md">
                                <div className="hidden md:grid md:grid-cols-12 bg-muted/50 px-4 py-3 rounded-t-md">
                                    <div className="col-span-6 text-sm font-medium text-muted-foreground">Description</div>
                                    <div className="col-span-6 text-right text-sm font-medium text-muted-foreground">Amount</div>
                                </div>
                                <div className="divide-y">
                                    {invoiceData.items.map((item) => (
                                        <div key={item.id} className="grid md:grid-cols-12 px-4 py-4">
                                            <div className="col-span-6">
                                                <p className="md:hidden text-sm font-medium text-muted-foreground mb-1">Description</p>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="col-span-6 md:text-right mt-2 md:mt-0">
                                                <p className="md:hidden text-sm font-medium text-muted-foreground mb-1">Amount</p>
                                                <p>${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center bg-muted/20 px-4 py-4 rounded-b-md border-t">
                                    <div className="font-medium">Total</div>
                                    <div className="text-xl font-bold">${totalAmount.toFixed(2)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mobile PDF Download Button */}
                    <div className="md:hidden">
                        <PDFDownloadLink
                            document={<InvoiceDetailsPDF invoice={invoiceData} total={totalAmount} />}
                            fileName={`${invoiceData.id}.pdf`}
                            className="w-full"
                        >
                            {({ loading }) => (
                                <Button disabled={loading} className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    {loading ? "Generating..." : "Download as PDF"}
                                </Button>
                            )}
                        </PDFDownloadLink>
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
