const { expect } = require("chai");

describe("nft", function() {
  let dapsiNFT, owner, account1;

  beforeEach(async () => {
    const nftContract = await ethers.getContractFactory("DapsiNFT");
    dapsiNFT = await nftContract.deploy(
      'test',
      'tst',
      'https://test.com/',
      ''
    );
    [ owner, account1 ] = await ethers.getSigners();
    await dapsiNFT.deployed();
  });

  it("Deployer should be the owner of the contract", async function() {
    expect(await dapsiNFT.owner()).to.equal(owner.address);
  });

  it("Creates a NFT", async function() {
    await dapsiNFT.connect(owner).create(account1.address, 1, "0x0");
    const nft1owner = await dapsiNFT.ownerOf(1)
    const account1Balance = await dapsiNFT.balanceOf(account1.address);
    const tokenHash = await dapsiNFT.idToHash(1);
    expect(nft1owner).to.equal(account1.address);
    expect(account1Balance).to.equal(1);
    expect(tokenHash).to.equal("0x0");
  });
});
