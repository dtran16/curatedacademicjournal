import TokenContract from "./contracts/Tokensale.json";
import SaleContract from "./contracts/Tokensale.json";
import ReviewContract from "./contracts/Review.json";

var http = require('http');
var Web3 = require("web3");

class contractHelper {

    web3 = new Web3("endpoint");
    archiveContract = new web3.eth.Contract(ReviewContract.abi, 'address', {
        //defaults
    });
    tokenContract = new web3.eth.Contract(TokenContract.abi, 'address', {
        //defaults
    });
    saleContract = new web3.eth.Contract(SaleContract.abi, 'address', {
        //defaults
    });

    static purchase() {
        saleContract.methods.buyTokens();
    }
    //getter and setter methods
    static getPaper() {
        this.archiveCcontract.methods.getBook().call().then((result) => {
            return new Paper(result[0],
                            result[1],
                            result[2],
                            result[3],
                            result[4],
                            result[5],
                            result[6],
                            result[7],
                            result[8]);
        })
    }

    static stakeToken(paperID, amount) {
        this.archiveCcontract.methods.stake().call();
    }


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
