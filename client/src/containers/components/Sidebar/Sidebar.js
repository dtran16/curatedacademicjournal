import React from "react";
import {Link, BrowserRouter as Router } from 'react-router-dom';

//styles
import "./Sidebar.css";

import leftArrow from "./left-arrow.png";
import down from './down.png';

function Sidebar() {
    return(
        <div className="sidebarContainer">
            <Link to="/landing">
                <div className="returnContainer">
                    <img
                        src={leftArrow}
                        alt="return button"
                        height="25px"
                        width="25px"/>  
                    <div className="return">Back to Search Results</div>
                </div>
            </Link>
            <a className="previousContainer">
                {/* <p>Previous Versions</p> */}
                <div className="previous">Previous Versions</div>
                <img className="downButton"
                    src={down}
                    alt="return button"
                    height="20px"
                    width="20px"/>  
            </a>
        </div>
    )
}

export default Sidebar;