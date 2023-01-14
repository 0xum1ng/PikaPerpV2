// ============ Contracts ============
const ChainlinkOracle = artifacts.require('ChainlinkOracle')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployChainlinkOracle(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployChainlinkOracle(deployer, network) {
  await deployer.deploy(ChainlinkOracle)
}

module.exports = migration
