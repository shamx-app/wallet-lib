import { ethers } from "ethers";
import { Wallet } from "../types/wallet";

export class EthereumWallet implements Wallet {
  private wallet: ethers.Wallet;

  constructor(seed: Buffer) {
    // Derive HD wallet using ethers
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);
    // Derive path m/44'/60'/0'/0/0 (BIP44 for Ethereum)
    const child = hdNode.derivePath("m/44'/60'/0'/0/0");
    this.wallet = new ethers.Wallet(child.privateKey);
  }

  getAddress(): string {
    return this.wallet.address;
  }

  getPrivateKey(): string {
    return this.wallet.privateKey;
  }
}
