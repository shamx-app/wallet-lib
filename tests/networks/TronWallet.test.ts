import { TronWeb } from "tronweb";
import GenericWallet from "../../src/index";
import { TronWallet } from "../../src/networks/tron";

describe("TronWallet", () => {
  it("should generate a valid Tron address", () => {
    const genericWallet = new GenericWallet();
    const wallet = genericWallet.tron;
    const address = wallet.getAddress();
    const privateKey = wallet.getPrivateKey();

    const trxAddr = TronWeb.address.fromPrivateKey(privateKey);

    expect(address).toBeDefined();
    expect(trxAddr).toBe(address);
  });

  it("should return a valid private key", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();
    const wallet = new TronWallet(Buffer.from(seed));
    const privateKey = wallet.getPrivateKey();

    expect(privateKey).toBeDefined();
  });

  it("should support initializing with an existing seed", () => {
    const genericWallet = new GenericWallet();
    const seed = genericWallet.getSeed();

    const tronWallet = new TronWallet(Buffer.from(seed));

    const address = tronWallet.getAddress();
    expect(address).toBeDefined();
  });
});
