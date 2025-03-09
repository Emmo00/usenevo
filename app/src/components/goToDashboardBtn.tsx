"use client";

import { Button } from '@/components/ui/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

interface Props {
    children: React.ReactNode;
}
export default function ({ children }: Props) {
    const router = useRouter();
    const { isConnected, } = useAccount();
    const { openConnectModal } = useConnectModal();

    function goToDashboard() {
        // confirm that the user is connected
        if (!isConnected) {
            openConnectModal?.();
            return;
        }

        // then redirect to the dashboard
        router.push("/dashboard");
    }
    return (
        <div>
            <Button size="sm" onClick={goToDashboard}>
                {children}
            </Button>
        </div>
    );
}