import React from "react"

//containers
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Change from './components/Change/change';

function Form(Props) {

    return (
      <div>
        <Navbar accounts={Props.accounts} helper={Props.helper}/>

        <Footer />
      </div>

    )
}

export default Form;
