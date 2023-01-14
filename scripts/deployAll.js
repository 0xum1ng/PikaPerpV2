const { ethers, upgrades } = require("hardhat")

async function main() {
  const FeeCalculator = await ethers.getContractFactory("FeeCalculator")
  const feeCalculator = await FeeCalculator.deploy()
  await feeCalculator.deployed();
  console.log("FeeCalculator deployed to:", feeCalculator.address)

  const Oracle = await ethers.getContractFactory("ChainlinkOracle")
  const oracle = await Oracle.deploy()
  await oracle.deployed();
  console.log("Oracle deployed to:", oracle.address)

  const FundingManager = await ethers.getContractFactory("FundingManager")
  const fundingManager = await FundingManager.deploy()
  await fundingManager.deployed();
  console.log("FundingManager deployed to:", fundingManager.address)

  const Perp = await ethers.getContractFactory("PikaPerpV3")
  const perp = await Perp.deploy(
    "0x07865c6e87b9f70255377e024ace6630c1eaa37f", // USDC
    100000000, // token base, cancel out BASE
    oracle.address,
    feeCalculator.address,
    fundingManager.address
  )
  await perp.deployed();
  console.log("PikaPerp deployed to:", perp.address)

  // Set setPikaPerp to funding
  await fundingManager.setPikaPerp(perp.address)
  console.log("Set perp to fundingManager")

  // Add product for ETH 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
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
  console.log("Added product for ETH/USD")

  await perp.updateVault(
    [
      "1000000000000", // 1m cap
      "0", // unused
      "0", // unused
      "0", // unused
      "1" // 1s staking period
    ]
  )
  console.log("Updated vault")
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
