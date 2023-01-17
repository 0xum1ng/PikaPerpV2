// ============ Contracts ============
const FeeCalculator = artifacts.require('FeeCalculator')
const ChainlinkOracle = artifacts.require('ChainlinkOracle')
const FundingManager = artifacts.require('FundingManager')
const TestUSDC = artifacts.require('TestUSDC')
const PikaPerpV3 = artifacts.require('PikaPerpV3')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPikaPerpV3(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployPikaPerpV3(deployer, network) {
  const feeCalculator = await FeeCalculator.deployed()
  const oracle = await ChainlinkOracle.deployed()
  const fundingManager = await FundingManager.deployed()
  const testUsdc = await TestUSDC.deployed()
  const tokenBase = "100000000"
  await deployer.deploy(PikaPerpV3, testUsdc.address, tokenBase, oracle.address, feeCalculator.address, fundingManager.address)

  const perp = await PikaPerpV3.deployed()

  // Set setPikaPerp to funding
  await fundingManager.setPikaPerp(perp.address)
  console.log("Set perp to fundingManager")

  // Enable vault
  await perp.updateVault(
    [
      "1000000000000", // 1m cap
      "0", // unused
      "0", // unused
      "0", // unused
      "1" // 1s staking period
    ]
  )
  console.log("Enabled vault")
}

module.exports = migration
