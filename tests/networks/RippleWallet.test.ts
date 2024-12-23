import GenericWallet from "../../src/index";
import { RippleWallet } from "../../src/networks/ripple";

describe("RippleWallet", () => {
  it("should generate a valid Ripple address", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();
    const wallet = new RippleWallet(seed);
    const address = wallet.getAddress();

    console.log("Generated Address:", address);
    expect(address).toBeDefined();
    expect(address.length).toBe(34);
  });

  it("should return a valid private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();
    const wallet = new RippleWallet(seed);
    const privateKey = wallet.getPrivateKey();

    console.log("Private Key:", privateKey);
    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.new();

    const rippleWallet = new RippleWallet(seed);

    const address = rippleWallet.getAddress();
    expect(address).toBeDefined();
  });
});
