require('dotenv-flow').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
var Web3 = require('web3');

module.exports = {
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    goerli_arbiscan: process.env.ARBISCAN_API_KEY
  },
  networks: {
    goerli: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"),
      network_id: 5
    },
    arbiGoerli: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, "https://goerli-rollup.arbitrum.io/rpc"),
      network_id: 421613
    }
  },
};
