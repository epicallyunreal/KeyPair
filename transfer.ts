import * as config from "./config.json";
import "dotenv/config";
import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const providedPubKey = process.argv[2] || null;
if (!providedPubKey) {
    console.log(`Please provide a public key to transfer to!!!`);
    process.exit(1);
}

const toPubKey = new PublicKey(providedPubKey);
console.log(`Reciver's address is: ${providedPubKey}`);

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Sender's address is: ${senderKeyPair.publicKey}`);

const connection = new Connection(config.DEVNET, "confirmed");
console.log(`Connecting to ${config.DEVNET}...`);

console.log(`✅ Loaded Sender's address, Receiver's address and established connection!!`);

const transaction = new Transaction();
const SOL_TO_TRANSFER = 1.3;

const transferInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_PER_SOL * SOL_TO_TRANSFER,
});

transaction.add(transferInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeyPair,]);

console.log(`💸 Transfer Success!!!`);
console.log(`Sent ${SOL_TO_TRANSFER} to address ${toPubKey}.`);
console.log(`Transaction Signature is ${signature}`);