import React from 'react';
import styles from './earninfo.module.css';

function Earn_info() {
    return (
    <div style={{backgroundColor:"#08111b"}}>
          <div className={styles.earnInfoContainer}  style={{backgroundColor:"#08111B", color:"#FFFFFF", minHeight:"100vh"}}>
            <header className={styles.header}>
                <h1>Sonic Airdrop Is Live!</h1>
                <p>Complete tasks to earn your share of SONIC tokens.</p>
            </header>

            <section className={styles.section}>
                <h2>How to Participate</h2>
                <ol className={styles.stepList}>
                    <li><strong>Connect Your Wallet:</strong> Connect your wallet to check your eligibility for the airdrop.</li>
                    <li><strong>Complete Social Tasks:</strong> Follow our social media channels and join the community to earn points.</li>
                    <li><strong>Bridge Assets:</strong> Bridge assets to the Sonic network to get a multiplier on your points.</li>
                    <li><strong>Refer Friends:</strong> Invite your friends to join the airdrop and earn bonus points for each successful referral.</li>
                </ol>
            </section>

            <section className={styles.section}>
                <h2>Airdrop Timeline</h2>
                <div className={styles.timeline}>
                    <p><strong>Phase 1:</strong> Social Tasks & Early Participation - Currently active!</p>
                    <p><strong>Phase 2:</strong> On-chain Interaction - Coming Soon</p>
                    <p><strong>Token Claim:</strong> To be announced after the campaign concludes.</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Frequently Asked Questions (FAQ)</h2>
                <div className={styles.faq}>
                    <h4>Who is eligible for the airdrop?</h4>
                    <p>Eligibility is determined by a snapshot of past on-chain activity and participation in our campaigns. Connect your wallet to see if you qualify.</p>

                    <h4>How are the points calculated?</h4>
                    <p>Points are awarded based on the tasks you complete. On-chain activities and referrals may provide a multiplier for your total points.</p>

                    <h4>When can I claim my tokens?</h4>
                    <p>The token claim date will be announced on our official channels after the airdrop campaign ends. Stay tuned for updates.</p>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>Follow us on our social channels to stay updated!</p>
            </footer>
        </div>
    </div>
    );
}

export default Earn_info;