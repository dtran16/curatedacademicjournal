import React from "react";
import {Link, BrowserRouter as Router } from 'react-router-dom';

//styles
import "./Navbar.css";
import profile from './profile.png';
import bookMark from './bookmark.png';

const Navbar = (Props) => {
    return (
        <div className="rowContainer">
            <div className="logoContainer">
                <div className="tokenTap" onClick={() => get(Props.accounts, Props.helper)}>
                    <img src={bookMark}
                        alt="bookmark; click for tokens"
                        height="45px"
                        width="45px"/>
                </div>
                <div className="logoName leftAnchor"><Link to="/landing">Indelve</Link></div>
            </div>
            <div className="rightAnchor">
                <div className="upload"><Link to="/">upload</Link></div>
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
    let id = await helper.currentId();
    console.log("nav id", id);
    // Stores a given value, 5 by default.
    // await helper.methods.set(2).send({ from: acct[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contractHelper.currentId();
    await helper.getTokens();
    const response = await helper.getUserBalance();

    // send state back to the parent
}

export default Navbar;
