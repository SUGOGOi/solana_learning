// sendTransaction.ts
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useSendTransaction = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const sendSol = useCallback(
    async (recipientAddress: string, amountValue: string) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }

      if (!recipientAddress || !amountValue) {
        toast.error("Please provide Amount and Recipient Public key");
        return;
      }

      try {
        const recipientPubKey = new PublicKey(recipientAddress);
        const transaction = new Transaction();

        // Convert string amount to number and then to lamports
        const amountInSol = parseFloat(amountValue);
        if (isNaN(amountInSol)) {
          toast.error("Invalid amount");
          return;
        }

        const lamports = amountInSol * LAMPORTS_PER_SOL;

        const sendSolInstruction = SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        });

        transaction.add(sendSolInstruction);

        const signature = await sendTransaction(transaction, connection);

        toast.success(`Transaction successful: ${signature}`);
        console.log(`Transaction successful: ${signature}`);
        return signature;
      } catch (error) {
        console.error(error);
        toast.error(`Transaction failed`);
      }
    },
    [publicKey, sendTransaction, connection]
  );

  return { sendSol };
};
