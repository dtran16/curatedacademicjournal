const CAJCoin = artifacts.require("CAJCoin");

contract("CAJCoin Tests", async accounts => {

  //test that the total supply is initiated correctly
  it("should put 10000 caj in the first account", async () => {
    let instance = await CAJCoin.deployed();
    let balance = await instance.balanceOf.call(accounts[0]);
    assert.equal(balance.toString(), '1000000000000000000000000');
  });

  //test that tokens transfer correctly with a valid number of tokens
  it("test transfer 1000 CAJ from account 0 to 1", async () => {
    let instance = await CAJCoin.deployed();
    let success = await instance.transfer(accounts[1], 1000);
    let bal = await instance.balanceOf.call(accounts[1]);
    assert.equal(bal, 1000);
  });

  //test that tokens transfer correctly with an invalid number of tokens
  it("test transfer 1000 CAJ from account 1 to 2", async () => {
    let instance = await CAJCoin.deployed();
    let success = await instance.transfer(accounts[2], 10000, {from: accounts[1]});
    let bal = await instance.balanceOf.call(accounts[2]);
    assert.equal(bal, 0);
  });

  //test that tokens dont transfer from non allowed accounts
  it("test transfering fron an unalowed account", async () => {
    let instance = await CAJCoin.deployed();
    let success = await instance.transferFrom(accounts[1], accounts[2], 10000);
    let bal = await instance.balanceOf.call(accounts[2]);
    assert.equal(bal, 0);
  });

  //test that tokens transfer from allowed accounts within allowance
  it("test transfering fron an allowed account, under the limit", async () => {
    let instance = await CAJCoin.deployed();
    let approve = await instance.approve(accounts[0], 1000, {from: accounts[1]})
    let success = await instance.transferFrom(accounts[1], accounts[2], 100);
    let bal = await instance.balanceOf.call(accounts[2]);
    assert.equal(bal, 100);
  });

  //test that tokens dont transfer from allowed accounts outside of allowance
  it("test transfering fron an allowed account, over the limit", async () => {
    let instance = await CAJCoin.deployed();
    let success = await instance.transferFrom(accounts[1], accounts[2], 10000);
    let bal = await instance.balanceOf.call(accounts[2]);
    assert.equal(bal, 100);
  });

  //test that initial paperbalance is 0
  it("test paperBalance", async () => {
    let instance = await CAJCoin.deployed();
    let bal = await instance.paperBalance.call(1);
    assert.equal(bal, 0);
  });

  ///test that initial tokens staked by user is 0
  it("test tokensStakedByUser", async () => {
    let instance = await CAJCoin.deployed();
    let bal = await instance.paperBalance.call(accounts[0]);
    assert.equal(bal, 0);
  });
});
