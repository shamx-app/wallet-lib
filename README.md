# Shamx Wallet Library

A library for generating and managing wallets for various cryptocurrencies.

## Installation

```bash
npm install @shamx/wallet-lib
```

## Usage

```typescript
import GenericWallet from "@shamx/wallet-lib";

const wallet = new GenericWallet();

const bitcoinAddress = wallet.bitcoin.getAddress();
const ethereumAddress = wallet.ethereum.getAddress();
const rippleAddress = wallet.ripple.getAddress();
```

# License

MIT

## Author

Shamx - Ray Orolé
