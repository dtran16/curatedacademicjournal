import React from "react"

//containers
import Temp from "./temp";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Search from "./Search/Search";

function Landing(Props) {

    return (
      <div>
        <Navbar accounts={Props.accounts} helper={Props.helper}/>
        <Search />
        <Temp value={Props.val}/>
        <Footer />
      </div>

    )
}

export default Landing;
