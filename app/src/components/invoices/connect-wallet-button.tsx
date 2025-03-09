"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Loader2 } from "lucide-react"

interface ConnectWalletButtonProps {
    onConnect: (connected: boolean) => void
}

export function ConnectWalletButton({ onConnect }: ConnectWalletButtonProps) {
    const [isConnecting, setIsConnecting] = useState(false)

    // This is a mock implementation - in a real app, you would use a library like wagmi or web3-react
    const connectWallet = async () => {
        setIsConnecting(true)

        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== "undefined") {
                // Request account access
                await window.ethereum.request({ method: "eth_requestAccounts" })

                // Check if we're on the correct network (Arbitrum)
                const chainId = await window.ethereum.request({ method: "eth_chainId" })

                // Arbitrum One chainId is 0xa4b1 (42161)
                if (chainId !== "0xa4b1") {
                    // Prompt user to switch to Arbitrum
                    try {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: "0xa4b1" }],
                        })
                    } catch (switchError: any) {
                        // This error code indicates that the chain has not been added to MetaMask
                        if (switchError.code === 4902) {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: "0xa4b1",
                                        chainName: "Arbitrum One",
                                        nativeCurrency: {
                                            name: "ETH",
                                            symbol: "ETH",
                                            decimals: 18,
                                        },
                                        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                                        blockExplorerUrls: ["https://arbiscan.io/"],
                                    },
                                ],
                            })
                        }
                    }
                }

                // Successfully connected
                onConnect(true)
            } else {
                alert("Please install MetaMask to connect your wallet")
            }
        } catch (error) {
            console.error("Error connecting wallet:", error)
        } finally {
            setIsConnecting(false)
        }
    }

    return (
        <Button onClick={connectWallet} disabled={isConnecting} size="lg" className="w-full md:w-auto">
            {isConnecting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                </>
            ) : (
                <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                </>
            )}
        </Button>
    )
}

// Add TypeScript declaration for window.ethereum
declare global {
    interface Window {
        ethereum?: {
            request: (args: any) => Promise<any>
            on: (event: string, callback: (...args: any[]) => void) => void
        }
    }
}
