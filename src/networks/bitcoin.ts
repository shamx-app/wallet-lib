import * as bitcoin from "bitcoinjs-lib";
import { Wallet } from "../types/wallet";
import ECPairFactory, { ECPairAPI, ECPairInterface } from "ecpair";
import * as tinysecp from "tiny-secp256k1";
import * as bip32 from "bip32";

const ECPair: ECPairAPI = ECPairFactory(tinysecp);
const BIP32Factory = bip32.BIP32Factory(tinysecp);

export class BitcoinWallet implements Wallet {
  private keyPair: ECPairInterface;

  constructor(seed: Buffer) {
    const network = bitcoin.networks.bitcoin;

    // Derive HD wallet using BIP32
    const root = BIP32Factory.fromSeed(seed, network);
    // Derive path m/44'/0'/0'/0/0 (BIP44 for Bitcoin)
    const child = root.derivePath("m/44'/0'/0'/0/0");
    this.keyPair = ECPair.fromPrivateKey(child.privateKey!, { network });
  }

  getAddress(): string {
    return bitcoin.payments.p2pkh({
      pubkey: Buffer.from(this.keyPair.publicKey),
    }).address!;
  }

  getPrivateKey(): string {
    return this.keyPair.toWIF();
  }
}
