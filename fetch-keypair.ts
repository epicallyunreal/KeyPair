import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Fetched Secret key is: `, keypair.secretKey)
console.log(`Matching Public key is: `, keypair.publicKey.toBase58())
console.log(`Fetched Sucessfully`)