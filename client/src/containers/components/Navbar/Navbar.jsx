import React from "react"
import "./Navbar.css";

// import { RowContainer } from '../components/ContainerStyles';

import profile from './profile.png';

const Navbar = () => {
    return (
        <div className="rowContainer">
            <div className="logoName">Curator</div>
            <div className="profile">
                <img
                    src={profile}
                    alt="Profile"
                    height="50px"
                    width="50px"
                />
            </div>
        </div>
    )
}

export default Navbar;