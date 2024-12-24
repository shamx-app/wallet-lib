import GenericWallet from "../../src/index";

describe("BitcoinWallet", () => {
  it("should generate a valid legacy Bitcoin address", () => {
    const genericWallet = new GenericWallet();
    const address = genericWallet.bitcoin.getAddress(true);

    expect(address).toBeDefined();
    expect(address).toMatch(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/);
  });

  it("should generate a valid SegWit Bitcoin address", () => {
    const genericWallet = new GenericWallet();
    const address = genericWallet.bitcoin.getAddress();

    expect(address).toBeDefined();
    expect(address).toMatch(/^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/);
  });

  it("should return a valid WIF private key", () => {
    const genericWallet = new GenericWallet();
    const privateKey = genericWallet.bitcoin.getPrivateKey();
    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet("front tongue kiwi slice visa meat language model cattle piano exist brave");
    const address = genericWallet.bitcoin.getAddress();
    expect(address).toBeDefined();

    const privateKey = genericWallet.bitcoin.getPrivateKey();
    expect(privateKey).toBeDefined();
  });
});
