import GenericWallet from "../../src/index";
import { EthereumWallet } from "../../src/networks/ethereum";

describe("EthereumWallet", () => {
  it("should generate a valid Ethereum address", () => {
    const genericWallet = new GenericWallet();
    const wallet = genericWallet.ethereum;
    const address = wallet.getAddress();

    expect(address).toBeDefined();
    expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/); // Basic regex for Ethereum addresses
  });

  it("should return a valid private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();
    const wallet = new EthereumWallet(Buffer.from(seed));
    const privateKey = wallet.getPrivateKey();

    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();

    const ethereumWallet = new EthereumWallet(Buffer.from(seed));

    const address = ethereumWallet.getAddress();
    expect(address).toBeDefined();
  });
});
