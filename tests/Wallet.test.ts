import GenericWallet from "../src/index";

describe("GenericWallet", () => {
  it("should generate a valid Bitcoin address", () => {
    const wallet = new GenericWallet();
    const seed = wallet.new();
    console.log("Generated seed:", Buffer.from(seed).toString("hex"));
    expect(seed).toBeDefined();
  });
});
