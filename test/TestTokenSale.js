const CAJCoin = artifacts.require("CAJCoin");
const Crowdsale = artifacts.require("Crowdsale");

contract("CrowdSale TokenSale Tests", async accounts => {

  // test token deployment and address storement
  it("should deploy token and store the address", async () => {
    let instance = await CAJCoin.deployed();
    let instanceSale = await Crowdsale.deployed();
    
    assert(instance, 'token addr couldn\'t be stored');
    assert(instanceSale, 'token addr couldn\'t be stored');
  });


});