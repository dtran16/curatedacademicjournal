import React, { Component } from "react";
import "./Navbar.css";

import profile from './profile.png';

class Navbar extends Component {
    constructor(Props) {
        super(Props);
    }

    render () {
        
        return (
            <div className="rowContainer">
                <div className="logoName leftAnchor" onClick={() => get(this.Props.accounts, this.Props.helper)}>Indelve</div>
                <div className="rightAnchor">
                    <a className="upload" href="http://localhost:3000/upload">upload</a>
                    <div className="profile" >
                    <a href="http://www.yahoo.com">
                        <img src={profile}
                            alt="Profile"
                            height="50px"
                            width="50px"/>
                    </a>
                </div>
                </div>
            </div>
        )   
    }
}

async function get(acct, helper) {

    // Stores a given value, 5 by default.
    // await helper.methods.set(2).send({ from: acct[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contractHelper.currentId();
    await helper.getTokens();
    const response = await helper.getUserBalance();

    // send state back to the parent
}

export default Navbar;
