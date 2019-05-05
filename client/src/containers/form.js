//import React from "react"
import React, { Component } from "react";
import "./form.css";
//containers
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Change from './components/Change/change';

class Form extends Component {
    componentDidMount = async (Props) => {
        this.state = { helper: Props.helper, accounts: Props.accounts }
        var response = await Props.helper.getUserBalance();
        this.setState({storageValue: response });
      }


    render() {
    //help i need to get thefucking title
        return (
          <div>
            <Navbar accounts={this.state.accounts} helper={this.state.helper}/>
            <h1>Metabolism in the Heart</h1>
            <h3>Current Balance: </h3>
            <h3>My Balance: {this.state.storageValue} </h3>
            <Footer />
          </div>

        )
    }
}

export default Form;
