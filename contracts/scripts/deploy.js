const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Yield Farming Aggregator contracts...");

  // Get the contract factory
  const YieldAggregator = await ethers.getContractFactory("YieldAggregator");
  
  // Deploy a mock USDC token for testing (you can replace this with real USDC address)
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  
  console.log("✅ Mock USDC deployed to:", await mockUSDC.getAddress());

  // Deploy the YieldAggregator contract
  const yieldAggregator = await YieldAggregator.deploy(await mockUSDC.getAddress());
  await yieldAggregator.waitForDeployment();

  console.log("✅ YieldAggregator deployed to:", await yieldAggregator.getAddress());

  // Add some initial pools for testing
  console.log("📊 Adding initial yield pools...");
  
  // Add Aave USDC pool
  await yieldAggregator.addPool(
    "Aave",
    "USDC Lending Pool",
    "0xA0b86a33E6441b8c4c8C0C0C0C0C0C0C0C0C0C0", // Mock address
    850, // 8.50% APY (in basis points)
    ethers.parseUnits("2100000000", 6), // $2.1B TVL
    1 // Low risk
  );

  // Add Compound USDC pool
  await yieldAggregator.addPool(
    "Compound",
    "USDC Lending Pool",
    "0xB0b86a33E6441b8c4c8C0C0C0C0C0C0C0C0C0C0", // Mock address
    920, // 9.20% APY (in basis points)
    ethers.parseUnits("890000000", 6), // $890M TVL
    1 // Low risk
  );

  // Add Yearn USDC Vault
  await yieldAggregator.addPool(
    "Yearn",
    "USDC Vault",
    "0xC0b86a33E6441b8c4c8C0C0C0C0C0C0C0C0C0C0", // Mock address
    1120, // 11.20% APY (in basis points)
    ethers.parseUnits("450000000", 6), // $450M TVL
    2 // Medium risk
  );

  // Add Curve 3Pool
  await yieldAggregator.addPool(
    "Curve",
    "3Pool",
    "0xD0b86a33E6441b8c4c8C0C0C0C0C0C0C0C0C0C0", // Mock address
    760, // 7.60% APY (in basis points)
    ethers.parseUnits("1800000000", 6), // $1.8B TVL
    1 // Low risk
  );

  console.log("✅ Initial pools added successfully!");

  // Get contract stats
  const stats = await yieldAggregator.getContractStats();
  console.log("📈 Contract Statistics:");
  console.log("   Total TVL:", ethers.formatUnits(stats[0], 6), "USDC");
  console.log("   Total Users:", stats[1].toString());
  console.log("   Pool Count:", stats[2].toString());
  console.log("   Total Deposits:", ethers.formatUnits(stats[3], 6), "USDC");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("   Mock USDC:", await mockUSDC.getAddress());
  console.log("   YieldAggregator:", await yieldAggregator.getAddress());
  
  console.log("\n🔗 Next steps:");
  console.log("   1. Update your .env file with these contract addresses");
  console.log("   2. Fund the Mock USDC contract with test tokens");
  console.log("   3. Test the deposit and withdrawal functions");
  console.log("   4. Integrate with real DeFi protocol APIs");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
