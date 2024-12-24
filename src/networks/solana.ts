import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { Wallet } from "../types/wallet";

export class SolanaWallet implements Wallet {
    private keypair: Keypair;

    constructor(seed: Buffer) {
        // Derive path m/44'/501'/0'/0' (BIP44 for Solana)
        const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString("hex")).key;
        this.keypair = Keypair.fromSeed(derivedSeed);
    }

    getAddress(): string {
        return this.keypair.publicKey.toString();
    }

    getPrivateKey(): string {
        return Buffer.from(this.keypair.secretKey).toString("hex");
    }
}
