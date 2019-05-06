import React from "react"
import getWeb3 from "../utils/getWeb3";
import ReviewContract from "../contracts/Review.json";
//containers
import ContractHelper from "../contractHelper"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import Recommendation from './components/Recommendation/Recommendation';

class Landing extends React.Component {

 state = {
          title1: null,
          author1: null,
          id1: null,
          title2: null,
          author2: null,
          id2: null,
          title3: null,
          author3: null,
          id3: null
      };
  constructor(props) {
    super(props);
    this.get=this.get.bind(this);

  }


   async get(helper) {
       // let id = await helper.currentId();
       // console.log("id", id);
       // let p1 = helper.getPaper(id - 1);
       // this.setState({ title1: p1.title, author1: p1.authorName, id1: id-1});
       // let p2 = helper.getPaper(id - 2);
       // this.setState({ title2: p2.title, author2: p2.authorName, id2: id-2});
       // let p3 = helper.getPaper(id - 3);
       // this.setState({ title3: p3.title, author3: p3.authorName, id3: id-3});
       console.log("yeet");
   }

  render(props) {
      let {accounts, helper} = this.props
      if(accounts === undefined || helper == undefined){
        console.log('undefined props')
      } else {
        console.log('defined props')
      }

      this.get(helper);
    return (
    <div>
      <Navbar accounts={accounts} helper={helper}/>
      <Search />
      <Recommendation
          title={this.state.title1}
          date='April 21, 2019'
          authors={this.state.author1}
          fav='false'
          saved='false'/>
      <Recommendation
          title={this.state.title2}
          date='April 21, 2019'
          authors={this.state.author2}
          fav='false'
          saved='true'/>
      <Recommendation
          title={this.state.title3}
          date='April 21, 2019'
          authors={this.state.author3}
          fav='true'
          saved='false'/>
      <Footer />
    </div>
    )
  }



}

export default Landing;
