var Cont = artifacts.require("Review");
var Token = artifacts.require("CAJCoin");

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
      let res = await instance.addReviewerForPaper.call(1);
      assert(!res);
      let addTopic = await instance.addTopicsForReviewer(acct, ["Blockchain"]);
      let reviewerTopics = await instance.getTopicsForReviewer.call(acct);
      assert(listEq(reviewerTopics, ["Blockchain"]));
      res = await instance.addReviewerForPaper(1);
      let reviewers = await instance.getReviewersForPaper.call(1);
      assert(listEq(reviewers, [acct]));
      let add = await instance.addVerifiedUser(accounts[1], { from: acct });
      res = await instance.addTopicsForReviewer(accounts[1], ["Blockchain"]);
      res = await instance.addReviewerForPaper(1, { from: accounts[1]});
      reviewers = await instance.getReviewersForPaper.call(1);
      assert(listEq(reviewers, [acct, accounts[1]]))
      res = await instance.addComment(1, "good paper! it was really nice");
      let comment = await instance.getPaperComments.call(1);
      assert(listEq(comment, ["good paper! it was really nice"]));
  });

  it("testing voting, coin stuff", async () => {
      let instance = await Cont.deployed();
      let tokenInstance = await Token.deployed();
      let res = await instance.setContract(tokenInstance.address);
      res = await tokenInstance.setContract(instance.address);
      let acct = accounts[0];
      let paper = await instance.addPaper("Dylan's Research Paper", "URL", ["Blockchain", "second"], "Dylan", 0, { from: acct });
      let addTopic = await instance.addTopicsForReviewer(acct, ["Blockchain"]);
      res = await instance.addReviewerForPaper(1);
      let bal = await tokenInstance.balanceOf.call(accounts[1]);
      res = await tokenInstance.transfer(accounts[1], 1000, { from: acct });
      bal = await tokenInstance.balanceOf.call(accounts[1]);
      res = await instance.userVoteOnPaper(1, 8, 5, { from: accounts[1] });
      let votes = await instance.getPaperVotes.call(1);
      assert.equal(votes[0], 8);
      assert.equal(votes[1], 1);
      let pbalance = await instance.getNumTokens.call(1);
      assert.equal(pbalance, 5, "wtf");
      let currbal = await tokenInstance.balanceOf.call(accounts[1]);
      assert.equal(currbal.toNumber(), bal.toNumber()-5, "voting failed");
      let newpaper = await instance.addPaper("Dylan's New Research Paper", "URL", ["Blockchain", "second"], "Dylan", 1, { from: acct });
      let retbal = await instance.revokeTokens(1, { from: accounts[1]});
      currbal = await tokenInstance.balanceOf.call(accounts[1]);
      assert.equal(bal.toNumber(), currbal.toNumber(), "revoke failed");
      res = instance.userVoteOnPaper(2, 8, 20);
      currbal = await instance.getNumTokens.call(2);
      assert.equal(currbal, 20, "wrong paper balance");
      for (var i = 1; i < 10; i++) {
          res = await instance.addVerifiedUser(accounts[i], { from: acct });
          let res1 = await instance.addTopicsForReviewer(accounts[i], ["Blockchain"], { from: acct });
          let res2 = await instance.addReviewerForPaper(2, { from: accounts[i] });
          let res3 = await instance.reviewerVoteOnPaper(2, true, { from: accounts[i] });
      }
      res = instance.addReviewerForPaper(2, { from: acct });
      res3 = await instance.reviewerVoteOnPaper(2, true, { from: acct });
      let state = await instance.getPaperState.call(2);
      assert.equal(state, 3, "wrong state");
      res = await tokenInstance.transfer(acct, 1000, { from: accounts[1] });
      for (var i = 1; i < 10; i++) {
          currbal = await tokenInstance.balanceOf.call(accounts[i]);
          assert.equal(currbal.toNumber(), 2, "balance wrong after reimbursement");
      }


  });
});
