// ============ Contracts ============
const FundingManager = artifacts.require('FundingManager')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployFundingManager(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployFundingManager(deployer, network) {
  await deployer.deploy(FundingManager)
}

module.exports = migration
