const hre = require("hardhat");
import { ethers } from "hardhat";
async function main() {
  const nUsdToken = await ethers.getContractFactory("nUSD");
  const nUSD = await nUsdToken.deploy();
  await nUSD.deployed();
  console.log("Deployed to address", nUSD.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
