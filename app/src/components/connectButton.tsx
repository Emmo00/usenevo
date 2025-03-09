"use client";

import { useEffect, useRef } from "react";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

export const ConnectBtn = () => {
    const { isConnecting, address, isConnected, chain } = useAccount();
    const { color: backgroundColor, emoji } = emojiAvatarForAddress(
        address ?? ""
    );

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { disconnect } = useDisconnect();

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    if (!isConnected) {
        return (
            <Button variant="outline" size="sm" className="gap-2"
                onClick={async () => {
                    // Disconnecting wallet first because sometimes when is connected but the user is not connected
                    if (isConnected) {
                        disconnect();
                    }
                    openConnectModal?.();
                }}
                disabled={isConnecting}
            >
                <Wallet className="h-4 w-4" /> {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
        );
    }

    if (isConnected && !chain) {
        return (
            <button className="btn" onClick={openChainModal}>
                Switch Network to Arbitrum
            </button>
        );
    }

    return (
        <div className="max-w-5xl w-full flex items-center justify-between">
            <div
                className="flex justify-center items-center px-4 py-2 border border-neutral-700 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
                onClick={async () => openAccountModal?.()}
            >
                <div
                    role="button"
                    tabIndex={1}
                    className="h- w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{
                        backgroundColor,
                        boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
                    }}
                >
                    {emoji}
                </div>
                <p>Account</p>
            </div>
        </div>
    );
};