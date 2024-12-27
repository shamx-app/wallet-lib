import { deriveAddress } from "xrpl";
import { Wallet } from "../types/wallet";
import { deriveKeypair, generateSeed } from "ripple-keypairs";

export class RippleWallet implements Wallet {
  private seed: string;
  private keypair: {
    privateKey: string;
    publicKey: string;
  };

  constructor(seedBuffer: Buffer) {
    // Convert Buffer to Uint8Array for entropy
    const entropy = new Uint8Array(seedBuffer);
    // Generate Ripple seed from entropy
    this.seed = generateSeed({ entropy });
    // Derive keypair from seed
    this.keypair = deriveKeypair(this.seed);
  }

  getAddress(): string {
    // Derive classic address from public key
    return deriveAddress(this.keypair.publicKey);
  }

  getPrivateKey(): string {
    return this.keypair.privateKey;
  }
}
