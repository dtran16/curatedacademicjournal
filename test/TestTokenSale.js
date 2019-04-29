const CAJCoin = artifacts.require("CAJCoin");
const Crowdsale = artifacts.require("Crowdsale");

contract("CrowdSale TokenSale Tests", async accounts => {

  // test token deployment and address storement
  it("should deploy token and store the address", async () => {
    let instance = await CAJCoin.deployed();
    let instanceSale = await Crowdsale.deployed();
    
    assert.equal(instance, 'token addr couldn\'t be stored');
    assert.equal(instanceSale, 'token addr couldn\'t be stored');
  });


        // it('should deploy the token and store the address', function(done){
        //     HashnodeCrowdsale.deployed().then(async function(instance) {
        //         const token = await instance.token.call();
        //         assert(token, 'Token address couldn\'t be stored');
        //         done();
        //    });
        // });
        // it('should set stage to PreICO', function(done){
        //     HashnodeCrowdsale.deployed().then(async function(instance) {
        //       await instance.setCrowdsaleStage(0);
        //       const stage = await instance.stage.call();
        //       assert.equal(stage.toNumber(), 0, 'The stage couldn\'t be set to PreICO');
        //       done();
        //    });
        // });
});