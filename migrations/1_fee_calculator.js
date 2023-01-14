// ============ Contracts ============
const FeeCalculator = artifacts.require('FeeCalculator')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployFeeCalculator(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployFeeCalculator(deployer, network) {
  await deployer.deploy(FeeCalculator)
}

module.exports = migration
