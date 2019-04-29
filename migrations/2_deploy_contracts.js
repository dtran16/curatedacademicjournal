var Review = artifacts.require("../contracts/Review.sol");
var Token = artifacts.require("../contracts/CAJCoin.sol");
//var Storage = artifacts.require("./SimpleStorage.sol");
var Crowdsale = artifacts.require("../contracts/Tokensale.sol")

module.exports = function(deployer) {
  deployer.deploy(Review);
  // deployer.deploy(Token);
  deployer.deploy(Token);
  deployer.deploy(Crowdsale);
};
