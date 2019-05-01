var Review = artifacts.require("../contracts/Review.sol");
var Token = artifacts.require("../contracts/CAJCoin.sol");
var Crowdsale = artifacts.require("../contracts/Crowdsale.sol")

module.exports = function(deployer) {
  deployer.deploy(Review);
  deployer.deploy(Token);
  deployer.deploy(Crowdsale,
    1, //exchange rate currently set as 1-to-1
    "0xf0b55ecaeea488c91254e9293d1b6b750dedb299", // Replace this wallet address with the last one (10th account) from Ganache UI. This will be treated as the beneficiary address. 
    Token.address
  );
};
