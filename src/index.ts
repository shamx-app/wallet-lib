import { BitcoinWallet } from "./networks/bitcoin";
import { EthereumWallet } from "./networks/ethereum";
import { RippleWallet } from "./networks/ripple";
import { LitecoinWallet } from "./networks/litecoin";

import {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeed,
} from "./utils/bip39";
import { DogecoinWallet } from "./networks/dogecoin";
import { SolanaWallet } from "./networks/solana";
import { TronWallet } from "./networks/tron";

export default class GenericWallet {
  private mnemonic!: string;
  private seed!: Uint8Array;

  bitcoin!: BitcoinWallet;
  ethereum!: EthereumWallet;
  ripple!: RippleWallet;
  litecoin!: LitecoinWallet;
  dogecoin!: DogecoinWallet;
  solana!: SolanaWallet;
  tron!: TronWallet;

  constructor(mnemonicArg?: string) {
    if (mnemonicArg) {
      if (!validateMnemonic(mnemonicArg)) {
        throw new Error("Invalid mnemonic phrase");
      }

      this.mnemonic = mnemonicArg;
      const seed = mnemonicToSeed(mnemonicArg);

      this.bitcoin = new BitcoinWallet(seed);
      this.ethereum = new EthereumWallet(seed);
      this.ripple = new RippleWallet(seed);
      this.litecoin = new LitecoinWallet(seed);
      this.dogecoin = new DogecoinWallet(seed);
      this.solana = new SolanaWallet(seed);
      this.tron = new TronWallet(seed);

      this.seed = seed;
    } else {
      const mnemonic = generateMnemonic();
      this.mnemonic = mnemonic;

      const seed = mnemonicToSeed(mnemonic);

      this.bitcoin = new BitcoinWallet(seed);
      this.ethereum = new EthereumWallet(seed);
      this.ripple = new RippleWallet(seed);
      this.litecoin = new LitecoinWallet(seed);
      this.dogecoin = new DogecoinWallet(seed);
      this.solana = new SolanaWallet(seed);
      this.tron = new TronWallet(seed);

      this.seed = seed;
    }
  }

  getMnemonic() {
    return this.mnemonic;
  }

  getSeed() {
    return this.seed;
  }
}
