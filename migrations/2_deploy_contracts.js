var Review = artifacts.require("./Review.sol");
var Token = artifacts.require("./Review.sol");

module.exports = function(deployer) {
  deployer.deploy(Review);
  deployer.deploy(Token);
};
