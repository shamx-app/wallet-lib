# Shamx Wallet Library

A library for generating and managing wallets for various cryptocurrencies.

## Installation

```bash
npm install @shamx/wallet-lib
```

If you want to use this library in React Native, you can use the following command:

```bash
expo install react-native-quick-crypto
expo prebuild
```

This will install crypto libraries for React Native.

## Supported Networks

> **Note:** This library is currently in beta

- Bitcoin
- Ethereum
- Ripple
- Litecoin
- Dogecoin
- Solana
- Tron

## Usage

```typescript
import GenericWallet from "@shamx/wallet-lib";

// Generate a new wallet
const wallet = new GenericWallet();

// Or, import an existing wallet from a mnemonic
const wallet = new GenericWallet(
  "brisk rude photo million repair crush now hub bitter bacon talk seat",
);

const bitcoinAddress = wallet.bitcoin.getAddress();
const ethereumAddress = wallet.ethereum.getAddress();
// ...
```

# License

MIT

## Author

Shamx - Ray Orolé
