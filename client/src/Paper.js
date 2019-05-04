//Datatype for papers
class Paper {
    constructor(id, location, title, numtokens, tags, authorAddress, authorName, 
                prevId, nextId, state, userScore, reviewerScore, date) {
        this.id = id;
        this.location = location;
        this.title = title;
        this.numtokens = numtokens;
        this.tags = tags;
        this.authorAddress = authorAddress;
        this.authorName = authorName;
        this.prevId = prevId;
        this.nextId = nextId;
        this.state = state;
        this.userScore = userScore;
        this.reviewerScore = reviewerScore;
        this.date = date;
    }

    //update the paper
    // update = async () => {
    //     this = this.contractHelper.getPaper(this.id);
    // }
}
export default Paper;