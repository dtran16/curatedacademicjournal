pragma solidity ^0.5.0;
//CHANGED I MADE
//within the Paper struct I added state, which will be either 0, 1, 2, 3, 4
//represents 3 states of paper (0 unreviewed, 1 ready for review, 2 under review, 3 published, 4 old version of a different paper)
//this is just a safegaurd for manipulating values we shouldn't
//removed the value representing tokens staked on a paper because we can get this form the token contract
contract Review {

    //Paper
    struct Paper {
        uint id;
        string location; // maybe change later
        string title;
        //uint numTokens;
        string[] tags;
        string[] comments;
        address author;
        uint prevId;
        uint nextId;
        uint state;
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
        currentId = 1;
    }

    function addPaper(string memory _title, string memory _location) public { // whats the syntax with memory again?
        require(inProgress[msg.sender] == 0) //semicolon? makes sure that person adding paper does not have another paper curently in review
        papers[currentId] = Paper(currentId, _location, _title, [], [], msg.sender, 0, 0, 0);
        currentId++;
    }

    //THIS CAN BE DONE BY USING THE TOKEN CONTRACT
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
    // function getLimit() public returns (uint) {
    //     return limit;
    // }
    // function state(_id) public returns (bool) {
    //     return paper[_id].state;
    // }
    // function getAuthor(_id) public returns (string) {
    //     return paper[_id].author;
    // }
    // function getTitle(_id) public returns (string) {
    //     return paper[_id].title;
    // }

    function getPaper(_id) public returns (uint, string, string, string[], string[], address, uint, uint, uint) {
        Paper p = papers[_id];
        return (p.id, p.location, p.title, p.tags, p.comments, p.address, p.nextId, p.prevId, p.state)
    }
        

    //this can be done using the token contract
    function getNumTokens(_id) public returns (uint) {
        //return paper[_id].numTokens;
    }

}
