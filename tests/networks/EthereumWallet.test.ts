import GenericWallet from "../../src/index";
import { EthereumWallet } from "../../src/networks/ethereum";

describe("EthereumWallet", () => {
  it("should generate a valid Ethereum address", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();
    const wallet = new EthereumWallet(seed);
    const address = wallet.getAddress();

    console.log("Generated Address:", address);
    expect(address).toBeDefined();
    expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/); // Basic regex for Ethereum addresses
  });

  it("should return a valid private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();
    const wallet = new EthereumWallet(seed);
    const privateKey = wallet.getPrivateKey();

    console.log("Private Key:", privateKey);
    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();

    const ethereumWallet = new EthereumWallet(seed);

    const address = ethereumWallet.getAddress();
    expect(address).toBeDefined();
  });
});
