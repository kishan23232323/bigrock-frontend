import { useEffect } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { bsc } from "wagmi/chains";

export default function ForceBSCOnConnect() {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    useEffect(() => {
        if (isConnected && chainId !== bsc.id) {
            switchChainAsync({ chainId: bsc.id });
        }
    }, [isConnected, chainId]);

    return null;
}
