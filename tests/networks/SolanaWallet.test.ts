import GenericWallet from "../../src/index";

describe("SolanaWallet", () => {
    it("should generate a valid Solana address", () => {
        const genericWallet = new GenericWallet();
        const address = genericWallet.solana.getAddress();

        expect(address).toBeDefined();
        console.log(address);
        // Solana addresses are base58-encoded public keys
        expect(address).toMatch(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/);
    });

    it("should return a valid private key", () => {
        const genericWallet = new GenericWallet();
        console.log(genericWallet.getMnemonic());
        const privateKey = genericWallet.solana.getPrivateKey();

        expect(privateKey).toBeDefined();
        console.log(privateKey);
        console.log(genericWallet.solana.getAddress());
        // Private key should be a 64-byte hex string (128 characters)
        expect(privateKey).toMatch(/^[0-9a-f]{128}$/);
    });

    it("should support initializing with an existing seed", () => {
        const genericWallet = new GenericWallet("front tongue kiwi slice visa meat language model cattle piano exist brave");
        const address = genericWallet.solana.getAddress();
        expect(address).toBeDefined();

        const privateKey = genericWallet.solana.getPrivateKey();
        expect(privateKey).toBeDefined();
    });
});
