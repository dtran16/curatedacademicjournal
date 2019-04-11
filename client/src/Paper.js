//Datatype for papers
class Paper {
    id;
    location;
    title;
    numtokens;
    tags;
    author;
    state;
    constructor(id, location, title, numtokens, tags, author, state, prevID, lastID) {
        this.id = id;
        this. location = location;
        this.title = title;
        this.numtokens = numtokens;
        this.tags = tags;
        this.author = author;
        this.state = state;
        this.prevID = prevID;
        this.lastID = lastID;
    }
}