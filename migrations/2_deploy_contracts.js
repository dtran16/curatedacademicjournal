var Review = artifacts.require("../contracts/Review.sol");
var Token = artifacts.require("../contracts/CAJCoin.sol");
//var Storage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Review);
  // deployer.deploy(Token);
  deployer.deploy(Token);
};
