// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from 'hardhat';

async function main() {

	const PAINT_ON_CHAIN = await hre.ethers.getContractFactory("PAINT_ON_CHAIN");
	const paintOnChain = await PAINT_ON_CHAIN.deploy();

	await paintOnChain.deployed();

	console.log("SUCCESS! Contract deployed at this address:", paintOnChain.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
