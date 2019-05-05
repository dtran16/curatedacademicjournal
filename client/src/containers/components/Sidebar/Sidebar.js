import React from "react";

//styles
import "./Sidebar.css";

function Sidebar() {
    return(
        <div className="sidebarContainer">
            <div className="returnButton"> 
                <img
                    src=""
                    alt="return button"
                    height="25px"
                    width="25px"/>  
                Back to Search Results
            </div>
            <div className="previous">
                Previous Versions
                <img
                    src=""
                    alt="return button"
                    height="25px"
                    width="25px"/>  
            </div>
        </div>
    )
}

export default Sidebar;