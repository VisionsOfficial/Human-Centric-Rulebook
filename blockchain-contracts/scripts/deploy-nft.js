const hre = require("hardhat");

async function main() {
  const ContractF = await hre.ethers.getContractFactory("DapsiNFT");
  const contr = await ContractF.deploy(
    'test',
    'tst',
    'https://test.com/',
    ''
  );

  await contr.deployed();

  console.log("DapsiNFT deployed to: %saddress/%s", hre.network.config.explorer, contr.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
