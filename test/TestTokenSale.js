const CAJCoin = artifacts.require("CAJCoin");
const Crowdsale = artifacts.require("Crowdsale");

contract("Crowdsale Tests", async accounts => {

  // test token deployment and address storement
  it("should deploy token and store the address", async () => {
    let instance = await CAJCoin.deployed();
    let instanceSale = await Crowdsale.deployed();
    
    assert(instance, 'token addr couldn\'t be stored');
    assert(instanceSale, 'token addr couldn\'t be stored');
  });

  // test correct crowdsale deployment; accurate store of constructer params
  it("checks for crowdshare deployment", async () => {
    let instance = await CAJCoin.deployed();
    let crowdsale = await Crowdsale.deployed();

    let rateSuccess = await crowdsale.rate();
    // let tokenSuccess = await crowdsale.token();
    // let walletSuccess = await crowdsale.wallet();

    assert.equal(rateSuccess, 1, 'exchange rate incorrectly stored');
    // assert.equal(tokenSuccess, instance.address, 'incorrect token being sold');
    // assert.equal(walletSuccess, instance.address);
  });

  // test amount of wei raised
  it("sanity test: should return total wei raised so far", async () => {
    let crowdsale = await Crowdsale.deployed();

    let wei = await crowdsale.weiRaised();
    assert.equal(wei, 0, 'does not start with initial zero value')
  });

  // test for getter function of token amount
  // it("should return wei equivalent in token amount", async () => {
  //   let crowdsale = await Crowdsale.deployed();
  //   let exSuccess = await _getTokenAmount(crowdsale, 100);

  //   assert(exSuccess, 'exchanged wei into token equivalent incorrectly');
  // });

  // test token purchase
  it("should run through multiple internal calls to validate token purchase", async () => {
    let coin = await CAJCoin.deployed();
    let crowdsale = await Crowdsale.deployed();

    let a1 = accounts[1];
    let a2 = accounts[2];

    let transfer = await coin.transfer(a1, 1000);
    let transferSuccess = await coin.balanceOf.call(a1);
    assert.equal(transferSuccess, 1000), 'transfer from token pool to account 1 failed';

    let purchase = await crowdsale.buyTokens(a1);
    assert(purchase, 'did not fulfill validation internal tests')
    // let prevalSuccess = await crowdsale._preValidatePurchase(a1, 25);
    // assert(prevalSuccess, 'token addr couldn\'t be stored');
  });

});