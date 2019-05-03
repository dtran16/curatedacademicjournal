import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import ReviewContract from "./contracts/Review.json";
import ContractHelper from "./contractHelper"

//styles
import "./styles/App.css";

//containers
import Temp from "./containers/temp";
import Navbar from "./containers/Navbar/Navbar";
import Footer from "./containers/Footer";
import Search from "./containers/Search";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contractHelper: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      //Get the contract instance.
      const networkId = await web3.eth.net.getId();
      
      //create contract helper class
      const contractHelper = new ContractHelper(web3, networkId, accounts);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contractHelper: contractHelper}, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contractHelper } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(2).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contractHelper.currentId();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <Navbar />
        <Search /> 
        <Temp value={this.state.storageValue}/>
        <Footer />
      </div>
    );
  }
}

export default App;
