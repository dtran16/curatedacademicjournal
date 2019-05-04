import TokenContract from "./contracts/CAJCoin.json";
import ReviewContract from "./contracts/Review.json";
import Paper from "./Paper"

class ContractHelper {
    //constructor takes a web3 instance and sets up connections to the contracts
    constructor(web3, networkId, accounts) {
        this.web3 = web3;
        this.networkId = networkId;
        this.accounts = accounts;
        this.decimals = 10**18;
        const reviewDeployedNetwork = ReviewContract.networks[networkId];
        const tokenDeployedNetwork = TokenContract.networks[networkId];
        
        this.reviewContract = new web3.eth.Contract(
            ReviewContract.abi,
            reviewDeployedNetwork && reviewDeployedNetwork.address,
        );
        this.tokenContract = new web3.eth.Contract(
            TokenContract.abi,
            tokenDeployedNetwork && tokenDeployedNetwork.address,
        );
    }

    //call this function to give the user 10 CAJ
    getTokens = async () => {
        return await this.tokenContract.methods.getToken().send({from: this.accounts[0]});
    }

    //get user token balance
    getUserBalance = async () => {
        return (await this.tokenContract.methods.balanceOf(this.accounts[0]).call()) / this.decimals;
    }

    //get the next paper id to be assigned
    currentId = async () => {
        return await this.reviewContract.methods.getCurrentID().call();
    }

    //check if a paper exists
    paperExists = async (id) => {
        return await this.reviewContract.methods.paperExists(id).call();
    }

    //add a paper
    addPaper = async (title, location, tags, authorName, prevID) => {
        return await this.reviewContract.methods.addPaper(title, location, tags, authorName, prevID).send({from: this.accounts[0]});
    }

    //get a paper struct for a paper
    getPaper = async (id) => {
        if(!this.paperExists(id)) {
            return null;
        }
        const location = this.reviewContract.methods.getPaperLocation(id).call();
        const title = this.reviewContract.methods.getPaperTitle(id).call();
        const numTokens = this.reviewContract.methods.getNumTokens(id).call();
        const tags = this.reviewContract.methods.getPaperTags(id).call();
        const authorAddress = this.reviewContract.methods.getPaperAuthor(id).call();
        const authorName = this.reviewContract.methods.getPaperAuthorName(id).call();
        const prevId = this.reviewContract.methods.getPaperPrevId(id).call();
        const nextId = this.reviewContract.methods.getPaperNextId(id).call();
        const state = this.reviewContract.methods.getPaperState(id).call();
        const scores = this.reviewContract.methods.getPaperVotes(id).call();
        const userScore = scores[0] / scores[1];
        const reviewerScore = scores[2] / scores[3];
        const date = this.reviewContract.methods.getPaperDate(id).call();
        return new Paper(id, location, title, numTokens, tags, authorAddress, authorName,
                        prevId, nextId, state, userScore, reviewerScore, date, this)
    }

    // getTokens = async () => {
    //     return await this.tokenContract.methods.getToken().send({from: this.accounts[0] });
    // }



    
    

    // web3 = new Web3("endpoint");
    // archiveContract = new web3.eth.Contract(ReviewContract.abi, 'address', {
    //     //defaults
    // });
    // tokenContract = new web3.eth.Contract(TokenContract.abi, 'address', {
    //     //defaults
    // });
    // saleContract = new web3.eth.Contract(SaleContract.abi, 'address', {
    //     //defaults
    // });

    // static purchase() {
    //     saleContract.methods.buyTokens();
    // }
    // //getter and setter methods
    // static getPaper() {
    //     this.archiveCcontract.methods.getBook().call().then((result) => {
    //         return new Paper(result[0],
    //                         result[1],
    //                         result[2],
    //                         result[3],
    //                         result[4],
    //                         result[5],
    //                         result[6],
    //                         result[7],
    //                         result[8]);
    //     })
    // }

    // static stakeToken(paperID, amount) {
    //     this.archiveCcontract.methods.stake().call();
    // }


    // getLimit() {
    //     this.contract.methods.getLimit().call().then((result) => {
    //         return result;
    //     })
    // }

    // isReady(_id) {
    //     this.contract.methods.isReady(_id).call().then((result) => {
    //         return result;
    //     })
    // }

    // getAuthor(_id) {
    //     this.contract.methods.getAuthor(_id).call().then((result) => {
    //         return result;
    //     })
    // }

    // getTitle(_id) {
    //     this.contract.methods.getTitle(_id).call().then((result) => {
    //         return result;
    //     })
    // }

    // getNumTokens(_id) {
    //     this.contract.methods.getNumTokens(_id).call().then((result) => {
    //         return result;
    //     })
    // }

    // addPaper( _title, _location) {
    //     this.contract.methods.addPaper(_title, _location).call();
    // }

}
export default ContractHelper;
