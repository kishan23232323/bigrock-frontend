import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Wallet } from "lucide-react";
import WalletConfig from "./wallet/WalletConfig.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletConfig>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </WalletConfig>
  </StrictMode>
);
