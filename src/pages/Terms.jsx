import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen px-4 py-12 flex justify-center"
      style={{ background: "#08111B" }}
    >
      <div className="max-w-3xl w-full bg-transparent backdrop-blur-lg border border-gray-700 rounded-2xl p-6 sm:p-10 text-gray-300">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-100 mb-6">
          Controlled P2P User Agreement
        </h1>

        <p className="text-sm text-gray-400 mb-8 text-center">
          Last Updated: 01/01/2026
        </p>

        {/* Section */}
        <section className="text-sm leading-relaxed text-gray-300">
          <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-12 shadow-lg backdrop-blur-sm">
            <p className="font-medium text-slate-100 text-base leading-7">
              This Agreement governs access to and use of the controlled Peer-to-Peer (P2P) digital
              asset transaction services offered by Bigrock Exchange. By using this service, you agree to be legally bound by the terms below.
            </p>
          </div>

          <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              1. PLATFORM NATURE & LEGAL STATUS
            </h2>
            <p className="mb-2">
              Bigrock Exchange operates a controlled, backend-managed P2P transaction system. Bigrock does not act as a
              buyer, seller, broker, agent, dealer, payment processor, or money transmitter.
            </p>
            <p>
              No public agents, merchants, or live sellers are displayed. All transactions are initiated, verified, and monitored
              through Bigrock’s internal systems.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              2. ELIGIBILITY & USER REPRESENTATIONS
            </h2>
            <p>
              Users must be at least 18 years old and legally permitted to trade digital assets. Users confirm that funds used
              originate from lawful sources and that they are not acting on behalf of third parties.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              3. TRANSACTION LIMITS
            </h2>
            <p>
              Minimum transaction value is USD 200. Maximum transaction value is USD 3,000,000. Bigrock may apply
              additional limits, enhanced due diligence, or reject transactions at its sole discretion.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              4. ESCROW & ORDER CONTROL
            </h2>
            <p>
              Digital assets are placed into escrow controlled by Bigrock systems. Fiat funds are never handled by Bigrock.
              Release of escrow is subject to backend verification, compliance checks, and risk clearance.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              5. USER OBLIGATIONS & PROHIBITED ACTIVITIES
            </h2>
            <p className="mb-2">
              Users must provide accurate information, use their own payment methods, and follow platform instructions.
            </p>
            <p>
              Prohibited activities include fraud, chargebacks, money laundering, terror financing, use of third-party accounts,
              off-platform settlements, or attempts to bypass controls.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              6. COMPLIANCE, AML & GOVERNMENT COOPERATION
            </h2>
            <p className="mb-2">
              Bigrock reserves the right to monitor activity, request additional documentation, freeze accounts, and report
              suspicious activity to authorities without prior notice.
            </p>
            <p>
              Bigrock cooperates fully with law enforcement, tax authorities, and regulatory agencies.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              7. TAX RESPONSIBILITY
            </h2>
            <p>
              Users are solely responsible for reporting and paying all applicable taxes. Bigrock does not provide tax or legal
              advice.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              8. DISPUTE MANAGEMENT
            </h2>
            <p>
              Disputes are resolved based on backend logs, transaction records, and submitted proofs. Bigrock’s decision is
              final and binding.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              9. RISK DISCLOSURE
            </h2>
            <p>
              Digital asset transactions involve high risk, including price volatility, regulatory changes, banking failures, and
              technical issues. Users trade entirely at their own risk.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              10. LIMITATION OF LIABILITY
            </h2>
            <p>
              To the maximum extent permitted by law, Bigrock shall not be liable for indirect, incidental, or consequential
              losses. Any liability shall not exceed fees paid in the preceding 12 months.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              11. INDEMNIFICATION
            </h2>
            <p>
              Users agree to indemnify and hold harmless Bigrock Exchange, its directors, employees, and partners from all
              claims, penalties, losses, or legal actions arising from misuse of the platform.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              12. ACCOUNT SUSPENSION & TERMINATION
            </h2>
            <p>
              Bigrock may suspend or terminate accounts at any time without notice for compliance, security, or legal reasons.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              13. DATA RETENTION & PRIVACY
            </h2>
            <p>
              User data and transaction records may be retained indefinitely for legal and compliance purposes. Data may be
              shared with authorities where required by law.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              14. FORCE MAJEURE
            </h2>
            <p>
              Bigrock shall not be liable for failure or delay caused by events beyond reasonable control, including government
              actions, regulatory changes, internet shutdowns, or cyber incidents.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              15. GOVERNING LAW
            </h2>
            <p>
              This Agreement shall be governed by applicable laws as determined by Bigrock Exchange, without regard to
              conflict-of-law principles.
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group">
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
              16. USER ACKNOWLEDGEMENT
            </h2>
            <p>
              By using Bigrock Exchange P2P services, you acknowledge that you have read, understood, and agreed to all
              terms of this Agreement.
            </p>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
