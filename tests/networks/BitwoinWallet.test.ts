import { BitcoinWallet } from "../../src/networks/bitcoin";
import GenericWallet from "../../src/index";

describe("BitcoinWallet", () => {
  it("should generate a valid Bitcoin address", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();
    const wallet = new BitcoinWallet(seed);
    const address = wallet.getAddress();

    console.log("Generated Address:", address);
    expect(address).toBeDefined();
    expect(address).toMatch(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/); // Basic regex for BTC addresses
  });

  it("should return a valid WIF private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();
    const wallet = new BitcoinWallet(seed);
    const privateKey = wallet.getPrivateKey();

    console.log("Private Key (WIF):", privateKey);
    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();

    const bitcoinWallet = new BitcoinWallet(seed);

    const address = bitcoinWallet.getAddress();
    expect(address).toBeDefined();

    const privateKey = bitcoinWallet.getPrivateKey();
    expect(privateKey).toBeDefined();
  });
});
