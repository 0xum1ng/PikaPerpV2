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
  const testUsdc = await TestUSDC.deployed()
  const to = "0xF8bD271B6886dB2ed6fBb78748cF7cF00e2e5aB8"
  const amount = "1000000000000" // 1m
  await testUsdc.mint(to, amount)
  console.log("Minted " + amount + " to " + to)
}

module.exports = migration
