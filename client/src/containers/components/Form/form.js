import React, { Component } from "react";
import getWeb3 from "../../../utils/getWeb3";
import ContractHelper from "../../../contractHelper"
import ReviewContract from "../../../contracts/Review.json";
//styles
import "./form.css";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
           helper: null,
           storageValue: null,
           rating: 0,
           stake: 0,
           comment: ""
         };
    }

    componentWillMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();

          //Get the contract instance.
          const networkId = await web3.eth.net.getId();

          //create contract helper class
          const contractHelper = new ContractHelper(web3, networkId, accounts);
          this.setState({ helper: contractHelper});
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          var response = await this.state.helper.getUserBalance()
          this.setState({ helper: this.state.helper,
                          storageValue: response
                      });
          // this.state = { helper: this.state.helper,
          //                 accounts: this.state.accounts,
          //                 storageValue: response
          //             };
          //setup();
          console.log(this.state.storageValue);
          this.handleChange1 = this.handleChange1.bind(this);
          this.handleChange2 = this.handleChange2.bind(this);
          this.handleChange3 = this.handleChange3.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
      }

    }

    handleChange1(event) {
        this.setState({rating: event.target.value});
    }
    handleChange2(event) {
        this.setState({stake: event.target.value});
    }
    handleChange3(event) {
        this.setState({comment: event.target.value});
    }

      handleSubmit(event) {
        console.log(this.state.rating, this.state.stake, this.state.comment);
        //await this.state.helper.userVoteOnPaper([id], this.state.rating, this.state.stake);
        //await this.state.helper.addComment([id], this.state.comment);
        event.preventDefault();
      }

    render() {
        if (this.state.storageValue == null) {
          return <div>Loading ...</div>;
        }
    //help i need to get thefucking title
        return (
          <div>
            <div className="title">
                <h1>Metabolism in the Heart</h1>
                <p> [Authors] </p>
                <h3>Current Balance: </h3>
            </div>
            <div id="info">
                <h3> MY REVIEW </h3>
                <h3>My Balance: {this.state.storageValue} </h3>
            </div>
            <div id="form">
                <form onSubmit={this.handleSubmit}>
                    <label>
                      Rating of the Paper
                      <input type="text" onChange={this.handleChange1} /> <p>/10</p>
                    </label>
                    <label>
                        Stake
                      <input type="text" onChange={this.handleChange2} />
                    </label>
                    <label>
                        Comments/Feedback
                      <input type="text" onChange={this.handleChange3} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
            </div>
          </div>
        )
    }

}

export default Form;
