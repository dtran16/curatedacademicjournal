var Cont = artifacts.require("Review");

function listEq(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

contract("Review", async accounts => {
  it("should add and access paper", async () => {
    let instance = await Cont.deployed();
    let acct = accounts[0];
    let paper = await instance.addPaper("Dylan's Research Paper", "URL", ["Blockchain", "second"], "Dylan", 0, { from: acct });
    let name = await instance.getPaperTitle.call(1);
    assert.equal(name.toString(), "Dylan's Research Paper");
    let loc = await instance.getPaperLocation.call(1);
    assert.equal(loc.toString(), "URL");
    let tags = await instance.getPaperTags.call(1);
    assert(listEq(tags, ["Blockchain", "second"]));
    let comments = await instance.getPaperComments.call(1);
    assert(listEq(comments, []));
    let author = await instance.getPaperAuthor.call(1);
    assert.equal(author, acct);
    let authorName = await instance.getPaperAuthorName.call(1);
    assert.equal(authorName, "Dylan");
    let prevId = await instance.getPaperPrevId.call(1);
    assert.equal(prevId, 0);
    let nextId = await instance.getPaperNextId.call(1);
    assert.equal(nextId, 0);
    let state = await instance.getPaperState.call(1);
    assert.equal(state, 0);
    let votes = await instance.getPaperVotes.call(1);
    for (var i = 0; i < votes.length; i++) {
        assert.equal(votes[i], 0);
    }
    let res = await instance.paperExists.call(3);
    assert(!res);
    res = await instance.paperExists.call(1);
    assert(res);
  });

  it("testing getting/adding reviewers and topics, comments", async () => {
      let instance = await Cont.deployed();
      let acct = accounts[0];
      let paper = await instance.addPaper("Dylan's Research Paper", "URL", ["Blockchain", "second"], "Dylan", 0, { from: acct });
      let res = await instance.addReviewerForPaper(1);
      

    let outCoinBalance = await meta.getBalance.call(accounts[0]);
    let metaCoinBalance = outCoinBalance.toNumber();
    let outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    let metaCoinEthBalance = outCoinBalanceEth.toNumber();
    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance);
  });

  it("testing voting, coin stuff", async () => {
    // Get initial balances of first and second account.
    let account_one = accounts[0];
    let account_two = accounts[1];

    let amount = 10;

    let instance = await MetaCoin.deployed();
    let meta = instance;

    let balance = await meta.getBalance.call(account_one);
    let account_one_starting_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    let account_two_starting_balance = balance.toNumber();
    await meta.sendCoin(account_two, amount, { from: account_one });

    balance = await meta.getBalance.call(account_one);
    let account_one_ending_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    let account_two_ending_balance = balance.toNumber();

    assert.equal(
      account_one_ending_balance,
      account_one_starting_balance - amount,
      "Amount wasn't correctly taken from the sender"
    );
    assert.equal(
      account_two_ending_balance,
      account_two_starting_balance + amount,
      "Amount wasn't correctly sent to the receiver"
    );
  });
});
