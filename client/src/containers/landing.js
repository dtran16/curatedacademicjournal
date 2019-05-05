import React from "react"

//containers
import Temp from "./temp";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import Recommendation from './components/Recommendation/Recommendation';

function Landing(Props) {

    return (
      <div>
        <Navbar accounts={Props.accounts} helper={Props.helper}/>
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
        {/* <Temp value={Props.val}/> */}
        <Footer />
      </div>

    )
}

export default Landing;
