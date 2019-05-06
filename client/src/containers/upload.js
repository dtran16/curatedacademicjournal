import React from "react"

//containers
import Temp from "./temp";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import UploadForm from "./components/UploadForm/UploadForm";

function Upload(Props) {

    return (
      <div>
        <Navbar accounts={Props.accounts} helper={Props.helper}/>
        <UploadForm helper={Props.helper}/>
        <Footer />
      </div>

    )
}

export default Upload;
