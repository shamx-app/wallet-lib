import {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeed,
} from "../src/utils/bip39";

describe("Bip39", () => {
  it("should generate a valid mnemonic", () => {
    const mnemonic = generateMnemonic();
    expect(mnemonic).toBeDefined();
    expect(validateMnemonic(mnemonic)).toBe(true);
  });

  it("should generate a valid seed from a mnemonic", () => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeed(mnemonic);
    expect(seed).toBeDefined();
  });
});
