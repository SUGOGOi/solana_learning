//======================connect to solana devnet
// import { Connection, clusterApiUrl } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"));
// console.log("Connected");
// console.log(connection);

//=======================read from solana network
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("HhcwnihYfaoHehAKGvhCkd26fv71YUusyxmLBuDKCjDo");
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(balanceInSol);
