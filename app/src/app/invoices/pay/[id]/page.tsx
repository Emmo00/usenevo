"use client"

import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Shield, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ConnectBtn as ConnectWalletButton } from "@/components/connectButton"
import { PaymentForm } from "@/components/invoices/payment-form"
import { formatDate } from "@/lib/utils"

// Mock invoice data - in a real app, this would be fetched from an API
const getInvoiceData = (id: string) => {
    return {
        id: id || "NEVO-0001",
        title: "Website Development - March",
        amount: 3000,
        dueDate: new Date(2025, 2, 15),
        client: "TechNova Innovations Inc.",
        status: "Outstanding",
    }
}

export default function InvoicePaymentPage() {
    const params = useParams();
    const searchParams = useSearchParams()
    const [isConnected, setIsConnected] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

    // Get invoice data - in a real app, this would be fetched from an API
    const invoice = typeof params.id == 'string' ? getInvoiceData(params.id) : getInvoiceData("NEVO-0001")

    // Get amount from URL params or use default from invoice
    const amountParam = searchParams.get("amount")
    const amount = amountParam ? Number.parseFloat(amountParam) : invoice.amount

    // Handle wallet connection
    const handleWalletConnect = (connected: boolean) => {
        setIsConnected(connected)
    }

    // Handle payment completion
    const handlePaymentComplete = (status: "success" | "error") => {
        setPaymentStatus(status)

        // In a real app, you would update the invoice status in your database
        if (status === "success") {
            // Simulate API call delay
            setTimeout(() => {
                // Redirect or show success message
            }, 2000)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <path d="M4 4h16v16H4z" />
                                <path d="M4 4 L20 20" />
                                <path d="M4 20 L20 4" />
                            </svg>
                            <span className="text-lg font-bold">Nevo</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Secure Payment Portal</div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Return to Invoice
                </Link>

                <h1 className="text-3xl font-bold mb-6">Invoice Payment</h1>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content - Invoice Details and Payment */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Invoice Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Details</CardTitle>
                                <CardDescription>Review your invoice information before payment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Invoice ID</p>
                                        <p className="text-lg font-semibold">{invoice.id}</p>
                                    </div>
                                    <div className="md:text-right">
                                        <p className="text-sm font-medium text-muted-foreground">Amount Due</p>
                                        <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">≈ {amount} USDC</p>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                        <p>{formatDate(invoice.dueDate)}</p>
                                    </div>
                                    <div className="md:text-right">
                                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                                        <p className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-medium text-amber-800">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {invoice.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-sm font-medium text-muted-foreground">Client</p>
                                    <p>{invoice.client}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pay with USDC on Arbitrum</CardTitle>
                                <CardDescription>Connect your wallet to pay this invoice with USDC stablecoin</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {paymentStatus === "success" ? (
                                    <div className="flex flex-col items-center justify-center py-6 text-center">
                                        <div className="rounded-full bg-green-100 p-3 mb-4">
                                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Your payment of ${amount.toFixed(2)} has been processed successfully.
                                        </p>
                                        <Link href="/dashboard">
                                            <Button>Return to Dashboard</Button>
                                        </Link>
                                    </div>
                                ) : paymentStatus === "error" ? (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Payment Failed</AlertTitle>
                                        <AlertDescription>
                                            There was an error processing your payment. Please try again or contact support.
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <>
                                        {!isConnected ? (
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <p className="text-center mb-4 text-muted-foreground">
                                                    Connect your wallet to pay this invoice with USDC on Arbitrum
                                                </p>
                                                <ConnectWalletButton />
                                            </div>
                                        ) : (
                                            <PaymentForm amount={amount} invoiceId={invoice.id} onPaymentComplete={handlePaymentComplete} />
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Help and Information */}
                    <div className="space-y-6">
                        <Tabs defaultValue="security">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="security">Security Tips</TabsTrigger>
                                <TabsTrigger value="usdc">Get USDC</TabsTrigger>
                            </TabsList>

                            {/* Security Tips Tab */}
                            <TabsContent value="security" className="mt-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg flex items-center">
                                            <Shield className="h-5 w-5 mr-2 text-primary" />
                                            Security Tips
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm">
                                        <div>
                                            <h4 className="font-medium mb-1">Verify the Website</h4>
                                            <p className="text-muted-foreground">
                                                Ensure you're on the official Nevo website (usenevo.com) before connecting your wallet.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Check Payment Details</h4>
                                            <p className="text-muted-foreground">
                                                Double-check the invoice ID and amount before confirming any transaction.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Use Hardware Wallets</h4>
                                            <p className="text-muted-foreground">
                                                For enhanced security, consider using a hardware wallet like Ledger or Trezor.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Review Permissions</h4>
                                            <p className="text-muted-foreground">
                                                Only approve the exact amount needed for the transaction. Avoid granting unlimited allowances.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* USDC Info Tab */}
                            <TabsContent value="usdc" className="mt-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg flex items-center">
                                            <Info className="h-5 w-5 mr-2 text-primary" />
                                            How to Get Arbitrum USDC
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm">
                                        <div>
                                            <h4 className="font-medium mb-1">Option 1: Bridge from Ethereum</h4>
                                            <p className="text-muted-foreground mb-2">
                                                If you already have USDC on Ethereum, you can bridge it to Arbitrum:
                                            </p>
                                            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                                                <li>Visit the Arbitrum Bridge (bridge.arbitrum.io)</li>
                                                <li>Connect your wallet</li>
                                                <li>Select USDC as the token to bridge</li>
                                                <li>Enter the amount and confirm the transaction</li>
                                            </ol>
                                            <a
                                                href="https://bridge.arbitrum.io"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-primary hover:underline mt-2 text-xs"
                                            >
                                                Go to Arbitrum Bridge
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Option 2: Buy Directly</h4>
                                            <p className="text-muted-foreground mb-2">
                                                You can buy Arbitrum USDC directly on exchanges that support it:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                                <li>Binance</li>
                                                <li>Coinbase</li>
                                                <li>Uniswap on Arbitrum</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Verify Your Balance</h4>
                                            <p className="text-muted-foreground">
                                                After acquiring USDC, check your wallet balance on Arbitrum to ensure the funds are available
                                                before proceeding with payment.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Need Help Section */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p>If you're having trouble with your payment, please contact our support team:</p>
                                <p className="mt-2">
                                    <a href="mailto:support@usenevo.com" className="text-primary hover:underline">
                                        support@usenevo.com
                                    </a>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 border-t bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M4 4h16v16H4z" />
                                <path d="M4 4 L20 20" />
                                <path d="M4 20 L20 4" />
                            </svg>
                            <span className="text-sm font-semibold">Nevo</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} Nevo. All rights reserved. Powered by Arbitrum.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
