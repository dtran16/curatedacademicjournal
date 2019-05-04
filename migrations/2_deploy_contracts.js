var Review = artifacts.require("../contracts/Review.sol");
var Token = artifacts.require("../contracts/CAJCoin.sol");
var Crowdsale = artifacts.require("../contracts/Crowdsale.sol")

module.exports = async (deployer) => {
  await deployer.deploy(Review);
  await deployer.deploy(Token);
  let instanceR = await Review.deployed();
  let instanceT = await Token.deployed();
  await instanceR.setContract(instanceT.address);
  await instanceT.setContract(instanceR.address);
};
