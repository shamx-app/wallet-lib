import { payments, networks, Psbt } from "bitcoinjs-lib";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import { Wallet } from "../types/wallet";

export class DogecoinWallet implements Wallet {
  private bip32: any;
  private network: typeof networks.bitcoin;

  constructor(seed: Buffer) {
    // Initialize BIP32
    const bip32 = BIP32Factory(ecc);
    // Derive HD wallet from seed
    this.bip32 = bip32.fromSeed(seed);

    // Dogecoin network parameters
    this.network = {
      ...networks.bitcoin,
      messagePrefix: "\x19Dogecoin Signed Message:\n",
      bip32: {
        public: 0x02facafd,
        private: 0x02fac398,
      },
      pubKeyHash: 0x1e,
      scriptHash: 0x16,
      wif: 0x9e,
    };

    // Derive path m/44'/3'/0'/0/0 (BIP44 for Dogecoin)
    this.bip32 = this.bip32.derivePath("m/44'/3'/0'/0/0");
  }

  getAddress(): string {
    // Generate P2PKH address from public key
    return payments.p2pkh({
      pubkey: this.bip32.publicKey,
      network: this.network,
    }).address!;
  }

  getPrivateKey(): string {
    return this.bip32.privateKey.toString("hex");
  }
}
