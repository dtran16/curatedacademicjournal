import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import getWeb3 from "./utils/getWeb3";
import ReviewContract from "./contracts/Review.json";
import ContractHelper from "./contractHelper"
import * as serviceWorker from './serviceWorker';

//styles
import "./styles/App.css";
import "./styles/page.css";

//containers
import Temp from './containers/temp';
import Landing from "./containers/landing";
import ArticleProfile from "./containers/articleProfile";
import Upload from "./containers/upload";
import PaperForm from './containers/paperForm'

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
      this.add=this.add.bind(this);
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
    //
    // let title = "Towards the Automatic Anime Characters Creation with Generative Adversarial Networks";
    // let location = "";
    // let tags= ["anime", "deep learning"]
    // let author = "Yanghua Jin, Jiakai Zhang, Minjun Li, Yingtao Tian, Huachun Zhu, Zhihao Fang";
    // let previd = 0;
    // await contractHelper.addPaper(title, location, tags, author, previd);
    //
    // let title2 = "Style Transfer for Anime Sketches with Enhanced Residual U-net and Auxiliary Classifier GAN";
    // let location2 = "";
    // let tags2 = ["anime", "deep learning"]
    // let author2 = "Lvmin Zhang, Yi Ji, Xin Lin";
    // let previd2 = 0;
    // await contractHelper.addPaper(title2, location2, tags2, author2, previd2);
    // // Stores a given value, 5 by default.
    // //await contract.methods.set(2).send({ from: accounts[0] });
    // let title3 = "User-Guided Deep Anime Line Art Colorization with Conditional Adversarial Networks";
    // let location3 = "";
    // let tags3 = ["anime", "deep learning"]
    // let author3 = "Yuanzheng Ci, Xinzhu Ma, Zhihui Wang, Haojie Li, Zhongxuan Luo";
    // let previd3 = 0;
    // await contractHelper.addPaper(title3, location3, tags3, author3, previd3);
    // Get the value from the contract to prove it worked.
    //const response = await contractHelper.currentId();
    //await contractHelper.getTokens();
    const response = await contractHelper.getUserBalance();
    const res = await contractHelper.currentId();
    console.log("id: ", res);
    // Update state with the result.
    this.setState({storageValue: response });
  };

  async add() {
      const { accounts, contractHelper } = this.state;

      // let title = "Sample Paper 1";
      // let location = "";
      // let tags= ["anime", "deep learning"]
      // let author = "Joe Broder";
      // let previd = 0;
      // await contractHelper.addPaper(title, location, tags, author, previd);
      //
      // let title2 = "Sample Paper 2";
      // let location2 = "";
      // let tags2 = ["anime", "deep learning"]
      // let author2 = "Olivia Lee";
      // let previd2 = 0;
      // await contractHelper.addPaper(title2, location2, tags2, author2, previd2);
      // // Stores a given value, 5 by default.
      // //await contract.methods.set(2).send({ from: accounts[0] });
      // let title3 = "Sample Paper 3";
      // let location3 = "";
      // let tags3 = ["anime", "deep learning"]
      // let author3 = "Jen Hu and Susan Lin";
      // let previd3 = 0;
      // await contractHelper.addPaper(title3, location3, tags3, author3, previd3);
  }

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    //this.add();
    return (

     <div>
      <Router>
          <div>
              <Route path="/landing" render={(Props) => <Landing accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>}/>
              <Route path="/articleprofile" render={(Props) => <ArticleProfile accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>}/>
              <Route path="/form" render={(Props) => <PaperForm accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>}/>
              <Route exact path='/' render={(Props) => <Upload val={this.state.storageValue} accounts={this.state.accounts} helper={this.state.contractHelper} {...Props}/>} />
          </div>
      </Router>
    </div>
    );
  }
}
export default App;
// <ul>
//   <li><Link to="/">default</Link></li>
//     <li><Link to="/landing">landing</Link></li>
//     <li><Link to="/articleprofile">articleProfile</Link></li>
//     <li><Link to="/form">paperForm</Link></li>
//     <li><Link to="/upload">paperUpload</Link></li>
// </ul>
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
