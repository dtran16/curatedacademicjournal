import React from "react"

//containers
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import Recommendation from './components/Recommendation/Recommendation';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render(props) {
     console.log(this.props.helper);
    return (
    <div>
      <Navbar accounts={this.props.accounts} helper={this.props.helper}/>
      <Search />
      <Recommendation
          title='Metabolism in the Heart'
          date='April 21, 2019'
          authors='Emily White, Jane Moffit'
          fav='false'
          saved='false'/>
      <Recommendation
          title='Metabolism in the Heart'
          date='April 21, 2019'
          authors='Emily White, Jane Moffit'
          fav='false'
          saved='true'/>
      <Recommendation
          title='Metabolism in the Heart'
          date='April 21, 2019'
          authors='Emily White, Jane Moffit'
          fav='true'
          saved='false'/>
      <Footer />
    </div>
    )
  }
}

export default Landing;
