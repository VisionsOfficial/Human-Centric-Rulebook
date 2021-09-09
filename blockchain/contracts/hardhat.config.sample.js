require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');

const { privateKeyTestnet } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    testnet: {
        url: ``, // infura link
        chainId: 4,
        gasPrice: 10000000000,
        gas: 5000000,
        accounts: [privateKeyTestnet],
        explorer: 'https://rinkeby.etherscan.io/',
    },
  },
  abiExporter: {
    path: './data/abi',
    clear: true,
    flat: true,
    only: [
      'DapsiNFT',
    ],
  },
  projectAddresses: {
    nftAddress: '', // fill out after deploying the nft
    authorizedAddress: '', // address you want to authorize for creating nfts
  }
};
