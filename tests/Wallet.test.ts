import GenericWallet from "../src/index";

describe("GenericWallet", () => {
  it("should generate a seed", () => {
    const wallet = new GenericWallet();
    const seed = wallet.getSeed();
    expect(seed).toBeDefined();
  });

  it("should generate a mnemonic", () => {
    const wallet = new GenericWallet();
    const mnemonic = wallet.getMnemonic();
    expect(mnemonic).toBeDefined();
  });

  it("should generate a seed from a mnemonic", () => {
    const wallet = new GenericWallet();
    const seed = wallet.getSeed();
    expect(seed).toBeDefined();
  });

  it("should import a seed", () => {
    const wallet = new GenericWallet(
      "brisk rude photo million repair crush now hub bitter bacon talk seat"
    );
    const seed = wallet.getSeed();
    expect(seed).toBeDefined();
  });
});
