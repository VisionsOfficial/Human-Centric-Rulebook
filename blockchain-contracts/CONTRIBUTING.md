# dapsi-contracts

## Setup

Rename `hardhat.config.sample.js` to `hardhat.config.js` and fill in missing parts.

## Deploy

`npx hardhat run --network testnet scripts/deploy-nft.js`

## Set authorized address

Don't forget to first fill out `projectAddresses` in config.

`npx hardhat run --network testnet scripts/set-authorized-address.js`
