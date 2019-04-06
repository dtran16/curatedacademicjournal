pragma solidity ^0.5.0;

contract Review {
    //Paper
    struct Paper {
        uint id;
        string location; // maybe change later
        string title;
        uint numTokens;
        string[] tags;
        address author;
    }

    // paper ids to paper objects
    mapping(uint => Paper) private papers;
    uint[] private ready;
    uint[] private notReady; //ids of papers not ready to be reviewed

    mapping(address => uint) private inProgress; //limiting the number of papers to 1 per person for now

    uint limit;
    uint currentId; //next id to be assigned

    // constructor
    function Review (uint threshold) public {
        // to be filled in
        limit = threshold;
        currentId = 0;
    }

    function addPaper(string memory _title, string memory _location, ) private { // whats the thing with memory again?

    }

    function stake(uint _id) public onlyOnce {
        papers[_id].numTokens++;

        if (papers[_id].numTokens >= limit) {
            notReady.
        }
    }

    //getter methods
    

}
