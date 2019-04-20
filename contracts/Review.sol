pragma solidity ^0.5.0;
import "./Token.sol";
//CHANGED I MADE
//within the Paper struct I added state, which will be either 0, 1, 2, 3, 4
//represents 3 states of paper (0 unreviewed, 1 ready for review, 2 under review, 3 published, 4 old version of a different paper)
//this is just a safegaurd for manipulating values we shouldn't
//removed the value representing tokens staked on a paper because we can get this form the token contract
contract Review {
    
    //token contract
    CAJToken tokenContract;

    //Paper struct
    struct Paper {
        //id of the paper
        uint256 id;
        //file url of paper
        string location; // maybe change later
        //title of paper
        string title;
        //paper tags
        string[] tags;
        //comments
        string[] comments;
        //uploader of paper
        address author;
        //id of previous paper if this is a revision
        uint256 prevId;
        //id of nect paper if this is an old copy
        uint256 nextId;
        //state of the paper,
        //(0 unreviewed, 1 ready for review, 2 under review, 3 published, 4 old version of a different paper)
        uint state;
        //number of tokens staked on paper, this will be saved after tokens are collected because it's a search param possily idk?
        uint256 score;
    }

    // paper ids to paper objects
    mapping(uint256 => Paper) private papers;

    uint[] private ready; // papers ready to be reviewed [dynamically sized storage array [searched from the solidity documentation]]
    //mapping(address => uint) private inProgress; //limiting the number of papers to 1 per person for now
    //uint limit; // if limit is reached then it is ready to be reviewed

    //mapping of addresses to booleans representing wether an address is "verified"
    mapping(address => bool) private verifiedUsers;
    //address of the account uploader
    address devAddress;
    //mapping of an address to the topics the verified user is allowed to review
    mapping(address => string[]) allowedReviewerTopics;
    //mapping of reviewers currently reviewing a paper
    mapping(uint256 => address[]) private reviewersForPaper;
    //next id to be assigned
    uint256 private currentId; 
    

    // constructor
    function Review() public {//(uint threshold) public {
        // 0 is used as a null value for ids
        currentId = 1;
        // impliment some sort of limit on staking tokens
    }

    //getter for current ID
    function getCurrentID() public returns (uint256) {
        return currentId;
    }

    // add a new paper with the specified fields
    // if the added paper is a revision, transfer over the tokens and set the peoper values accordingly
    function addPaper(string memory _title, string memory _location, uint256 _prevID) public returns (bool success) { // whats the syntax with memory again?
        //require(inProgress[msg.sender] == 0); //semicolon? makes sure that person adding paper does not have another paper curently in review
        if (msg.sender == papers[_prevID].author ||
            _prevID == 0) {
                papers[currentId] = Paper(currentId, _location, _title, [], [], msg.sender, 0, _prevID, 0);
                if (_prevID != 0) {
                    papers[prevID].nextId = currentId;
                    tokenContract.transferPapers(_prevID, currentId, getNumTokens(_prevID));
                }
                currentId++;
                return true;
        }
        return false;
    }

    //gte paper with id, otherwise return null object
    function getPaper(_id) public returns (uint, string, string, string[], string[], address, uint, uint, uint, uint256) {
        if (currentId > _id) {
            Paper p = papers[_id];
            return (p.id, p.location, p.title, p.tags, p.comments, p.author, p.nextId, p.prevId, p.state, p.score);
        } else {
            return (0, "", "", [], [], 0, 0, 0, 0, 0);
        }
        
    }

    //get reviewers for a paper
    function getReviewersForPaper(uint256 _id) public returns (string[]) {
        return reviewersForPaper[_id];
    }

    //get topics for reviewer
    function getTopicsForReviewer(address _reviewer) public returns (string[] topics) {
        return allowedReviewerTopics[_reviewer];
    }

    //verify  a user, only the dev account can do this
    function addVerifiedUser(address _user) public returns (bool success) {
        if (msg.sender == devAddress) {
            verifiedUSers[_user] = true;
            return true;
        } else {
            return false;
        }
    }

    // reset the topics for a reviewer, only dev can do this
    function addTopicsForReviewer(string[] _topics) public returns (bool success) {
        if (msg.sender == devAddress) {
            allowedReviewerTopics[_user] = _topics;
            return true;
        } else {
            return false;
        }
    }

    ///TODO
    //impliment staking tokens HERE, and some sort of limit for number of tokens that can be staked
    //impliment reviewers signing up for papers (possibly a set number of reviewers?)
    //impliment functions for the review process itself, and then distributing tokens
    //make sure the state of papers is managed accordingly

    // notes
    //I removed the 1 per person rule for now
    //assume the token stuff works it just needs to be tested
    //to handle tokens stuff you can interface with the token contract

    //get current number of tokens for a paper
    function getNumTokens(_id) public returns (uint256) {
        papers[_id].score = tokenContract.paperBalance(_id);
        return tokenContract.paperBalance(_id);
    }

}
