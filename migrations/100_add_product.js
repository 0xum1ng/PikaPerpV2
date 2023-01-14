// ============ Contracts ============
const PikaPerpV3 = artifacts.require('PikaPerpV3')

// ============ Main Migration ============
const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPikaPerpV3(deployer, network),
  ])
}

// ============ Deploy Functions ============
async function deployPikaPerpV3(deployer, network) {
  const perp = await PikaPerpV3.deployed()
  // Add ETH
  await perp.addProduct(
    "1", // ID
    [
      "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e", // ETH chainlink token
      "10000000000", // 100x max leverage
      "50", // In bps. 0.5% = 50.
      true, // active
      "0", // Long IO
      "0", // Short IO
      "150", // 1.5%, the minimum oracle price up change for trader to close trade with profit
      "100", // weight, share of the max exposure
      "1000000000000" // 1m reserve for virtual slippage
    ]
  )
}

module.exports = migration
