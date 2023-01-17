require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
// require("hardhat-gas-reporter");
require('dotenv-flow').config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: {
                accountsBalance: "100000000000000000000000"
            }
        },
        goerli: {
            url: 'https://rpc.ankr.com/eth_goerli',
            accounts: [process.env.PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    },
    solidity: {
        compilers: [{
            version: "0.8.7",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }]
    }
}
