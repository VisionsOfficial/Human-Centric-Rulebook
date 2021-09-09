const hre = require("hardhat");

async function main() {

  const addresses = hre.config.projectAddresses;
  const signer = (await hre.ethers.getSigners())[0];
  const contr = await hre.ethers.getContractAt('DapsiNFT', addresses.nftAddress, signer);

  const tx = await contr.setAuthorizedAddress(addresses.authorizedAddress, true);

  console.log("Address set: " + tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
