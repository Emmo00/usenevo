import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    arbitrumSepolia
} from 'wagmi/chains';
import { http, createStorage, cookieStorage } from 'wagmi'

const chain = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? arbitrum : arbitrumSepolia;

export const config = getDefaultConfig({
    appName: 'Nevo',
    projectId: 'project_id',
    storage: createStorage({
        storage: cookieStorage,
    }),
    chains: [
        chain,
    ],
    ssr: true,
    transports: {
        [arbitrum.id]: http(),
        [arbitrumSepolia.id]: http(),
    }
});
