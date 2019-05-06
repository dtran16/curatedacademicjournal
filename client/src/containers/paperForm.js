import React from "react";


import Form from './components/Form/form.js';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

class PaperForm extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <div>
                <Navbar accounts={this.props.accounts} helper={this.props.helper}/>
                <Form accounts={this.props.accounts} helper={this.props.contractHelper}/>
                <Footer />
            </div>
        )
    }

}

export default PaperForm;
