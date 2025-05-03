import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from "dotenv";

dotenv.config();

const connection = new Connection(clusterApiUrl("devnet"));
const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

// console.log(`public key: ${senderKeyPair.publicKey.toBase58()}`);
// console.log(`private key: ${senderKeyPair.secretKey}`);

const sender = senderKeyPair.publicKey;
const recipient = new PublicKey(process.env.PUBLIC_KEY_CSM23036);
const amount = 2;

const transaction = new Transaction();

const sendSolInstraction = SystemProgram.transfer({
  fromPubkey: sender,
  toPubkey: recipient,
  lamports: LAMPORTS_PER_SOL * amount,
});

transaction.add(sendSolInstraction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeyPair,
]);

console.log(signature);
