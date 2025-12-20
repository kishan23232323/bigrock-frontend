import React from "react";

const Terms = () => {
  return (
    <div
      className="min-h-screen px-4 py-12 flex justify-center"
      style={{ background: "#08111B" }}
    >
      <div className="max-w-3xl w-full bg-transparent backdrop-blur-lg border border-gray-700 rounded-2xl p-6 sm:p-10 text-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-100 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-400 mb-6 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Section */}
        <section className="space-y-4 text-sm leading-relaxed">
          <p>
            Welcome to <strong>BigRock Exchange</strong>. By accessing or using
            our platform, you agree to be bound by these Terms and Conditions.
            Please read them carefully before using our services.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            1. Eligibility
          </h2>
          <p>
            You must be at least 18 years old and legally permitted to use
            cryptocurrency services in your jurisdiction to use this platform.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            2. Account Responsibility
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. BigRock Exchange is not liable for any loss
            arising from unauthorized access to your account.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            3. P2P Transactions
          </h2>
          <p>
            All peer-to-peer (P2P) transactions are conducted at your own risk.
            BigRock Exchange acts only as a facilitator and does not guarantee
            transaction completion.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            4. Prohibited Activities
          </h2>
          <p>
            You agree not to use the platform for illegal activities including
            fraud, money laundering, or any activity prohibited by law.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            5. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account at any time
            if you violate these terms or engage in suspicious activity.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            6. Limitation of Liability
          </h2>
          <p>
            BigRock Exchange shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our services.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            7. Changes to Terms
          </h2>
          <p>
            We may update these Terms & Conditions from time to time. Continued
            use of the platform after changes constitutes acceptance of the
            revised terms.
          </p>

          <h2 className="text-lg font-semibold text-slate-200 mt-6">
            8. Contact
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <span className="text-blue-400">support@bigrock.exchange</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
