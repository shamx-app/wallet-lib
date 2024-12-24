import GenericWallet from "../../src/index";

describe("DogecoinWallet", () => {
    it("should generate a valid Dogecoin address", () => {
        const genericWallet = new GenericWallet();
        const address = genericWallet.dogecoin.getAddress();

        expect(address).toBeDefined();
        expect(address).toMatch(/^D[a-zA-HJ-NP-Z0-9]{33}$/);
    });

    it("should return a valid WIF private key", () => {
        const genericWallet = new GenericWallet();
        const privateKey = genericWallet.dogecoin.getPrivateKey();
        expect(privateKey).toBeDefined();
    });

    it("should support initializing with an existing seed", () => {
        const genericWallet = new GenericWallet("front tongue kiwi slice visa meat language model cattle piano exist brave");
        const address = genericWallet.dogecoin.getAddress();
        expect(address).toBeDefined();

        const privateKey = genericWallet.dogecoin.getPrivateKey();
        expect(privateKey).toBeDefined();
    });
});
