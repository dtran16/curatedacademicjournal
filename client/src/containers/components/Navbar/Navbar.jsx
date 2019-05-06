import React from "react";
import {Link, BrowserRouter as Router } from 'react-router-dom';

//styles
import "./Navbar.css";
import profile from './profile.png';

const Navbar = (Props) => {
    return (
        <div className="rowContainer">
            <div className="logoName leftAnchor" onClick={() => get(Props.accounts, Props.helper)}>Indelve</div>
            <div className="rightAnchor">
                <div className="upload"><Link to="/upload">upload</Link></div>
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
