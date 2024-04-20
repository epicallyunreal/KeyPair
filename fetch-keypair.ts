import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

export function getKeyPairEnv() {
    return getKeypairFromEnvironment("SECRET_KEY");
}

export function logDetails() {
    //console.log(`Fetched Secret key is: `, keypair.secretKey)
    console.log(`Matching Public key is: `, keypair.publicKey.toBase58())
    console.log(`Public key fetched Sucessfully from env`);
}

const keypair = getKeyPairEnv();
//logDetails();