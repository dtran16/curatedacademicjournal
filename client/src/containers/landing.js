import React from "react"
import getWeb3 from "../utils/getWeb3";
import ReviewContract from "../contracts/Review.json";
import ContractHelper from "../contractHelper"
//containers
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import Recommendation from './components/Recommendation/Recommendation';

class Landing extends React.Component {
    state = {
          web3: null,
          accounts: null,
          contractHelper: null,
          title1: "Sample Paper 1",
          author1: "Joe Broder",
          id1: 1,
          title2: "Sample Paper 2",
          author2: "Olivia Lee",
          id2: 2,
          title3: "Sample Paper 3",
          author3: "Jen Hu, Susan Lin",
          id3: 3,
          paper1: null,
          paper2: null,
          paper3: null,
          balance1: 0,
          balance2: 0,
          balance3: 0,
          score1: 0,
          score2: 0,
          score3: 0
      };
  constructor(props) {
    super(props);
  }
  componentDidMount = async (props) => {
        // Get network provider and web3 instance.

        //create contract helper class
        const contractHelper = this.props.helper;
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        let id = await contractHelper.currentId();
        // console.log("other id", id);
        let p1 = await contractHelper.getPaper(id - 1);

        this.setState({ title1: p1.title, author1: p1.authorName, id1: id-1, paper1: p1, balance1: p1.numtokens, score1: p1.userScore});

      // let id = await helper.currentId();
      // console.log("other id", id);
      //
      //
      let p2 = await contractHelper.getPaper(id - 2);
      this.setState({ title2: p2.title, author2: p2.authorName, id2: id-2, paper2: p2, balance2: p2.numtokens, score2: p2.userScore});
      let p3 = await contractHelper.getPaper(id - 3);
      this.setState({ title3: p3.title, author3: p3.authorName, id3: id-3, paper3: p3, balance3: p3.numtokens, score3: p3.userScore});

  };


  render(props) {
      let {accounts, helper} = this.props;
      if(accounts === undefined || helper == undefined){
        console.log('undefined props')
      } else {
        console.log('defined props')
      }
    return (
    <div>
      <Navbar accounts={accounts} helper={helper}/>
      <Search />
      <Recommendation
          title={this.state.title1}
          date='April 21, 2019'
          authors={this.state.author1}
          fav='false'
          saved='false'
          paper={this.state.id1}
          helper={helper}
          accounts={accounts}
          balance={this.state.balance1}
          score={this.state.score1}/>
      <Recommendation
          title={this.state.title2}
          date='April 21, 2019'
          authors={this.state.author2}
          fav='false'
          saved='false'
          paper={this.state.id2}
          helper={helper}
          accounts={accounts}
           balance={this.state.balance2}
           score={this.state.score2}/>
      <Recommendation
          title={this.state.title3}
          date='April 21, 2019'
          authors={this.state.author3}
          fav='false'
          saved='false'
          paper={this.state.id3}
          helper={helper}
          accounts={accounts}
           balance={this.state.balance3}
           score={this.state.score3}/>
      <Footer />
    </div>
    )
  }
}

export default Landing;
