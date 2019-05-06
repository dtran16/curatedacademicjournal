import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import getWeb3 from "./utils/getWeb3";
import ReviewContract from "./contracts/Review.json";
import ContractHelper from "./contractHelper"


//styles
import "./styles/App.css";
import * as serviceWorker from './serviceWorker';

//containers
import Temp from './containers/temp';
import Landing from "./containers/landing";
import ArticleProfile from "./containers/articleProfile";
import Upload from "./containers/upload";
import PaperForm from './containers/paperForm'

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contractHelper: null, count: 0};
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
      this.setState({count: this.state.count + 1});
      console.log("count", this.state.count);
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
    //const response = await contractHelper.currentId();
    //await contractHelper.getTokens();
    const response = await contractHelper.getUserBalance();
    //const res = await contractHelper.sample();
    // Update state with the result.
    
    const id = await contractHelper.currentId();
    console.log("id", id);
    this.setState({storageValue: response });
  };



  render() {


    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.state.storageValue)
    return (

     <div>
      <Router>
          <div>
              <ul>
                <li><Link to="/">default</Link></li>
                  <li><Link to="/landing">landing</Link></li>
                  <li><Link to="/articleprofile">articleProfile</Link></li>
                  <li><Link to="/form">paperForm</Link></li>
                  <li><Link to="/upload">paperUpload</Link></li>
              </ul>
              <Route exact path="/" render={(Props) => <Temp value={this.state.storageValue} {...Props}/>}/>
              <Route path="/landing" render={(Props) => <Landing accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>}/>
              <Route path="/articleprofile" render={(Props) => <ArticleProfile accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>}/>
              <Route path="/form" render={(Props) => <PaperForm accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>}/>
              <Route path='/upload' render={(Props) => <Upload val={this.state.storageValue} accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>} />
          </div>
      </Router>

      </div>


      // <ArticleProfile accounts={this.state.accounts} helper={this.state.contractHelper}/>
      // <PaperForm accounts={this.state.accounts} helper={this.state.contractHelper}/>
      );
  }
}
//
//
export default App;
// ReactDOM.render(routing, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
// const routing = () => (
//   <Router>
//       <div>
//           <ul>
//               <li><Link to="/">default</Link></li>
//               <li><Link to="/landing">landing</Link></li>
//               <li><Link to="/articleprofile">articleProfile</Link></li>
//               <li><Link to="/form">paperForm</Link></li>
//           </ul>
//           <Route exact path="/" component={Temp} />
//           <Route path="/landing" component={Landing} />
//           <Route path="/articleprofile" component={ArticleProfile} />
//           <Route path="/form" component={PaperForm} />
//       </div>
//   </Router>
// );
