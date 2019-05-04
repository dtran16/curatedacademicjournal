import React from "react"
import "./Navbar.css";

// import { RowContainer } from '../components/ContainerStyles';

import profile from './profile.png';

const Navbar = () => {
    return (
        <div className="rowContainer">
            <div className="logoName">Curator</div>
            <div className="profile" >
              <a href="http://www.yahoo.com">
                <img src={profile}
                     alt="Profile"
                     height="50px"
                     width="50px"/>
              </a>
            </div>
        </div>
    )
}

export default Navbar;