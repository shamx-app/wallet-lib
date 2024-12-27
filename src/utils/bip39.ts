import { bip39 } from "@ronickg/react-native-bip39";

export function generateMnemonic(): string {
  return bip39.generateMnemonic();
}

export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic);
}

export function mnemonicToSeed(mnemonic: string) {
  return bip39.mnemonicToSeed(mnemonic);
}
