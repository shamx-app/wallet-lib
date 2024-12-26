import * as bitcoin from "bitcoinjs-lib";
import { Wallet } from "../types/wallet";
import ECPairFactory, { ECPairAPI, ECPairInterface } from "ecpair";
import * as tinysecp from "tiny-secp256k1";
import { BIP32Factory as bip32Factory } from "bip32";

/** Dogecoin network configuration parameters */
const DOGECOIN_NETWORK = {
  messagePrefix: "\x19Dogecoin Signed Message:\n",
  bech32: "doge",
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398,
  },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x9e,
} as const;

const ECPair: ECPairAPI = ECPairFactory(tinysecp);
const BIP32Factory = bip32Factory(tinysecp);

/**
 * Implementation of the Wallet interface for Dogecoin
 * Handles address generation and private key management for Dogecoin wallets
 */
export class DogecoinWallet implements Wallet {
  private readonly keyPair: ECPairInterface;

  /**
   * Creates a new Dogecoin wallet instance
   * @param seed - The seed buffer used to generate the wallet
   */
  constructor(seed: Buffer) {
    const root = BIP32Factory.fromSeed(seed, DOGECOIN_NETWORK);
    const child = root.derivePath("m/44'/3'/0'/0/0");

    if (!child.privateKey) {
      throw new Error("Failed to derive private key");
    }

    this.keyPair = ECPair.fromPrivateKey(child.privateKey, {
      network: DOGECOIN_NETWORK,
    });
  }

  /**
   * Gets the Dogecoin address for this wallet
   * @returns The Dogecoin address string
   */
  getAddress(): string {
    const pubkey = Buffer.from(this.keyPair.publicKey);

    return bitcoin.payments.p2pkh({ pubkey, network: DOGECOIN_NETWORK })
      .address!;
  }

  /**
   * Gets the private key in WIF format
   * @returns The wallet's private key in WIF format
   */
  getPrivateKey(): string {
    return this.keyPair.toWIF();
  }
}
