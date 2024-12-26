import { TronWeb } from "tronweb";
import { Wallet } from "../types/wallet";
import { hdkey } from "@ethereumjs/wallet";

export class TronWallet implements Wallet {
  private privateKey: string;

  constructor(seed: Buffer) {
    // Create HD wallet from the provided master seed
    const hdWallet = hdkey.EthereumHDKey.fromMasterSeed(seed);

    // Derive path m/44'/195'/0'/0/0 (BIP44 for Tron)
    const child = hdWallet.derivePath("m/44'/195'/0'/0/0");

    // Get the private key and format it correctly
    this.privateKey = child.getWallet().getPrivateKeyString().slice(2);
  }

  // Method to get the Tron address derived from the private key
  getAddress(): string {
    const address = TronWeb.address.fromPrivateKey(this.privateKey);
    if (!address) throw new Error("Invalid private key");
    return address;
  }

  // Method to get the raw private key
  getPrivateKey(): string {
    return this.privateKey;
  }
}
