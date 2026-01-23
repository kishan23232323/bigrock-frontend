import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseUnits, formatUnits } from "viem";
import { useWeb3 } from "../../../context/Web3Context";
import { toast } from "react-toastify";


const Section = ({ title, children, danger }) => (
  <div
    className={`rounded-2xl border ${danger ? "border-red-500/30" : "border-white/10"
      } bg-white/5 backdrop-blur-xl p-6`}
  >
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Input = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm text-slate-300 mb-1">{label}</label>
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-blue-400"
    />
  </div>
);


const Select = ({ label, options, value, onChange }) => (
  <div>
    <label className="block text-sm text-slate-300 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);


const AdminButton = ({ children, color, onClick, loading = false }) => {
  const colors = {
    blue: "bg-blue-500/20 border-blue-400/40 text-blue-300",
    green: "bg-green-500/20 border-green-400/40 text-green-300",
    emerald: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    red: "bg-red-500/20 border-red-400/40 text-red-300",
  };

  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border font-semibold transition hover:scale-[1.02] ${loading ? "opacity-50 cursor-not-allowed" : ""
        } ${colors[color]}`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

const AdminAirdropPanel = () => {
  const { setWalletRewardAmount, pauseContract, unpauseContract, setSubscriptionParams, setSingleReferAllocation, setSingleSwapAllocation, setBatchReferAllocation, setBatchSwapAllocation, setWalletEligibleSingle, setWalletEligibleBatch, emergencyWithdraw } = useWeb3();

  const [walletAmount, setWalletAmount] = React.useState("");
  const [subFee, setSubFee] = React.useState("");
  const [subDuration, setSubDuration] = React.useState("");
  const [allocAddress, setAllocAddress] = React.useState("");
  const [allocAmount, setAllocAmount] = React.useState("");
  const [allocType, setAllocType] = React.useState("Refer");
  const [batchAddresses, setBatchAddresses] = React.useState("");
  const [batchAmounts, setBatchAmounts] = React.useState("");
  const [batchType, setBatchType] = React.useState("Refer");
  const [eligibleAddress, setEligibleAddress] = React.useState("");
  const [eligibleStatus, setEligibleStatus] = React.useState("Eligible");
  const [batchEligibleAddresses, setBatchEligibleAddresses] = React.useState("");
  const [batchEligibleStatus, setBatchEligibleStatus] = React.useState("Eligible");
  const [emergencyTo, setEmergencyTo] = React.useState("");
  const { getAdminBalances, isPaused } = useWeb3();
  const [adminBalances, setAdminBalances] = React.useState(null);
  const [paused, setPaused] = React.useState(false);
  const [adminLoading, setAdminLoading] = React.useState(false);


  React.useEffect(() => {
    getAdminBalances()?.then(setAdminBalances);
    isPaused()?.then(setPaused);
  }, []);


  const handleSetWalletAmount = async () => {
    if (!walletAmount) {
      toast.error("⚠ Enter wallet reward amount");
      return;
    }

    const amountInWei = parseUnits(walletAmount.toString(), 18);

    try {
      setAdminLoading(true);
      await setWalletRewardAmount({
        amount: amountInWei,
      });
    } finally {
      setAdminLoading(false);
    }
  };


  const handleSetSubscription = async () => {
    const feeInUnits = parseUnits(subFee.toString(), 18);
    const durationInSeconds = BigInt(subDuration);

    try {
      setAdminLoading(true);
      await setSubscriptionParams({
        fee: feeInUnits,
        duration: durationInSeconds,
      });
    } finally {
      setAdminLoading(false);
    }
  };


  const handleSingleAllocation = async () => {
    if (!allocAddress || !allocAmount) {
      toast.error("⚠ Address and amount required");
      return;
    }

    const amountInWei = parseUnits(allocAmount.toString(), 18);

    if (adminBalances?.rewardBalance < amountInWei) {
      toast.error("❌ Not enough reward tokens in contract");
      return;
    }

    try {
      setAdminLoading(true);

      if (allocType === "Refer") {
        await setSingleReferAllocation({
          user: allocAddress,
          amount: amountInWei,
        });
      } else {
        await setSingleSwapAllocation({
          user: allocAddress,
          amount: amountInWei,
        });
      }
    } finally {
      setAdminLoading(false);
    }
  };



  const handleBatchAllocation = async () => {
    if (!batchAddresses || !batchAmounts) {
      toast.error("⚠ Addresses and amounts required");
      return;
    }

    const users = batchAddresses
      .split("\n")
      .map(a => a.trim())
      .filter(Boolean);

    const amounts = batchAmounts
      .split("\n")
      .map(a => parseUnits(a.trim(), 18));

    if (users.length !== amounts.length) {
      toast.error("⚠ Address and amount count mismatch");
      return;
    }

    try {
      setAdminLoading(true);

      if (batchType === "Refer") {
        await setBatchReferAllocation({ users, amounts });
      } else {
        await setBatchSwapAllocation({ users, amounts });
      }
    } finally {
      setAdminLoading(false);
    }
  };


  const handleWalletEligibility = async () => {
    if (!eligibleAddress) {
      toast.error("⚠ Wallet address required");
      return;
    }

    const isEligible = eligibleStatus === "Eligible";

    try {
      setAdminLoading(true);
      await setWalletEligibleSingle({
        user: eligibleAddress,
        status: isEligible,
      });
    } finally {
      setAdminLoading(false);
    }
  };


  const handleBatchWalletEligibility = async () => {
    const users = batchEligibleAddresses
      .split("\n")
      .map(a => a.trim())
      .filter(Boolean);

    if (!users.length) {
      toast.error("⚠ No addresses provided");
      return;
    }

    const statuses = users.map(() => batchEligibleStatus === "Eligible");

    try {
      setAdminLoading(true);
      await setWalletEligibleBatch({
        users,
        statuses,
      });
    } finally {
      setAdminLoading(false);
    }
  };


  const handleEmergencyWithdraw = async () => {
    if (!emergencyTo) {
      toast.error("⚠ Enter destination address");
      return;
    }

    try {
      setAdminLoading(true);
      await emergencyWithdraw({
        to: emergencyTo,
      });
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08111b] px-6 py-8 text-white">


      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Airdrop Admin Panel</h1>
        <p className="text-slate-400 mt-1">
          Manage allocations, subscriptions and emergency controls
        </p>
        <ConnectButton />
      </div>

      <div className="space-y-6">

        <Section title="Contract Status">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div>Paused: <b>{paused ? "YES" : "NO"}</b></div>
            <div>Reward Balance: <b> {adminBalances ? formatUnits(adminBalances.rewardBalance, 18) : "-"}</b></div>
            <div>USDT Balance: <b>{adminBalances ? formatUnits(adminBalances.usdtBalance, 6) : "-"}</b></div>
          </div>
        </Section>


        {/*  CONTRACT CONTROLS */}
        <Section title="Contract Controls">
          <div className="flex gap-4 flex-wrap">
            <AdminButton color="blue" onClick={pauseContract} loading={adminLoading}>
              Pause Contract
            </AdminButton>

            <AdminButton color="green" onClick={unpauseContract} loading={adminLoading}>
              Unpause Contract
            </AdminButton>
          </div>
        </Section>


        {/*  SUBSCRIPTION SETTINGS */}
        <Section title="Subscription Settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Subscription Fee (USDT)"
              placeholder="e.g. 10"
              value={subFee}
              onChange={(e) => setSubFee(e.target.value)}
            />

            <Input
              label="Duration (seconds)"
              placeholder="e.g. 2592000"
              value={subDuration}
              onChange={(e) => setSubDuration(e.target.value)}
            />

            <AdminButton color="emerald" onClick={handleSetSubscription} loading={adminLoading}>
              Set Params
            </AdminButton>
          </div>
        </Section>


        {/*  WALLET REWARD */}
        <Section title="Wallet Reward Settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Wallet Reward Amount"
              placeholder="e.g. 50"
              value={walletAmount}
              onChange={(e) => setWalletAmount(e.target.value)}
            />
            <AdminButton
              color="emerald"
              onClick={handleSetWalletAmount}
              loading={adminLoading}
            >
              Set Amount
            </AdminButton>
          </div>
        </Section>


        {/*  SINGLE ALLOCATION */}
        <Section title="Single Reward Allocation">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="User Address"
              value={allocAddress}
              onChange={(e) => setAllocAddress(e.target.value)}
            />
            <Input
              label="Amount"
              value={allocAmount}
              onChange={(e) => setAllocAmount(e.target.value)}
            />
            <Select
              label="Reward Type"
              options={["Refer", "Swap"]}
              value={allocType}
              onChange={(e) => setAllocType(e.target.value)}
            />
            <AdminButton color="blue" onClick={handleSingleAllocation} loading={adminLoading}>
              Allocate
            </AdminButton>
          </div>
        </Section>


        {/*  BATCH ALLOCATION  */}
        <Section title="Batch Allocation (Core)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Wallet Addresses (one per line)
              </label>
              <textarea
                value={batchAddresses}
                onChange={(e) => setBatchAddresses(e.target.value)}
                className="w-full h-40 rounded-xl bg-white/5 border border-white/10 p-3 text-sm"
                placeholder="0x123...\n0x456...\n0x789..."
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Amounts (line-by-line)
              </label>
              <textarea
                value={batchAmounts}
                onChange={(e) => setBatchAmounts(e.target.value)}
                className="w-full h-40 rounded-xl bg-white/5 border border-white/10 p-3 text-sm"
                placeholder="100\n200\n300"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4 flex-wrap">
            <Select
              label="Reward Type"
              options={["Refer", "Swap"]}
              value={batchType}
              onChange={(e) => setBatchType(e.target.value)}
            />

            <AdminButton color="emerald" onClick={handleBatchAllocation} loading={adminLoading}>
              Execute Batch
            </AdminButton>
          </div>
        </Section>


        {/*  WALLET ELIGIBILITY */}
        <Section title="Wallet Eligibility">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Wallet Address"
              value={eligibleAddress}
              onChange={(e) => setEligibleAddress(e.target.value)}
            />
            <Select
              label="Status"
              options={["Eligible", "Not Eligible"]}
              value={eligibleStatus}
              onChange={(e) => setEligibleStatus(e.target.value)}
            />
            <AdminButton color="blue" onClick={handleWalletEligibility} loading={adminLoading}>
              Update
            </AdminButton>
          </div>
        </Section>

        {/*  BATCH WALLET ELIGIBILITY */}
        <Section title="Wallet Eligibility (Batch)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Wallet Addresses (one per line)
              </label>
              <textarea
                value={batchEligibleAddresses}
                onChange={(e) => setBatchEligibleAddresses(e.target.value)}
                className="w-full h-40 rounded-xl bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-blue-400"
                placeholder="0x123...\n0x456...\n0x789..."
              />
            </div>

            <div className="flex flex-col gap-4">
              <Select
                label="Eligibility Status"
                options={["Eligible", "Not Eligible"]}
                value={batchEligibleStatus}
                onChange={(e) => setBatchEligibleStatus(e.target.value)}
              />

              <AdminButton
                color="emerald"
                onClick={handleBatchWalletEligibility}
                loading={adminLoading}
              >
                Apply Batch Eligibility
              </AdminButton>
            </div>

          </div>
        </Section>



        {/*  EMERGENCY ACTIONS */}
        <Section title="Emergency Actions" danger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="To Address"
              value={emergencyTo}
              onChange={(e) => setEmergencyTo(e.target.value)}
            />
            <AdminButton color="red" onClick={handleEmergencyWithdraw} loading={adminLoading}>
              Emergency Withdraw
            </AdminButton>
          </div>
        </Section>

      </div>
    </div>
  );
};




export default AdminAirdropPanel;
