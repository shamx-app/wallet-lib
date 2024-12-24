import GenericWallet from "../../src/index";
import { RippleWallet } from "../../src/networks/ripple";

describe("RippleWallet", () => {
  it("should generate a valid Ripple address", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();
    const wallet = new RippleWallet(Buffer.from(seed));
    const address = wallet.getAddress();

    expect(address).toBeDefined();
  });

  it("should return a valid private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();
    const wallet = new RippleWallet(Buffer.from(seed));
    const privateKey = wallet.getPrivateKey();

    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();

    const rippleWallet = new RippleWallet(Buffer.from(seed));

    const address = rippleWallet.getAddress();
    expect(address).toBeDefined();
  });
});
