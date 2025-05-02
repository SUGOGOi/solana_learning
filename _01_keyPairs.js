//===================generate a keypair
// import { Keypair } from "@solana/web3.js";

// const keypair = Keypair.generate();

// console.log(`public key: ${keypair.publicKey.toBase58()}`);
// console.log(`private key: ${keypair.secretKey}`);

//===================load an existing keypair
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from "dotenv";

dotenv.config();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`public key: ${keypair.publicKey.toBase58()}`);
console.log(`private key: ${keypair.secretKey}`);
