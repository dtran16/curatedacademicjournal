pragma solidity ^0.5.0;

contract Review {
    //Paper
    struct Paper {
        uint id;
        string location; // maybe change later
        string title;
        uint numTokens;
        //string[] tags;
        address author;
        bool ready;
    }

    // paper ids to paper objects
    mapping(uint => Paper) private papers;
    uint[] storage private ready; // papers ready to be reviewed [dynamically sized storage array [searched from the solidity documentation]]

    mapping(address => uint) private inProgress; //limiting the number of papers to 1 per person for now

    uint limit; // if limit is reached then it is ready to be reviewed
    uint currentId; //next id to be assigned

    // constructor
    function Review (uint threshold) public {
        // to be filled in
        limit = threshold;
        currentId = 0;
    }

    function addPaper(string memory _title, string memory _location) public { // whats the syntax with memory again?
        require(inProgress[msg.sender] == 0) //semicolon? makes sure that person adding paper does not have another paper curently in review
        papers[currentId] = Paper(currentId, _location, _title, 0, msg.sender, false);
        currentId++;
    }

    function stake(uint _id) public {
        require(papers[_id].ready == false) //must not currently be in review
        Paper p = papers[_id];
        p.numTokens += tx.gasprice; // value of tokens stake depends on gas price of operation

        if (p.numTokens >= limit) { //if limit reached, it is ready to be reviewed
            ready.push(_id);
            p.ready = true;
        }
    }

    //getter methods
    function getLimit() public returns (uint) {
        return limit;
    }
    function isReady(_id) public returns (bool) {
        return paper[_id].ready;
    }
    function getAuthor(_id) public returns (string) {
        return paper[_id].author;
    }
    function getTitle(_id) public returns (string) {
        return paper[_id].title;
    }
    function getNumTokens(_id) public returns (uint) {
        return paper[_id].numTokens;
    }

}
