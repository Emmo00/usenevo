import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    sepolia,
} from 'wagmi/chains';
import { http, createStorage, cookieStorage } from 'wagmi'

export const config = getDefaultConfig({
    appName: 'Nevo',
    projectId: 'project_id',
    storage: createStorage({
        storage: cookieStorage,
    }),
    chains: [
        arbitrum,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    ssr: true,
    transports: {
        [arbitrum.id]: http(),
        [sepolia.id]: http(),
    }
});
