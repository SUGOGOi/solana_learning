import "./App.scss";
import { useEffect, useMemo } from "react";

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

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="main">
      <h1>Solana Testing</h1>
      <WalletMultiButton />
      <button onClick={updateBalance}>See Balance</button>
      <p>Balance: {balance !== null ? balance : "N/A"} SOL</p>
    </div>
  );
};
