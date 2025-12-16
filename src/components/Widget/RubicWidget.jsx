// export default function RubicWidget() {
//     return (
//         <div
//             style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 padding: "20px",
//             }}
//         >
//             <iframe
//                 width="700"
//                 height="652"
//                 style={{
//                     border: "none",
//                     borderRadius: "12px",
//                     maxWidth: "100%",
//                 }}
//                 src="https://new-widgets.rubic.exchange/?useLargeIframe=true&hideUnusedUI=true&hideBranding=true"
//             />
//         </div>
//     );
// }

// RubicIframeListener.jsx
import { useEffect } from "react";
import axios from "axios";

export default function RubicWidget({ sessionToken }) {
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
                src="https://new-widgets.rubic.exchange/?useLargeIframe=true&hideUnusedUI=true&hideBranding=true&theme=dark&crossChainIntegratorAddress=0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c&onChainIntegratorAddress=0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c&fee=0.5"
            />
        </div>
        // &crossChainIntegratorAddress=0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c&onChainIntegratorAddress=0x1e9E2B1Ef6c69169DFb1dB75F216CA174BC3e95c&fee=0.1&feeTarget=0xYourWallet
    );
}

