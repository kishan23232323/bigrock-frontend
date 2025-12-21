import React, { useState, useEffect, useRef } from "react";
import styles from "./P2P.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import {
  IoChevronDownOutline,
  IoCloseSharp,
  IoCopyOutline,
  IoAddCircleOutline,
} from "react-icons/io5";

import { confirmSellOrder, createSellOrder, getFiatPairs,createBuyOrder, confirmBuyOrder } from "../../services/P2Pservices/p2papi";
import useConvert from "../../Hooks/useAutoConversion";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// Helper validators
const isValidTrc20Address = (addr) => {
  if (!addr || typeof addr !== 'string') return false;
  // Allow TRON addresses starting with T (approx 34 chars) or Ethereum-style 0x address
  const tronRegex = /^T[1-9A-HJ-NP-Za-km-z]{33}$/; // basic base58 check
  const ethRegex = /^0x[0-9a-fA-F]{40}$/;
  return tronRegex.test(addr) || ethRegex.test(addr);
};

const isValidTxnHash = (h) => {
  if (!h || typeof h !== 'string') return false;
  const regex = /^[0-9a-fA-F]{64}$/;
  return regex.test(h);
};

const isValidProofFile = (file) => {
  if (!file) return true; // optional proof may be allowed
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  return file.size <= maxSize && allowedTypes.includes(file.type);
};



const P2P = ({ mode = "sell" }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className={styles.containers} >
    
      <div className={styles.container}>
      <P2PHeader />
      <P2PToggle activeMode={mode} />

      {/* Pass setter to dropdown */}
      <CountrySelector onSelectCountry={(c) => setSelectedCountry(c)} />

      {mode === "sell" ? (
        <SellSection selectedCountry={selectedCountry} />
      ) : (
        <BuySection selectedCountry={selectedCountry} />
      )}
    </div>
    </div>
  );
};


const P2PHeader = () => (
  <div className={styles.header}>
    <h1 className={styles.title}>P2P Trading</h1>
    <Link  to="/info"  >
    <button className={styles.infoButton}>
      <GrCircleInformation size={20} />
    </button></Link>
  </div>
);

const P2PToggle = ({ activeMode }) => (
  <div className={styles.toggleContainer}>
    <Link to={"/p2p/sell"} className={styles.linkBtn}>
      <button
        className={`${styles.toggleButton} ${
          activeMode === "sell" ? styles.sellActive : ""
        }`}
      >
        Sell
      </button>
    </Link>
    <Link to={"/p2p/buy"} className={styles.linkBtn}>
      <button
        className={`${styles.toggleButton} ${
          activeMode === "buy" ? styles.buyActive : ""
        }`}
      >
        Buy
      </button>
    </Link>
  </div>
);


const CountrySelector = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Country");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getFiatPairs();
        setCountries(res || []);
        console.log("Fetched countries:", res);
      } catch (error) {
        console.error("Failed to load countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSelect = (country) => {
    setSelected(country.country);
    setOpen(false);
    if (onSelectCountry) onSelectCountry(country);
  };

  return (
    <div className={styles.countrySelector}>
      <button className={styles.countryInput} onClick={() => setOpen(!open)}>
        {selected !== "Select Country" && (
          <img
            src={countries.find((c) => c.country === selected)?.image}
            alt={selected}
            className={styles.flag}
          />
        )}
        <span>{selected}</span>
        <button className={styles.dropdownButton} onClick={() => setOpen(!open)}>
          <IoChevronDownOutline size={28} />
        </button>

      </button>


      {open && (
        <div className={styles.countryDropdown}>
          {countries.length === 0 && <p className={styles.loadingText}>Loading...</p>}

          {countries.map((item, index) => (
            <div
              key={index}
              className={styles.countryItem}
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.image}
                alt={item.country}
                className={styles.flag}
              />
              <span>{item.country}</span>
              <span className={styles.currencyTag}>{item.currency}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const SellSection = ({ selectedCountry }) => {

  const [stage, setStage] = useState("CREATE");
  const [orderData, setOrderData] = useState(null);

 
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Payment Method");

  const [usdtAmount, setUsdtAmount] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [editingField, setEditingField] = useState(null);

  const { converted, rate, loading, convert, triggerNow } = useConvert();
  const currencyCode = selectedCountry?.currency ?? "USD";

  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankSwiftCode, setBankSwiftCode] = useState("");
  const [bankHolderName, setBankHolderName] = useState("");

  const [upiId, setUpiId] = useState("");
  const [paypalId, setPaypalId] = useState("");

  const navigate = useNavigate();

  const isIndia = selectedCountry?.country === "India";

  const { accessToken } = useSelector((state) => state.auth || {});
  const isLoggedIn = Boolean(accessToken);


  // Conversion
  
  const onUsdtChange = (v) => {
    setUsdtAmount(v);
    setEditingField("usdt");
    convert(Number(v) || 0, "usdt", currencyCode.toLowerCase());
  };

  useEffect(() => {
    if (converted == null) return;
    if (editingField === "usdt") {
      setFiatAmount(Number(converted).toFixed(2));
    } else if (editingField === "fiat") {
      setUsdtAmount(Number(converted).toFixed(6).replace(/\.?0+$/, ""));
    }
  }, [converted]);

  useEffect(() => {
    if (!selectedCountry) return;
    const code = selectedCountry.currency ?? "USD";
    if (editingField === "usdt") {
      triggerNow(Number(usdtAmount) || 0, "usdt", code.toLowerCase());
    } else if (editingField === "fiat") {
      triggerNow(Number(fiatAmount) || 0, code.toLowerCase(), "usdt");
    } else {
      if (usdtAmount) {
        triggerNow(Number(usdtAmount) || 0, "usdt", code.toLowerCase());
        setEditingField("usdt");
      } else if (fiatAmount) {
        triggerNow(Number(fiatAmount) || 0, code.toLowerCase(), "usdt");
        setEditingField("fiat");
      }
    }
  }, [selectedCountry]);


  // Payment Method UI handlers
 
  const togglePaymentExpansion = () =>
    setIsPaymentExpanded((s) => !s);

  const selectPaymentMethod = (method, displayName) => {
    setSelectedPaymentMethod(displayName);
    setExpandedPayment(method);

    
    setBankAccountNumber("");
    setBankSwiftCode("");
    setBankHolderName("");
    setUpiId("");
    setPaypalId("");
  };


  // Build receiverDetails object based on method

  const buildReceiverDetails = () => {
    if (expandedPayment === "bank") {
      return {
        bankAccountNumber: bankAccountNumber.trim(),
        bankSwiftCode: bankSwiftCode.trim(),
        bankHolderName: bankHolderName.trim(),
      };
    }
    if (expandedPayment === "upi") {
      return { upiId: upiId.trim() };
    }
    if (expandedPayment === "paypal") {
      return { paypalId: paypalId.trim() };
    }
    return {};
  };

  // CREATE ORDER 
  const handleCreateOrder = async () => {
   
    if (!usdtAmount || !fiatAmount || expandedPayment == null) {
      toast.error("Please enter USDT amount, fiat amount and select a payment method");
      return;
    }

    
    if (expandedPayment === "bank") {
      if (!bankAccountNumber || !bankSwiftCode || !bankHolderName) {
        toast.error("Please fill bank account number, SWIFT/IFSC and account holder name");
        return;
      }
    } else if (expandedPayment === "upi") {
      if (!upiId) {
        toast.error("Please enter UPI ID");
        return;
      }
    } else if (expandedPayment === "paypal") {
      if (!paypalId) {
        toast.error("Please enter PayPal ID");
        return;
      }
    } else {
      toast.error("Invalid payment method");
      return;
    }

    const receiverDetails = buildReceiverDetails();

    const payload = {
      usdtAmount: Number(usdtAmount),
      fiatAmount: Number(fiatAmount),
      paymentMethod:
        expandedPayment === "upi"
          ? "UPI"
          : expandedPayment === "paypal"
          ? "PAYPAL"
          : "BANK",
      receiverDetails,
      country: selectedCountry?.country,
    };

    try {
      const response = await createSellOrder(payload);
      console.log(response);
      setOrderData(response.order);
      setStage("CONFIRM");
    } catch (err) {
      console.error("Create sell order failed:", err);
      toast.error(err?.message || "Failed to create order");
    }
  };

  const [txnHash, setTxnHash] = useState("");
  const [proofFile, setProofFile] = useState(null);

  // CONFIRM ORDER
  const handleConfirmSell = async () => {
    if (!orderData) {
      toast.error("Order not found");
      return;
    }
    if (!txnHash) {
      toast.error("Please enter transaction hash");
      return;
    }

    if (!isValidTxnHash(txnHash)) {
      toast.error("Invalid transaction hash format");
      return;
    }

    if (!isValidProofFile(proofFile)) {
      toast.error("Invalid proof file. Use JPG/PNG/PDF under 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("txnHash", txnHash);
    if (proofFile) formData.append("proof", proofFile);

    try {
      console.log(orderData?._id, txnHash, proofFile);
      await confirmSellOrder({
        orderId: orderData?._id,
        txnHash,
        proof: proofFile
      });

      toast.success("Order submitted, awaiting admin approval");
      navigate("/profile");

    } catch (err) {
      console.error("Confirm sell failed:", err);
      toast.error(err?.message || "Failed to confirm sell");
    }
  };
  const handleCopyAddress = async () => {
  if (!orderData?.usdtWalletAddress) return;

  try {
    await navigator.clipboard.writeText(orderData.usdtWalletAddress);
    toast.success("Wallet address copied");
  } catch (err) {
    toast.error("Failed to copy address");
  }
};


  const renderCreateUI = () => (
    <div className={styles.sectionContent}>
      {/* USDT */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>USDT to Sell</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Enter amount"
          value={usdtAmount}
          onChange={(e) => onUsdtChange(e.target.value)}
        />
      </div>

      
      <div className={styles.inputGroup}>
        <label className={styles.label}>You Will Receive ({currencyCode})</label>
        <input
          type="text"
          className={styles.input}
          value={fiatAmount}
          disabled
        />
        {loading && <small style={{ color: "#aaa" }}>Updating rate...</small>}
        {!loading && rate != null && (
          <small style={{ color: "#aaa" }}>
            Rate: 1 USDT = {Number(rate).toFixed(4)} {currencyCode}
          </small>
        )}
      </div>

      {/* Payment method + details */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Payment</label>
        <div className={styles.paymentMethodContainer}>
          <button
            className={styles.paymentMethodButton}
            onClick={togglePaymentExpansion}
          >
            <span>{selectedPaymentMethod}</span>
            <IoChevronDownOutline size={25} />
          </button>

{isPaymentExpanded && (
  <div className={styles.paymentDropdown}>

    {/* ------- UPI (ONLY FOR INDIA) ------- */}
    {isIndia && (
      <div
        className={`${styles.paymentOption} ${
          expandedPayment === "upi" ? styles.activeDropdown : ""
        }`}
      >
        <button
          className={styles.paymentOptionHeader}
          onClick={() => selectPaymentMethod("upi", "UPI")}
        >
          <span>UPI</span>
          <IoChevronDownOutline size={20} />
        </button>

        {expandedPayment === "upi" && (
          <div className={styles.paymentOptionContent}>
            <label className={styles.paymentLabel}>Enter UPI ID</label>
            <input
              type="text"
              className={styles.paymentInput}
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}
      </div>
    )}

    {/* ------- PayPal (HIDE FOR INDIA) ------- */}
    {!isIndia && (
      <div
        className={`${styles.paymentOption} ${
          expandedPayment === "paypal" ? styles.activeDropdown : ""
        }`}
      >
        <button
          className={styles.paymentOptionHeader}
          onClick={() => selectPaymentMethod("paypal", "PayPal")}
        >
          <span>PayPal</span>
          <IoChevronDownOutline size={20} />
        </button>

        {expandedPayment === "paypal" && (
          <div className={styles.paymentOptionContent}>
            <label className={styles.paymentLabel}>Enter PayPal ID</label>
            <input
              type="text"
              className={styles.paymentInput}
              placeholder="name@example.com"
              value={paypalId}
              onChange={(e) => setPaypalId(e.target.value)}
            />
          </div>
        )}
      </div>
    )}

    {/* ------- BANK (SHOW ALWAYS) ------- */}
    <div
      className={`${styles.paymentOption} ${
        expandedPayment === "bank" ? styles.activeDropdown : ""
      }`}
    >
      <button
        className={styles.paymentOptionHeader}
        onClick={() => selectPaymentMethod("bank", "Bank Transfer")}
      >
        <span>Bank Transfer</span>
        <IoChevronDownOutline size={20} />
      </button>

      {expandedPayment === "bank" && (
        <div className={styles.paymentOptionContent}>
          <label className={styles.paymentLabel}>Account Holder Name</label>
          <input
            type="text"
            className={styles.paymentInput}
            value={bankHolderName}
            onChange={(e) => setBankHolderName(e.target.value)}
          />

          <label className={styles.paymentLabel}>Account Number</label>
          <input
            type="text"
            className={styles.paymentInput}
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
          />

          <label className={styles.paymentLabel}>SWIFT / IFSC</label>
          <input
            type="text"
            className={styles.paymentInput}
            value={bankSwiftCode}
            onChange={(e) => setBankSwiftCode(e.target.value)}
          />
        </div>
      )}
    </div>
  </div>
)}

        </div>
      </div>

      {/* Buttons */}
      <div className={`${styles.buttonGroup} flex flex-col sm:flex-row gap-3`}>
 <button className={`${styles.confirmButton} w-full`} onClick={()=>{
          if(!isLoggedIn){
            navigate("/login");
            return;
          }
          handleCreateOrder(); 
        }}>
          {isLoggedIn ? "Create Sell Order" : "Login to Use P2P Service"}
        </button>
      </div>
    </div>
  );

  // CONFIRM UI
  
  const renderConfirmUI = () => (
    <div className={styles.sectionContent}>
      <h3 className={styles.sectionTitle}>Complete Sell Order</h3>

      {/* Wallet Address */}
      <div className={styles.walletSection}>
        <h3 className={styles.walletTitle}>Send USDT to this Address ( TRC20 ONLY ) </h3>
        <div className={styles.addressContainer}>
          <span className={styles.address}>{orderData?.usdtWalletAddress}</span>
          <button className={styles.copyButton}
            onClick={handleCopyAddress}
            aria-label="Copy Wallet Address"
          >
            <IoCopyOutline size={18} />
          </button>
        </div>
      </div>

      {/* Proof Upload */}
      <div className={styles.uploadSection}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProofFile(e.target.files[0])}
          style={{ display: "none" }}
          id="sell-proof"
        />
        <label htmlFor="sell-proof" className={styles.uploadButton}>
          <IoAddCircleOutline size={30} />
        </label>

        <div className={styles.uploadText}>
          <p className={styles.uploadTitle}>Upload Proof</p>
          <p className={styles.uploadSubtitle}>JPG / PNG supported</p>
        </div>
      </div>
              {proofFile && (
            <div className={styles.previewContainer}>
              <img
                src={URL.createObjectURL(proofFile)}
                alt="Preview"
                className={styles.previewImage}
              />
              <p className={styles.previewFileName}>{proofFile.name}</p>
            </div>
          )}

      {/* Txn Hash */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Transaction Hash</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter TRX hash"
          value={txnHash}
          onChange={(e) => setTxnHash(e.target.value)}
        />
      </div>
          <div className="w-full flex justify-center mb-4">
          <p className="text-xs text-center text-gray-400 max-w-xs sm:max-w-sm px-4">
            By submitting you are agreeing to our{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
          </p>
        </div>


      {/* Buttons */}
      <div className={`${styles.buttonGroup} flex flex-col sm:flex-row gap-3`}>
        <button className={`${styles.cancelButton} w-full`} onClick={() => { setStage("CREATE"); setOrderData(null); }}>
          Cancel Order
        </button>
        <button className={`${styles.confirmButton} w-full`} onClick={handleConfirmSell}>
          Submit Proof
        </button>
      </div>
    </div>
  );


  // Render container
  
  return (
    <div className={styles.tradingSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Sell USDT</h2>
        <button className={styles.closeButton}>
          <IoCloseSharp size={25} />
        </button>
      </div>

      {stage === "CREATE" ? renderCreateUI() : renderConfirmUI()}
    </div>
  );
};




const BuySection = ({ selectedCountry }) => {
  const [stage, setStage] = useState("CREATE");
  const [orderData, setOrderData] = useState(null);

  // UI states
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Payment Method");

  // Conversion states
  const [fiatAmount, setFiatAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [editingField, setEditingField] = useState(null);

  const { converted, rate, loading, convert, triggerNow } = useConvert();
  const currencyCode = selectedCountry?.currency ?? "USD";

  // User's TRC20 address (user provides this for buy)
  const [userUsdtWallet, setUserUsdtWallet] = useState("");

  // Proof file for confirmation
  const [proofFile, setProofFile] = useState(null);

  const navigate = useNavigate();
  const isIndia = selectedCountry?.country === "India";

    const { accessToken } = useSelector((state) => state.auth || {});
    const isLoggedIn = Boolean(accessToken);

  // ------------------------- Conversion -------------------------
  const onUsdtChange = (v) => {
    setUsdtAmount(v);
    setEditingField("usdt");
    convert(Number(v) || 0, "usdt", currencyCode.toLowerCase());
  };

  const onFiatChange = (v) => {
    setFiatAmount(v);
    setEditingField("fiat");
    convert(Number(v) || 0, currencyCode.toLowerCase(), "usdt");
  };

  useEffect(() => {
    if (converted == null) return;
    if (editingField === "usdt") {
      setFiatAmount(Number(converted).toFixed(2));
    } else if (editingField === "fiat") {
      setUsdtAmount(Number(converted).toFixed(6).replace(/\.?0+$/, ""));
    }
  }, [converted]);

  useEffect(() => {
    if (!selectedCountry) return;
    const code = selectedCountry.currency ?? "USD";
    if (editingField === "fiat") {
      triggerNow(Number(fiatAmount) || 0, code.toLowerCase(), "usdt");
    } else if (editingField === "usdt") {
      triggerNow(Number(usdtAmount) || 0, "usdt", code.toLowerCase());
    } else {
      if (fiatAmount) {
        triggerNow(Number(fiatAmount) || 0, code.toLowerCase(), "usdt");
        setEditingField("fiat");
      } else if (usdtAmount) {
        triggerNow(Number(usdtAmount) || 0, "usdt", code.toLowerCase());
        setEditingField("usdt");
      }
    }
  }, [selectedCountry]);

  // ------------------------- Payment method selection (user only picks method) -------------------------
  const togglePaymentExpansion = () => setIsPaymentExpanded((s) => !s);
  const selectPaymentMethod = (method, displayName) => {
    setSelectedPaymentMethod(displayName);
    setExpandedPayment(method);
    setIsPaymentExpanded(false); // Close dropdown on selection
  };

  // ------------------------- Create Buy Order -------------------------
  const handleCreateOrder = async () => {
    if (!usdtAmount || !fiatAmount) {
      toast.error("Please enter both USDT and fiat amounts");
      return;
    }
    if (!expandedPayment) {
      toast.error("Please select a payment method");
      return;
    }
    if (!userUsdtWallet || userUsdtWallet.trim() === "") {
      toast.error("Please enter your TRC20 USDT wallet address");
      return;
    }

    if (!isValidTrc20Address(userUsdtWallet.trim())) {
      toast.error("Please provide a valid TRC20 address");
      return;
    }

    const payload = {
      usdtAmount: Number(usdtAmount),
      fiatAmount: Number(fiatAmount),
      paymentMethod:
        expandedPayment === "upi"
          ? "UPI"
          : expandedPayment === "paypal"
          ? "PAYPAL"
          : "BANK",
      country: selectedCountry?.country,
      usdtWalletAddress: userUsdtWallet.trim(), // user's wallet
    };

    try {
      const response = await createBuyOrder(payload);
    
      const returnedOrder = response?.order || response?.data?.order || response;
      setOrderData(returnedOrder);
      setStage("CONFIRM");
    } catch (err) {
      console.error("Create buy order failed:", err);
      toast.error(err?.message || "Failed to create buy order");
    }
  };

  // ------------------------- Confirm Buy Order -------------------------
  const handleConfirmBuy = async () => {
    if (!orderData?._id) {
      toast.error("Order not found");
      return;
    }
    if (!proofFile) {
      toast.error("Please upload payment screenshot");
      return;
    }

    if (!isValidProofFile(proofFile)) {
      toast.error("Invalid proof file. Use JPG/PNG/PDF under 5MB");
      return;
    }

    try {
      await confirmBuyOrder({ orderId: orderData._id, proof: proofFile });
      toast.success("Buy order submitted, awaiting admin approval");
      navigate("/profile");
      
    } catch (err) {
      console.error("Confirm buy failed:", err);
      toast.error(err?.message || "Failed to confirm buy");
    }
  };

  const handleCopyText = async (text, successMsg = "Copied") => {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMsg);
  } catch (err) {
    toast.error("Failed to copy");
  }
};


  // ------------------------- Render Create UI -------------------------
  const renderCreateUI = () => (
    <div className={styles.sectionContent}>
     
          {/* USDT amount */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>USDT to Buy </label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter amount"
          value={usdtAmount}
          onChange={(e) => onUsdtChange(e.target.value)}
        />
        {loading && <small style={{ color: "#aaa" }}>Updating rate...</small>}
        {!loading && rate != null && (
          <small style={{ color: "#aaa" }}>
            Rate: 1 USDT = {Number(rate).toFixed(4)} {currencyCode}
          </small>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Amount to Pay ({currencyCode})</label>
        <input
          type="number"
          className={styles.input}
          placeholder=""
          value={fiatAmount}
          disabled
          onChange={(e) => onFiatChange(e.target.value)}
        />
      </div>



      {/* User TRC20 wallet address (user must provide for buy) */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Your TRC20 USDT Wallet Address</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter your TRC20 address"
          value={userUsdtWallet}
          onChange={(e) => setUserUsdtWallet(e.target.value)}
        />
      </div>

      {/* Payment method (user only selects method) */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Payment Method</label>
        <div className={styles.paymentMethodContainer}>
          <button className={styles.paymentMethodButton} onClick={togglePaymentExpansion}>
            <span>{selectedPaymentMethod}</span>
            <IoChevronDownOutline size={25} />
          </button>

          {isPaymentExpanded && (
            <div className={styles.paymentDropdown}>

              {/* UPI → ONLY FOR INDIA */}
              {isIndia && (
                <div
                  className={`${styles.paymentOption} ${
                    expandedPayment === "upi" ? styles.activeDropdown : ""
                  }`}
                >
                  <button
                    className={styles.paymentOptionHeader}
                    onClick={() => selectPaymentMethod("upi", "UPI")}
                  >
                    <span>UPI</span>
                    <IoChevronDownOutline size={20} />
                  </button>
                </div>
              )}

              {/* PayPal → HIDE WHEN INDIA */}
              {!isIndia && (
                <div
                  className={`${styles.paymentOption} ${
                    expandedPayment === "paypal" ? styles.activeDropdown : ""
                  }`}
                >
                  <button
                    className={styles.paymentOptionHeader}
                    onClick={() => selectPaymentMethod("paypal", "PayPal")}
                  >
                    <span>PayPal</span>
                    <IoChevronDownOutline size={20} />
                  </button>
                </div>
              )}

              {/* Bank → ALWAYS SHOWN */}
              <div
                className={`${styles.paymentOption} ${
                  expandedPayment === "bank" ? styles.activeDropdown : ""
                }`}
              >
                <button
                  className={styles.paymentOptionHeader}
                  onClick={() => selectPaymentMethod("bank", "Bank Transfer")}
                >
                  <span>Bank Transfer</span>
                  <IoChevronDownOutline size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className={`${styles.buttonGroup} flex flex-col sm:flex-row gap-3`}>
        <button className={`${styles.confirmButton} w-full`} onClick={()=>{
          if(!isLoggedIn){
            navigate("/login");
            return;
          }
          handleCreateOrder(); 
        }}>
          {isLoggedIn ? "Create Buy Order" : "Login to Use P2P Service"}
        </button>
      </div>
    </div>
  );

  const renderConfirmUI = () => {
    const details = orderData?.receiverDetails || {};
    
      const paymentDisplayText = details.upiId
    ? `UPI ID: ${details.upiId}`
    : details.paypalId
    ? `PayPal: ${details.paypalId}`
    : details.bankHolderName
    ? `Account Holder: ${details.bankHolderName}
  Account No: ${details.bankAccountNumber}
  IFSC/SWIFT: ${details.bankSwiftCode}`
    : "";

    const paymentCopyText = details.upiId
  ? details.upiId
  : details.paypalId
  ? details.paypalId
  : details.bankHolderName
  ? `${details.bankHolderName}\n${details.bankAccountNumber}\n${details.bankSwiftCode}`
  : "";


    return (
      <div className={styles.sectionContent}>
        <h3 className={styles.sectionTitle}>Complete Buy Order</h3>

        <div className={styles.walletSection}>
          <h3 className={styles.walletTitle}>Send Money To</h3>

          <div className={styles.addressContainer}>
<span className={styles.address}>
  {paymentDisplayText || "Payment details will appear here"}
</span>

{paymentCopyText && (
  <button
    className={styles.copyButton}
    onClick={() => handleCopyText(paymentCopyText, "Payment details copied")}
    aria-label="Copy payment details"
  >
    <IoCopyOutline size={18} />
  </button>
)}


          </div>

         
          {details.bankAccountNumber && (
            <div style={{ marginTop: 8 }}>
              <div><strong>Account Holder:</strong> {details.bankHolderName}</div>
              <div><strong>Account No:</strong> {details.bankAccountNumber}</div>
              <div><strong>SWIFT/IFSC:</strong> {details.bankSwiftCode}</div>
            </div>
          )}
        </div>

        {/* Upload proof */}
        <div className={styles.uploadSection}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProofFile(e.target.files[0])}
            style={{ display: "none" }}
            id="buy-proof"
          />
          <label htmlFor="buy-proof" className={styles.uploadButton}>
            <IoAddCircleOutline size={30} />
          </label>

          <div className={styles.uploadText}>
            <p className={styles.uploadTitle}>Upload Payment Screenshot</p>
            <p className={styles.uploadSubtitle}>JPG / PNG supported</p>
          </div>
        </div>
        {proofFile && (
            <div className={styles.previewContainer}>
              <img
                src={URL.createObjectURL(proofFile)}
                alt="Preview"
                className={styles.previewImage}
              />
              <p className={styles.previewFileName}>{proofFile.name}</p>
            </div>
          )}


        {/* Buttons */}
        <div className={`${styles.buttonGroup} flex flex-col sm:flex-row gap-3`}>
          <button className={`${styles.cancelButton} w-full`} onClick={() => { setStage("CREATE"); setOrderData(null); }}>
            Cancel Order
          </button>
          <button className={`${styles.confirmButton} w-full`} onClick={handleConfirmBuy}>
            Submit Proof
          </button>
        </div>
      </div>
    );
  };

  // ------------------------- Render component -------------------------
  return (
    <div className={styles.tradingSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Buy USDT</h2>
        <button className={styles.closeButton}>
          <IoCloseSharp size={25} />
        </button>
      </div>

      {stage === "CREATE" ? renderCreateUI() : renderConfirmUI()}
    </div>
  );
};


export default P2P;