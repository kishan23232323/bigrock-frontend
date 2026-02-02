import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Presale.module.css";  

export default function PresaleFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      question: "What is the BigRock token?",
      answer:
        "Bigrock Token is the official utility token of the Bigrock Exchange ecosystem. It is designed to power trading, user rewards and premium features inside the Bigrock platform.",
    },
    {
      question: "How can I participate in the presale?",
      answer:
        "To participate, connect your cryptocurrency wallet (like MetaMask) to this page. Then, enter the amount of USDT you wish to contribute, and our platform will automatically calculate the amount of BIGROCK tokens you will receive. Confirm the transaction in your wallet.",
    },
    {
      question: "What happens after the presale ends?",
      answer:
        "After the presale concludes, the BigRock token will be listed on decentralized exchanges. You will be able to claim your purchased tokens according to the vesting schedule outlined in our whitepaper.",
    },
    {
      question: "Is my investment secure?",
      answer:
        "Security is our top priority. Our smart contracts are audited by third-party security firms. However, as with any cryptocurrency investment, risks exist. DYOR.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
              <span>{item.question}</span>
              <ChevronDown
                className={`${styles.faqIcon} ${
                  openFaq === index ? styles.faqIconOpen : ""
                }`}
              />
            </div>

            <div
              className={styles.faqAnswer}
              style={{
                maxHeight: openFaq === index ? "200px" : "0",
                paddingTop: openFaq === index ? "1rem" : "0",
              }}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
