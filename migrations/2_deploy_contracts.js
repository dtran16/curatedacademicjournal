var Review = artifacts.require("../contracts/Review.sol");
var Token = artifacts.require("../contracts/CAJCoin.sol");
//var Storage = artifacts.require("./SimpleStorage.sol");
var Crowdsale = artifacts.require("../contracts/Crowdsale.sol")

module.exports = function(deployer) {
  deployer.deploy(Review);
  // deployer.deploy(Token);
  deployer.deploy(Token);
<<<<<<< HEAD
  //deployer.deploy(Crowdsale);
};
=======
  deployer.deploy(Crowdsale,
    1, 
    "0xf0b55ecaeea488c91254e9293d1b6b750dedb299", // Replace this wallet address with the last one (10th account) from Ganache UI. This will be treated as the beneficiary address. 
    // 2000000000000000000, // 2 ETH
    // 500000000000000000000 // 500 ETH
    Token
  );
};
>>>>>>> bc50e9d07d5baf816502b99c7ea10e56ef96ddd2
