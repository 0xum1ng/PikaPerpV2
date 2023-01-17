// ============ Contracts ============
const TestUSDC = artifacts.require('TestUSDC')
const FeeCalculator = artifacts.require('FeeCalculator')
const PikaPerpV3 = artifacts.require('PikaPerpV3')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployTestUSDC(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployTestUSDC(deployer, network) {
  const testUsdc = await TestUSDC.deployed()
  const feeCalculator = await FeeCalculator.deployed()
  const perp = await PikaPerpV3.deployed()

  const user = "0xF8bD271B6886dB2ed6fBb78748cF7cF00e2e5aB8"
  const productId = "1"
  const margin = "100000000" // 100 USDC
  const isLong = true
  const leverage = "1000000000" // 10x

  console.log("User balance: " + (await testUsdc.balanceOf(user)).toString())

  await testUsdc.approve(perp.address, "99999999999999999999999999999999")
  console.log("Approved")

  const tx = await perp.openPosition(user, productId, margin, isLong, leverage)
  console.log("Opened position " + tx)
}

module.exports = migration
