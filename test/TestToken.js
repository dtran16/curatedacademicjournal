// const CAJCoin = artifacts.require("CAJCoin");

// contract("CAJCoin", accounts => {
//   it("should assert true", async () => {
//     const coinInstance = await CAJCoin.deployed();

//     // // Set value of 89
//     // await simpleStorageInstance.set(89, { from: accounts[0] });

//     // // Get stored value
//     // const storedData = await simpleStorageInstance.get.call();
//     //total = await coinInstance.totalSupply();
//     //assert.equal(total.div, 1000000, "The total supply is incorrect");

//     //test transfer
//     const bal = await coinInstance.balanceOf(accounts[0]).send();
//     assert.equal(bal, 0, "oof");
//   });
// });

var Token = artifacts.require("CAJCoin");

contract('CAJCoin', function(accounts) {
  //test totalSupply
  it("Test Totalsupply", function() {
    var token;
    return Token.deployed().then(function(instance){
     token = instance;
     return token.totalSupply.call();
    }).then(function(result){
     assert.equal(result.toString(), '1000000000000000000000000', 'total supply is wrong');
    })
  });

  //test transfer from account to account
  it("Test transfer", function() {
    var token;
    return Token.deployed().then(function(instance){
     token = instance;
    }).then(function() {
      return token.transfer.call(accounts[1], 500000);
    }).then(function(result) {
      assert.equal(result, true, "should return true");
    }).then(function()  {
      return token.balanceOf.call(accounts[1]);
    }).then(function(result) {
      assert.equal(result.toString(), 500000, "balace of account 1 should be nonzero");
    })
  });

  // it("should transfer right token", function() {
  //   var token;
  //   return Token.deployed().then(function(instance){
  //     token = instance;
  //     return token.transfer(accounts[1], 500000);
  //   }).then(function(){
  //     return token.balanceOf.call(accounts[0]);
  //   }).then(function(result){
  //     assert.equal(result.toNumber(), 500000, 'accounts[0] balance is wrong');
  //     return token.balanceOf.call(accounts[1]);
  //   }).then(function(result){
  //     assert.equal(result.toNumber(), 500000, 'accounts[1] balance is wrong');
  //   })
  // });
});

