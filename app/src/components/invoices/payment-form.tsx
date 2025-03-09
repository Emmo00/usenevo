"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PaymentFormProps {
    amount: number
    invoiceId: string
    onPaymentComplete: (status: "success" | "error") => void
}

export function PaymentForm({ amount, invoiceId, onPaymentComplete }: PaymentFormProps) {
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [walletInfo, setWalletInfo] = useState({
        address: "0x1234...5678", // This would be fetched from the connected wallet
        balance: 5000, // This would be fetched from the blockchain
        network: "Arbitrum One",
    })

    // This is a mock implementation - in a real app, you would use ethers.js or similar
    const processPayment = async () => {
        setIsProcessing(true)
        setError(null)

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // In a real app, you would:
            // 1. Check if the user has enough USDC balance
            // 2. Create and sign a transaction to transfer USDC to the recipient
            // 3. Wait for the transaction to be confirmed
            // 4. Update the invoice status in your database

            // For demo purposes, we'll simulate a successful payment
            const success = Math.random() > 0.2 // 80% chance of success

            if (success) {
                onPaymentComplete("success")
            } else {
                throw new Error("Transaction failed. Please try again.")
            }
        } catch (err: any) {
            console.error("Payment error:", err)
            setError(err.message || "An error occurred while processing your payment")
            onPaymentComplete("error")
        } finally {
            setIsProcessing(false)
        }
    }

    // Check if user has sufficient balance
    const hasSufficientBalance = walletInfo.balance >= amount

    return (
        <div className="space-y-4">
            {/* Connected Wallet Info */}
            <Card className="p-4 bg-muted/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <p className="text-sm font-medium">Connected Wallet</p>
                        <p className="text-sm text-muted-foreground">{walletInfo.address}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Network</p>
                        <p className="text-sm text-muted-foreground">{walletInfo.network}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">USDC Balance</p>
                        <p className="text-sm font-semibold">{walletInfo.balance.toFixed(2)} USDC</p>
                    </div>
                </div>
            </Card>

            {/* Payment Summary */}
            <div className="py-2">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Invoice Amount</span>
                    <span className="font-medium">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Network Fee (estimated)</span>
                    <span className="text-sm">~$0.10</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${(amount + 0.1).toFixed(2)}</span>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Insufficient Balance Warning */}
            {!hasSufficientBalance && (
                <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Your wallet doesn't have enough USDC. Please add funds before proceeding.</AlertDescription>
                </Alert>
            )}

            {/* Payment Button */}
            <Button onClick={processPayment} disabled={isProcessing || !hasSufficientBalance} className="w-full" size="lg">
                {isProcessing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Pay {amount.toFixed(2)} USDC
                    </>
                )}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-2">
                By clicking "Pay", you authorize Nevo to process this payment using the USDC in your connected wallet.
            </p>
        </div>
    )
}
