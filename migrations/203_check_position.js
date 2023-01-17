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
  const perp = await PikaPerpV3.deployed()

  const user = "0xF8bD271B6886dB2ed6fBb78748cF7cF00e2e5aB8"
  const productId = "1"
  const isLong = true

  const positionInfo = await perp.getPosition(user, productId, isLong)
  console.log("Position margin: " + positionInfo[4])
  console.log("Position leverage: " + positionInfo[1])
  console.log("Position entry price: " + positionInfo[2])
  console.log("Position oracle price: " + positionInfo[3])
  console.log("Position funding: " + positionInfo[8])
}

module.exports = migration
