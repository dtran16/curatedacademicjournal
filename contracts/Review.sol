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
        //name of author & creds
        string authorNameCreds;
        //id of previous paper if this is a revision
        uint256 prevId;
        //id of nect paper if this is an old copy
        uint256 nextId;
        //state of the paper,
        //(0 unreviewed, 1 ready for review, 2 under review, 3 published, 4 old version of a different paper, 5 for dead)
        uint state;
        //Rating of paper involves 2 values, number of raters and the score. we divide these to get the rating
        //why do we do this?
        //solidity doesn't support floats
        //why doesn't it support floats?
        //i have no fucking clue
        uint256 userVotes;
        uint256 userScore;
        uint reviewerScore;
        uint reviewerVotes;
        //date
        uint256 date;
    
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
    //constant
    int NUMBER_OF_REVIEWERS = 15;
    //mapping of an address to the topics the verified user is allowed to review
    mapping(address => string[]) allowedReviewerTopics;
    //mapping of reviewers currently reviewing a paper
    mapping(uint256 => address[]) private reviewersForPaper;
    //track if reviewers have alreayd voted on a paper
    mapping(uint256 => mapping(address => bool)) private reviewerHasVoted;
    mapping(uint256 => mapping(address => bool)) private userHasVoted;
    //next id to be assigned
    uint256 private currentId; 
    

    // constructor
    function Review() public {//(uint threshold) public {
        // 0 is used as a null value for ids
        currentId = 1;
        // impliment some sort of limit on staking tokens
    }

    //getter for current ID
    function getCurrentID() public returns (uint256 id) {
        return currentId;
    }

    //check if a paper exists
    function paperExists(_id) private returns (bool exists) {
        return _id < getCurrentID();
    }

    // add a new paper with the specified fields
    function addPaper(string memory _title, string memory _location, uint256 _prevID) public returns (bool success) { 
        if (_prevID == 0 ||
            (msg.sender == papers[_prevID].author) && papers[_prevID].state < 3) {
                papers[currentId] = Paper(currentId, _location, _title, [], [], msg.sender, 0, _prevID, 0);
                if (_prevID != 0) {
                    papers[_prevID].nextId = currentId;
                    papers[currentID].state = papers[_prevID].state;
                    papers[_prevID].state = 4;
                }
                currentId++;
                return true;
        }
        return false;
    }

    //get paper with id, otherwise return null object
    function getPaper(_id) public returns (uint id, string location, string title, string[] tags, string[] comments, address author, uint nextID, uint prevID, uint state, uint256 rating) {
        if (currentId > _id) {
            Paper p = papers[_id];
            return (p.id, p.location, p.title, p.tags, p.comments, p.author, p.nextId, p.prevId, p.state, p.rating);
        } else {
            return (0, "", "", [], [], 0, 0, 0, 0, 0);
        }
        
    }

    //user signs up to review a paper
    function addReviewerForPaper(uint256 _id) public returns (bool success) {
        //first check if the paper can take more reviewers
        assert(_id < currentId);
        assert(papers[_id].state == 0);
        assert(reviewersForPaper[_id].length < NUMBER_OF_REVIEWERS);
        //check if user is a reviewer
        assert(verifiedUsers[msg.sender]);
        //check for tags, and if they match, add the user and return true
        //if this would reach the limit, change the state of the paper as well
        for (int i = 0; i < allowedReviewerTopics[msg.sender].length; i++) {
            for (int j = 0; j < papers[_id].tags; i++) {
                if (i == j) {
                    reviewersForPaper[_id].push(msg.sender);
                    if (reviewersForPaper[_id].length == NUMBER_OF_REVIEWERS) {
                        papers[_id].state = 2;
                    }
                    return true;
                }
            }
        }
        return false;
    }

    //comment on papers
    function addComment(uint256 _id, string _comment) public returns (bool success) {
        assert(comment.length > 10);
        if (papers[_id].state < 3) {
            if(papers.state == 2) {
               address[] reviewers = reviewersForPaper[_id];
                bool x = false;
                for (int i = 0; i < reviewers.length; i++) {
                    if (msg.sender == [reviewers[i]]) {
                        x = true;
                        break;
                    }
                }
                if (x == false) {
                    return false;
                } else {
                    paper[_id].comments.push(_comment);
                    return true;
                } 
            } else {
                paper[_id].comments.push(_comment);
            }
        }
        return false;
    }

    //get reviewers for a paper
    function getReviewersForPaper(uint256 _id) public returns (string[] reviewers) {
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

    //reviewerVoteOnPaper
    function reviewerVoteOnPaper(uint256 _id, bool vote) private returns (bool success) {
        assert(verifiedUsers[msg.sender]);
        assert(!reviwerHasVoted[_id][msg.sender]);
        address[] reviewers = reviewersForPaper[_id];
        bool x = false;
        for (int i = 0; i < reviewers.length; i++) {
            if (msg.sender == [reviewers[i]]) {
                x = true;
                break;
            }
        }
        if (x == false) {
            return false;
        }
        papers[_id].reviewerVotes += 1;
        if (vote) {
            papers[_id].reviewerScore += 1;
        }

        //check if paper is to be published or killed yet and distribute tokens
        if(papers[_id].reviewerScore >= 10 ||
            (papers[_id].reviewerScore < 10 && papers[_id].reviewerVotes)) {
            if (papers[_id].reviewerScore >= 10) {
                //publish
                papers[_id].state = 3;
            } else {
                //kill
                papers[_id].state = 5;
            }
            //distribute tokens
            uint256 amountToDistriute = getNumTokens(_id) / 15;
            for (int i = 0; i < reviewers.length; i++) {
                tokenContract.collectTokens(_id, reviewers[i], amountToDistriute);
            }
        } 
        return true;   
    }

    //userVoteOnPaper
    function userVoteOnPaper(uint256 _id, uint256 _vote) returns (bool success) {
        assert(_id < currentId);
        assert(_vote > 0 && _vote <= 10);
        assert(!userHasVoted[_id][msg.sender]);
        papers[_id].userScore += _vote;
        papers[_id].userVotes += 1;
        return true;
    }

    //stake tokens
    function stakeTokens(uint256 _id, uint256 _amount) public returns (bool success) {
        assert(paperExists(_id));
        assert(papers[_id].state == 0);
        assert(_amount >= 1);
        bool success = tokenContract.stakeTokens(msg.sender, _id, _amount);
        return success;
    }

    //revokes all of a user's tokens from an old revision of a paper
    function revokeTokens(uint256 _id) public returns (bool success) {
        require(papers[_id].state == 4 || papers[_id].state == 0);
        uint256 amount = tokenContract.tokensStakedByUser(_id, msg.sender);
        return tokenContract.collectTokens(_id, msg.sender, tokenContract, amount);
    }

    //get current number of tokens for a paper
    function getNumTokens(_id) public returns (uint256) {
        return tokenContract.paperBalance(_id);
    }

}
