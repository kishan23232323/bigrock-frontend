import { useEffect, useState } from "react";


export default function Widget() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.rubic.exchange/iframe/bundle.new-app.min.js";
    script.async = true;

    script.onload = () => {
      const config = {
        from: "ETH",
        to: "USDT",
        fromChain: "ETH",
        toChain: "BSC",
        theme: "dark",
        iframe: "flex",
        language: "en",
        useLargeIframe: false,   // full features
        hideBranding: false,
        hideUnusedUi: false,
        amount: 1,
        slippagePercent: { instantTrades: 1, crossChain: 3 },
        crossChainIntegratorAddress: '0x0aceb3f733223a35587109dfb88e0aa7aff4e80f',
        onChainIntegratorAddress: '0x0aceb3f733223a35587109dfb88e0aa7aff4e80f'
      };

      window.rubicWidget.init(config);

      setTimeout(() => setLoaded(true), 80000);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full max-w-md relative rounded-xl overflow-hidden">

      {/* Custom header */}
      <div className='absolute mt-10 mr-6 w-100 rounded-t-2xl h-16 bg-[#1B1E2B] z-20 flex items-center px-8 '>
      </div>

      {/* Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-[#1B1E2B] z-30">
          <h1 className="text-[#40a9ff] text-4xl font-bold animate-pulse">
            Sonic
            <br />
            <span className="text-white text-lg pl-3">  Loading...</span>
          </h1>


        </div>
      )}

      {/* Widget */}
      <div
        id="rubic-widget-root"
        className={`pt-12 pb-10 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
          }`}
      />
    </div>
  );
}
