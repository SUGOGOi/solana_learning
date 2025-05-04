import "./App.scss";
import { useEffect, useMemo, useState } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useBalanceDisplay } from "./components/useBalanceDisplay.ts";
import { useSendTransaction } from "./components/useSendTransaction.ts";
import toast from "react-hot-toast";

const App = () => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        {/* <WalletProvider wallets={wallets} autoConnect> */}
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WalletContent />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default App;

const WalletContent = () => {
  const { balance, updateBalance, errorMessage } = useBalanceDisplay();
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amountValue, setAmountValue] = useState<string>("");

  const { sendSol } = useSendTransaction();

  const handleSendSol = () => {
    if (amountValue && recipientAddress) {
      sendSol(amountValue, recipientAddress);
    } else {
      toast.error("Please provide Amount and Recipient Public key");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="solana-dashboard">
      <h1 className="dashboard-title">Solana Testing</h1>

      <div className="wallet-section">
        <WalletMultiButton />
        <button className="balance-button" onClick={updateBalance}>
          See Balance
        </button>
        <p className="balance-display">
          Balance:{" "}
          <span className="balance-amount">
            {balance !== null ? balance : "N/A"}
          </span>{" "}
          SOL
        </p>
      </div>

      <div className="transaction-section">
        <h2 className="section-title">Send SOL</h2>
        <div className="send-sol-form">
          <div className="form-group">
            <label htmlFor="recipient-address">Recipient Address</label>
            <input
              id="recipient-address"
              type="text"
              placeholder="Enter wallet address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sol-amount">Amount (SOL)</label>
            <input
              id="sol-amount"
              type="text"
              placeholder="0.01"
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
            />
          </div>

          <button className="send-button" onClick={handleSendSol}>
            Send SOL
          </button>
        </div>
      </div>
    </div>
  );
};
