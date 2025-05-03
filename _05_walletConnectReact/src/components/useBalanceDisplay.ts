import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export const useBalanceDisplay = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const updateBalance = async () => {
    if (!connection || !publicKey) {
      setErrorMessage("Wallet is not connected");
      console.log("Wallet is not connected");
      window.alert("Wallet is not connected");
      return {
        balance: publicKey ? balance : null,
        updateBalance,
        errorMessage,
      };
    }

    try {
      connection.onAccountChange(
        publicKey,
        (updateAccountInfo) => {
          setBalance(updateAccountInfo.lamports / LAMPORTS_PER_SOL);
        },
        "confirmed"
      );

      const accountInfo = await connection.getAccountInfo(publicKey);

      if (accountInfo) {
        setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
      } else {
        setErrorMessage("Account Info not found");
        window.alert("Account Info not found");
      }
    } catch (error) {
      setErrorMessage("Failed to retrive account info");
      window.alert("Failed to retrive account info");
      console.error(error);
    }
  };

  if (publicKey) {
    console.log(balance);
    return {
      balance: publicKey ? balance : null,
      updateBalance,
      errorMessage,
    };
  } else {
    return {
      balance: publicKey ? balance : null,
      updateBalance,
      errorMessage,
    };
  }
};
