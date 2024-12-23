import { BitcoinWallet } from "./networks/bitcoin";
import { EthereumWallet } from "./networks/ethereum";
import { RippleWallet } from "./networks/ripple";

import {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeed,
} from "./utils/bip39";

export default class GenericWallet {
  private mnemonic!: string;

  bitcoin!: BitcoinWallet;
  ethereum!: EthereumWallet;
  ripple!: RippleWallet;

  fromMnemonic(mnemonic: string) {
    if (!validateMnemonic(mnemonic)) {
      throw new Error("Invalid mnemonic seed phrase");
    }
    this.mnemonic = mnemonic;
    const seed = mnemonicToSeed(mnemonic);
    // Initialize wallets with the seed
    // TODO: Implement seed initialization for each wallet
    return seed;
  }

  new() {
    this.mnemonic = generateMnemonic();
    const seed = mnemonicToSeed(this.mnemonic);
    // Initialize wallets with the seed
    // TODO: Implement seed initialization for each wallet
    return seed;
  }
}
