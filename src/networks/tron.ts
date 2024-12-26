import { TronWeb } from "tronweb";
import { Wallet } from "../types/wallet";
import { hdkey } from "@ethereumjs/wallet";

export class TronWallet implements Wallet {
  private privateKey: string;

  constructor(seed: Buffer) {
    // Create HD wallet
    const hdWallet = hdkey.EthereumHDKey.fromMasterSeed(seed);
    // Derive path m/44'/195'/0'/0/0 (BIP44 for Tron)
    const child = hdWallet.derivePath("m/44'/195'/0'/0/0");

    this.privateKey = child.getWallet().getPrivateKeyString().slice(2);
  }

  getAddress(): string {
    const address = TronWeb.address.fromPrivateKey(this.privateKey);
    if (!address) throw new Error("Invalid private key");
    return address;
  }

  getPrivateKey(): string {
    return this.privateKey;
  }
}
