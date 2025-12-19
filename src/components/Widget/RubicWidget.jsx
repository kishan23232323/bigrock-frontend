import { useEffect, useState } from "react";

export default function RubicWidget({ sessionToken }) {
    const [src, setSrc] = useState();
    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile)
            setSrc("https://new-widgets.rubic.exchange/?useLargeIframe=false&hideUnusedUI=true&hideBranding=true&theme=dark&onChainIntegratorAddress=0x12932c436664ab687f4de70d02b1ed6b2d6bb8bb&crossChainIntegratorAddress=0x12932c436664ab687f4de70d02b1ed6b2d6bb8bb&fee=0.5");
        else
            setSrc("https://new-widgets.rubic.exchange/?useLargeIframe=true&hideUnusedUI=true&hideBranding=true&theme=dark&crossChainIntegratorAddress=0x12932c436664ab687f4de70d02b1ed6b2d6bb8bb&onChainIntegratorAddress=0x12932c436664ab687f4de70d02b1ed6b2d6bb8bb&fee=0.5");
    }, []);

    useEffect(() => {
        const handler = (event) => {
            // SECURITY: only accept messages from Rubic widget origin(s)
            if (!event.origin.includes("rubic.exchange") && !event.origin.includes("new-widgets.rubic.exchange")) return;

            const d = event.data;
            // Log once to inspect shape
            console.log("Rubic message:", d);

            // common shapes: { type: 'swapConfirmed', payload: { txHash, from, to, chainId } }
            const txHash = d?.payload?.txHash || d?.txHash || d?.tx;
            const from = d?.payload?.from || d?.from;

            if (txHash) {
                // send to backend for authoritative verification & counting
                // axios.post("/api/swap-event", { txHash, from }, {
                //     headers: { Authorization: `Bearer ${sessionToken}` }
                // }).catch(err => console.error("swap-event error", err));
                console.log("Rubic swap event:", { txHash, from });
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [sessionToken]);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
                width="700"
                height="460"
                style={{ border: "none", borderRadius: 12, maxWidth: "100%" }}
                src={src} />
        </div>
        // &crossChainIntegratorAddress=0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c&onChainIntegratorAddress=0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c&fee=0.1&feeTarget=0xYourWallet
    );
}

