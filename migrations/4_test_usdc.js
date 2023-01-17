// ============ Contracts ============
const TestUSDC = artifacts.require('TestUSDC')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployTestUSDC(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployTestUSDC(deployer, network) {
  await deployer.deploy(TestUSDC)
}

module.exports = migration
