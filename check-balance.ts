import "dotenv/config";
import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`⚡️ Connected to devnet`);

const publicKey = new PublicKey(process.env.PUBLIC_KEY!);
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`💰 balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL`);
