import * as bitcoin from "bitcoinjs-lib";
import { Wallet } from "../types/wallet";
import ECPairFactory, { ECPairAPI, ECPairInterface } from "ecpair";
import ecc from "@bitcoinerlab/secp256k1";
import * as bip32 from "bip32";

const ECPair: ECPairAPI = ECPairFactory(ecc);
const BIP32Factory = bip32.BIP32Factory(ecc);

export class BitcoinWallet implements Wallet {
  private keyPair: ECPairInterface;

  constructor(seed: Buffer) {
    const network = bitcoin.networks.bitcoin;
    const root = BIP32Factory.fromSeed(seed, network);
    const child = root.derivePath("m/44'/0'/0'/0/0");
    this.keyPair = ECPair.fromPrivateKey(child.privateKey!, { network });
  }

  /**
   * Generates a Bitcoin address.
   * @param legacy Optional parameter. If true, generates a Legacy (P2PKH) address. Defaults to SegWit (P2WPKH).
   * @returns The Bitcoin address as a string.
   */
  getAddress(legacy?: boolean): string {
    const network = bitcoin.networks.bitcoin;
    if (legacy) {
      // Generate Legacy (P2PKH) address
      return bitcoin.payments.p2pkh({
        pubkey: Buffer.from(this.keyPair.publicKey),
        network,
      }).address!;
    } else {
      // Generate SegWit (P2WPKH) address
      return bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(this.keyPair.publicKey),
        network,
      }).address!;
    }
  }

  /**
   * Returns the private key in Wallet Import Format (WIF).
   */
  getPrivateKey(): string {
    return this.keyPair.toWIF();
  }
}
