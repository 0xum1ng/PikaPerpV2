// ============ Contracts ============
const TestUSDC = artifacts.require('TestUSDC')
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
  const perp = await PikaPerpV3.deployed()
  const amount = "100000000000" // 100k
  const user = "0xF8bD271B6886dB2ed6fBb78748cF7cF00e2e5aB8"

  console.log("User balance: " + (await testUsdc.balanceOf(user)).toString())

  await testUsdc.approve(perp.address, "99999999999999999999999999999999")
  console.log("Approved")

  await perp.stake(amount, user)
  console.log("Staked " + amount)
}

module.exports = migration
