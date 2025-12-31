import React from "react";


const Section = ({ title, children, danger }) => (
  <div
    className={`rounded-2xl border ${
      danger ? "border-red-500/30" : "border-white/10"
    } bg-white/5 backdrop-blur-xl p-6`}
  >
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Input = ({ label, placeholder }) => (
  <div>
    <label className="block text-sm text-slate-300 mb-1">{label}</label>
    <input
      placeholder={placeholder}
      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-blue-400"
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="block text-sm text-slate-300 mb-1">{label}</label>
    <select className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const AdminButton = ({ children, color }) => {
  const colors = {
    blue: "bg-blue-500/20 border-blue-400/40 text-blue-300",
    green: "bg-green-500/20 border-green-400/40 text-green-300",
    emerald: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    red: "bg-red-500/20 border-red-400/40 text-red-300",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg border font-semibold transition hover:scale-[1.02] ${colors[color]}`}
    >
      {children}
    </button>
  );
};
const AdminAirdropPanel = () => {
  return (
    <div className="min-h-screen bg-[#08111b] px-6 py-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Airdrop Admin Panel</h1>
        <p className="text-slate-400 mt-1">
          Manage allocations, subscriptions and emergency controls
        </p>
      </div>

      <div className="space-y-6">

        {/*  CONTRACT CONTROLS */}
        <Section title="Contract Controls">
          <div className="flex gap-4 flex-wrap">
            <AdminButton color="blue">Pause Contract</AdminButton>
            <AdminButton color="green">Unpause Contract</AdminButton>
          </div>
        </Section>

        {/*  SUBSCRIPTION SETTINGS */}
        <Section title="Subscription Settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Subscription Fee (USDT)" placeholder="e.g. 10" />
            <Input label="Duration (seconds)" placeholder="e.g. 2592000" />
            <AdminButton color="emerald">Set Params</AdminButton>
          </div>
        </Section>

        {/*  WALLET REWARD */}
        <Section title="Wallet Reward Settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Wallet Reward Amount" placeholder="e.g. 50" />
            <AdminButton color="emerald">Set Amount</AdminButton>
          </div>
        </Section>

        {/*  SINGLE ALLOCATION */}
        <Section title="Single Reward Allocation">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="User Address" />
            <Input label="Amount" />
            <Select label="Reward Type" options={["Refer", "Swap"]} />
            <AdminButton color="blue">Allocate</AdminButton>
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
                className="w-full h-40 rounded-xl bg-white/5 border border-white/10 p-3 text-sm"
                placeholder="0x123...\n0x456...\n0x789..."
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Amounts (line-by-line)
              </label>
              <textarea
                className="w-full h-40 rounded-xl bg-white/5 border border-white/10 p-3 text-sm"
                placeholder="100\n200\n300"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4 flex-wrap">
            <Select label="Reward Type" options={["Refer", "Swap"]} />
            <AdminButton color="emerald">Execute Batch</AdminButton>
          </div>
        </Section>

        {/*  WALLET ELIGIBILITY */}
        <Section title="Wallet Eligibility">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Wallet Address" />
            <Select label="Status" options={["Eligible", "Not Eligible"]} />
            <AdminButton color="blue">Update</AdminButton>
          </div>
        </Section>

        {/*  EMERGENCY ACTIONS */}
        <Section title="Emergency Actions" danger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="To Address" />
            <Input label="Amount" />
            <AdminButton color="red">Emergency Withdraw</AdminButton>
          </div>
        </Section>

      </div>
    </div>
  );
};




export default AdminAirdropPanel;
