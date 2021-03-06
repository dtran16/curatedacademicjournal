pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;
import "./CAJCoin.sol";

contract Review {

    //token contract
    CAJCoin tokenContract;

    address public devAddress;

    //Paper struct
    struct Paper {
        //id of the paper
        uint256 id;
        //file url of paper
        string location;
        //title of paper
        string title;
        //paper tags
        string[] tags;
        //comments
        string[] comments;
        // addr uploader of paper
        address author;
        //name of author & creds
        string authorNameCreds;
        //id of previous paper if this is a revision
        uint256 prevId;
        //id of nect paper if this is an old copy
        uint256 nextId;
        //state of the paper,
        //(0 unreviewed, 1 ready for review, 2 under review (only professionals can review), 3 published, 4 old version of a different paper, 5 for dead)
        uint state;
        //vote related stuff
        uint256 userVotes;
        uint256 userScore;
        uint reviewerVotes;
        uint reviewerScore;
        //date
        uint256 date;

    }

    // paper ids to paper objects
    mapping(uint256 => Paper) private papers;

    //mapping of addresses to booleans representing wether an address is "verified"
    mapping(address => bool) private verifiedUsers;

    //constant; max number of professional reviewers until paper is pushed to being reviewed and published
    uint256 NUMBER_OF_REVIEWERS = 10;

    //mapping of an address to the topics the verified user is allowed to review
    mapping(address => string[]) allowedReviewerTopics;

    //mapping of reviewers currently reviewing a paper
    mapping(uint256 => address[]) private reviewersForPaper;

    //track if reviewers and users have alreayd voted on a paper
    mapping(uint256 => mapping(address => bool)) private reviewerHasVoted;
    mapping(uint256 => mapping(address => bool)) private userHasVoted;

    //next id to be assigned
    uint256 private currentId;


    // constructor
    constructor() public {//(uint threshold) public {
        // 0 is used as a null value for ids
        currentId = 1;
        devAddress = msg.sender;
        verifiedUsers[devAddress] = true;
        /* string memory _title = "Sample Paper 1";
        string memory _location = "";
        string[] memory _tags;
        _tags[0] = "anime";
        _tags[1] = "deep learning";
        string memory _authorNameCreds = "Joe Broder";
        uint256 _prevId = 0;
        //papers[1] = Paper(currentId, _location, _title, _tags, new string[](0), msg.sender, _authorNameCreds, _prevId, 0, 0, 0, 0, 0, 0, block.timestamp);
        verifiedUsers[devAddress] = true;
        currentId++;

        string memory yeet1 = "Sample Paper 2";
        string memory yeet2 = "";
        string[] memory t;
        t[0] = "anime";
        t[1] = "deep learning";
        string memory yeet3 = "Olivia Lee";
        uint256 yeet4 = 0;
        //papers[2] = Paper(currentId, yeet2, yeet1, t, new string[](0), msg.sender, yeet3, yeet4, 0, 0, 0, 0, 0, 0, block.timestamp);
        currentId++;

       string memory one = "Sample Paper 3";
       string memory two = "";
       string[] memory more;
       more[0] = "anime";
       more[1] = "deep learning";
       string memory three = "Jen Hu, Susan Lin";
       uint256 four = 0;
       //papers[3] = Paper(currentId, two, one, more, new string[](0), msg.sender, three, four, 0, 0, 0, 0, 0, 0, block.timestamp);
       currentId++; */

    }

    function sample () public returns (bool) {
        string memory _title = "Sample Paper 1";
        string memory _location = "";
        string[] memory _tags;
        _tags[0] = "anime";
        _tags[1] = "deep learning";
        string memory _authorNameCreds = "Joe Broder";
        uint256 _prevId = 0;
        papers[1] = Paper(currentId, _location, _title, _tags, new string[](0), msg.sender, _authorNameCreds, _prevId, 0, 0, 0, 0, 0, 0, block.timestamp);
        currentId++;

        string memory yeet1 = "Sample Paper 2";
        string memory yeet2 = "";
        string[] memory t;
        t[0] = "anime";
        t[1] = "deep learning";
        string memory yeet3 = "Olivia Lee";
        uint256 yeet4 = 0;
        papers[2] = Paper(currentId, yeet2, yeet1, t, new string[](0), msg.sender, yeet3, yeet4, 0, 0, 0, 0, 0, 0, block.timestamp);
        currentId++;

       string memory one = "Sample Paper 3";
       string memory two = "";
       string[] memory more;
       more[0] = "anime";
       more[1] = "deep learning";
       string memory three = "Jen Hu, Susan Lin";
       uint256 four = 0;
       papers[3] = Paper(currentId, two, one, more, new string[](0), msg.sender, three, four, 0, 0, 0, 0, 0, 0, block.timestamp);
       currentId++;
       return true;
    }


    //getter for current ID; actually the next id to be assigned
    function getCurrentID() public returns (uint256 id) {
        return currentId;
    }

    //check if a paper exists
    function paperExists(uint256 _id) public returns (bool exists) {
        return _id < getCurrentID() && _id > 0;
    }

    // add a new paper with the specified fields
    function addPaper(string memory _title, string memory _location, string[] memory _tags, string memory _authorNameCreds, uint256 _prevID) public returns (bool success) {
        if (_prevID == 0 ||
            (msg.sender == papers[_prevID].author) && papers[_prevID].state < 3) {
                papers[currentId] = Paper(currentId, _location, _title, _tags, new string[](0), msg.sender, _authorNameCreds, _prevID, 0, 0, 0, 0, 0, 0, block.timestamp);
                if (_prevID != 0) {
                    papers[_prevID].nextId = currentId;
                    papers[currentId].state = papers[_prevID].state;
                    papers[_prevID].state = 4;
                }
                currentId++;
                return true;
        }
        return false;
    }

    //getter methods for papers
    function getPaperTitle(uint256 _id) public returns (string memory) {
        string memory title = papers[_id].title;
        return title;
    }

    function getPaperLocation(uint256 _id) public returns (string memory location) {
        location = papers[_id].location;
    }

    function getPaperTags(uint256 _id) public returns (string[] memory tags) {
        tags = papers[_id].tags;
    }

    function getPaperComments(uint256 _id) public returns (string[] memory comments) {
        comments = papers[_id].comments;
    }

    function getPaperAuthor(uint256 _id) public returns (address author) {
        author = papers[_id].author;
    }

    function getPaperAuthorName(uint256 _id) public returns (string memory author) {
        author = papers[_id].authorNameCreds;
    }

    function getPaperPrevId(uint256 _id) public returns (uint256 prevId) {
        prevId = papers[_id].prevId;
    }

    function getPaperNextId(uint256 _id) public returns (uint256 nextId) {
        nextId = papers[_id].nextId;
    }

    function getPaperState(uint256 _id) public returns (uint256 state) {
        state = papers[_id].state;
    }

    function getPaperVotes(uint256 _id) public returns (uint256[4] memory votes) {
        votes = [papers[_id].userScore, papers[_id].userVotes, papers[_id].reviewerScore, papers[_id].reviewerVotes];
    }

    function getPaperDate(uint256 _id) public returns (uint256 date) {
        date = papers[_id].date;
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
        string[] memory topics = allowedReviewerTopics[msg.sender];
        string[] memory tags = papers[_id].tags;
        for (uint i = 0; i < topics.length; i++) {
            for (uint j = 0; j < tags.length; i++) {
                if (true) {
                    reviewersForPaper[_id].push(msg.sender);
                    if (reviewersForPaper[_id].length == NUMBER_OF_REVIEWERS) {
                        papers[_id].state = 2; //now, only professionals can review this paper
                    }
                    return true;
                }
            }
        }
        return false;
    }

    //comment on papers
    function addComment(uint256 _id, string memory _comment) public returns (bool success) {
        assert(bytes(_comment).length > 10);
        if (papers[_id].state < 3) {
            //if the paper is under review, only reviewers can comment
            if(papers[_id].state == 2) {
                address[] memory reviewers = reviewersForPaper[_id];
                bool x = false;
                for (uint i = 0; i < reviewers.length; i++) {
                    if (msg.sender == reviewers[i]) {
                        x = true;
                        break;
                    }
                }

                if (x) {
                    papers[_id].comments.push(_comment);
                }
                return x;
            } else {
                papers[_id].comments.push(_comment);
                return true;
            }
        }
        return false;
    }

    //get reviewers for a paper
    function getReviewersForPaper(uint256 _id) public returns (address[] memory reviewers) {
        reviewers = reviewersForPaper[_id];
    }

    //get topics for reviewer
    function getTopicsForReviewer(address _reviewer) public returns (string[] memory topics) {
        topics = allowedReviewerTopics[_reviewer];
    }

    //verify a user, only the dev account can do this because we onboard them
    function addVerifiedUser(address _user) public returns (bool success) {
        if (msg.sender == devAddress) {
            verifiedUsers[_user] = true;
            return true;
        }
        return false;
    }

    // reset the topics for a reviewer, only dev can do this
    function addTopicsForReviewer(address _user, string[] memory _topics) public returns (bool success) {
        if (msg.sender == devAddress) {
            allowedReviewerTopics[_user] = _topics;
            return true;
        }
        return false;
    }

    //reviewer votes on a paper
    function reviewerVoteOnPaper(uint256 _id, bool vote) public returns (bool success) {
        assert(verifiedUsers[msg.sender]);
        assert(reviewerHasVoted[_id][msg.sender] == false);
        address[] storage reviewers = reviewersForPaper[_id];
        bool x = false;
        for (uint i = 0; i < reviewers.length; i++) {
            if (msg.sender == reviewers[i]) {
                x = true;
                break;
            }
        }

        if (x) {
            papers[_id].reviewerVotes += 1;
            if (vote) {
                papers[_id].reviewerScore += 1;
            }

            //check if paper is to be published or killed yet and distribute tokens
            if(papers[_id].reviewerScore >= 10 ||
                (papers[_id].reviewerScore < 10 && papers[_id].reviewerVotes == NUMBER_OF_REVIEWERS)) {
                if (papers[_id].reviewerScore >= 10) {
                    //publish
                    papers[_id].state = 3;
                } else {
                    //kill
                    papers[_id].state = 5;
                }
                //distribute tokens
                uint256 amountToDistriute = getNumTokens(_id) / NUMBER_OF_REVIEWERS;
                for (uint i = 0; i < reviewers.length; i++) {
                    x = tokenContract.collectTokens(_id, reviewers[i], amountToDistriute);
                }
            }
        }
        return x;
    }

    // vote function updates given paper (passed in id) with the vote associated with the msg.sender
    // method guards against double voting and staying within voting range [0, 10]
    function userVoteOnPaper(uint256 _id, uint256 _vote, uint256 _amount) public returns (bool success) {
        assert(_id < currentId);
        assert(_vote > 0 && _vote <= 10);
        assert(!userHasVoted[_id][msg.sender]);
        if (_amount < 1) {
            return false;
        }
        stakeTokens(_id, _amount);
        papers[_id].userScore += _vote;
        papers[_id].userVotes += 1;
        return true;
    }

    // stake tokens onto an existing paper (staked token value contributes to review process)
    function stakeTokens(uint256 _id, uint256 _amount) private returns (bool success) {
        assert(paperExists(_id));
        assert(papers[_id].state == 0);
        assert(_amount >= 1);
        success = tokenContract.stakeTokens(msg.sender, _id, _amount);

    }

    // revokes all of a user's tokens from an old revision of a paper
    function revokeTokens(uint256 _id) public returns (bool success) {
        require(papers[_id].state == 4); //old draft or unreviewed
        uint256 amount = tokenContract.tokensStakedByUser(_id, msg.sender);
        return tokenContract.collectTokens(_id, msg.sender, amount);
    }

    //get current number of tokens for a paper
    function getNumTokens(uint256 _id) public returns (uint256) {
        return tokenContract.paperBalance(_id);
    }

    function setContract(address addr) public {
        assert(msg.sender == devAddress);
        tokenContract = CAJCoin(addr);
    }

}
