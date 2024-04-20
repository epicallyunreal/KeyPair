import * as config from "./config.json";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getKeyPairEnv, logDetails } from "./fetch-keypair.ts";
//import { getKeypairFromEnvironment } from "@solana-developers/helpers";

//const config = json;
var strPublicKey = process.argv[2];
try {
    if (!strPublicKey) {
        throw new Error("No Public Key Provided, checking balance for the address in .env!!");
    }
}
catch (err: any) {
    console.log(err.toString());
    strPublicKey = getKeyPairEnv().publicKey.toBase58();
    logDetails();
}
const currConnection = config.DEVNET;
//console.log(currConnection);
try {
    const publicKey = new PublicKey(strPublicKey);
    const connection = new Connection(currConnection, "confirmed");

    //const signature = await connection.requestAirdrop(publicKey, 2000000000);
    //await connection.confirmTransaction(signature);

    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`The balance for the wallet at address ${publicKey} is ${balanceInSol}.`)
}
catch (err: any) {
    console.log(err.toString());
}




