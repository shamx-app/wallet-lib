import * as bitcoin from "bitcoinjs-lib";
import { Wallet } from "../types/wallet";
import ECPairFactory, { ECPairAPI, ECPairInterface } from "ecpair";
import ecc from "@bitcoinerlab/secp256k1";
import { BIP32Factory as bip32Factory } from "bip32";

/** Litecoin network configuration parameters */
const LITECOIN_NETWORK = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
} as const;

const ECPair: ECPairAPI = ECPairFactory(ecc);
const BIP32Factory = bip32Factory(ecc);

/**
 * Implementation of the Wallet interface for Litecoin
 * Handles address generation and private key management for Litecoin wallets
 */
export class LitecoinWallet implements Wallet {
  private readonly keyPair: ECPairInterface;

  /**
   * Creates a new Litecoin wallet instance
   * @param seed - The seed buffer used to generate the wallet
   */
  constructor(seed: Buffer) {
    const root = BIP32Factory.fromSeed(seed, LITECOIN_NETWORK);
    const child = root.derivePath("m/44'/2'/0'/0/0");

    if (!child.privateKey) {
      throw new Error("Failed to derive private key");
    }

    this.keyPair = ECPair.fromPrivateKey(child.privateKey, {
      network: LITECOIN_NETWORK,
    });
  }

  /**
   * Gets the Litecoin address for this wallet
   * @param legacy - If true, returns a legacy address format (P2PKH). If false, returns a native SegWit address (P2WPKH)
   * @returns The Litecoin address string
   */
  getAddress(legacy?: boolean): string {
    const pubkey = Buffer.from(this.keyPair.publicKey);

    return legacy
      ? bitcoin.payments.p2pkh({ pubkey, network: LITECOIN_NETWORK }).address!
      : bitcoin.payments.p2wpkh({ pubkey, network: LITECOIN_NETWORK }).address!;
  }

  /**
   * Gets the private key in WIF format
   * @returns The wallet's private key in WIF format
   */
  getPrivateKey(): string {
    return this.keyPair.toWIF();
  }
}
