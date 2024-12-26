import GenericWallet from "../../src/index";

describe("SolanaWallet", () => {
  it("should generate a valid Solana address", () => {
    const genericWallet = new GenericWallet();
    const address = genericWallet.solana.getAddress();

    expect(address).toBeDefined();
    expect(address).toMatch(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/);
  });

  it("should return a valid private key", () => {
    const genericWallet = new GenericWallet();
    const privateKey = genericWallet.solana.getPrivateKey();

    expect(privateKey).toBeDefined();
    expect(privateKey).toMatch(/^[0-9a-f]{128}$/);
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet(
      "front tongue kiwi slice visa meat language model cattle piano exist brave",
    );
    const address = genericWallet.solana.getAddress();
    expect(address).toBeDefined();

    const privateKey = genericWallet.solana.getPrivateKey();
    expect(privateKey).toBeDefined();
  });
});
