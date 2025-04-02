import "dotenv/config";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

let privateKey = process.env.SECRET_KEY;
let recipientPublicKey = process.env.RECIPIENT_PUBLIC_KEY;

if (!privateKey) {
    throw new Error("SECRET_KEY is not set");
}

if (!recipientPublicKey) {
    throw new Error("RECIPIENT_PUBLIC_KEY is not set");
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey(recipientPublicKey);
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const instruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(instruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(`✅ Transaction confirmed, signature: ${signature}!`);