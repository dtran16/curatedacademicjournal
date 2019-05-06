import React from "react";

//containers
import Form from './components/Form/form.js';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

class PaperForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        helper: props.helper,
        accounts: props.accounts,
        storageValue: null,
        rating: 0,
        stake: 0,
        comment: ""
      };
    }

    render() {
        return(
            <div>
                <Navbar accounts={this.state.accounts} helper={this.state.helper}/>
                <Form accounts={this.state.accounts} helper={this.state.contractHelper}/>
                <Footer />
            </div>
        )
    }
  
}

export default PaperForm;