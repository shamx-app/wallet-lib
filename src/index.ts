import { BitcoinWallet } from "./networks/bitcoin";
import { EthereumWallet } from "./networks/ethereum";
import { RippleWallet } from "./networks/ripple";
import { LitecoinWallet } from "./networks/litecoin";

import {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeed,
} from "./utils/bip39";

export default class GenericWallet {
  private mnemonic!: string;
  private seed!: Uint8Array;

  bitcoin!: BitcoinWallet;
  ethereum!: EthereumWallet;
  ripple!: RippleWallet;
  litecoin!: LitecoinWallet;

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

      this.seed = seed;
    } else {
      const mnemonic = generateMnemonic();
      this.mnemonic = mnemonic;

      const seed = mnemonicToSeed(mnemonic);

      this.bitcoin = new BitcoinWallet(seed);
      this.ethereum = new EthereumWallet(seed);
      this.ripple = new RippleWallet(seed);
      this.litecoin = new LitecoinWallet(seed);

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
