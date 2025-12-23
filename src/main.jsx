import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import WalletConfig from "./wallet/WalletConfig.jsx";
import { Web3Provider } from "../context/Web3Context.jsx";

createRoot(document.getElementById("root")).render(
  <WalletConfig>
    <Provider store={store}>
      <BrowserRouter>
        <Web3Provider>
          <App />
        </Web3Provider>
      </BrowserRouter>
    </Provider>
  </WalletConfig>
);
