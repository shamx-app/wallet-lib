import { BitcoinWallet } from "../../src/networks/bitcoin";
import GenericWallet from "../../src/index";

describe("BitcoinWallet", () => {
  it("should generate a valid Bitcoin address", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();
    const wallet = new BitcoinWallet(Buffer.from(seed));
    const address = wallet.getAddress();

    expect(address).toBeDefined();
    expect(address).toMatch(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/);
  });

  it("should return a valid WIF private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();
    const wallet = new BitcoinWallet(Buffer.from(seed));
    const privateKey = wallet.getPrivateKey();

    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();

    const bitcoinWallet = new BitcoinWallet(Buffer.from(seed));

    const address = bitcoinWallet.getAddress();
    expect(address).toBeDefined();

    const privateKey = bitcoinWallet.getPrivateKey();
    expect(privateKey).toBeDefined();
  });
});
