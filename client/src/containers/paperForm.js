import React from "react";

import getWeb3 from "../utils/getWeb3";
import ContractHelper from "../contractHelper"
import Form from './components/Form/form.js';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

class PaperForm extends React.Component {
    state = { storageValue: 0, web3: null, accounts: null, contractHelper: null, title: null, author: null, id: null};
    constructor(props) {
      super(props);

    }

    componentDidMount = async (props) => {

        if (this.props.location.state === undefined) {
            console.log('yee');
        } else {
            let {title, author, id} = this.props.location.state;
            console.log("titleyee", title);
            this.setState({title: title, author: author, id: id});
        }

        // console.log("why");
        // try {
        //   // Get network provider and web3 instance.
        //   const web3 = await getWeb3();
        //
        //   // Use web3 to get the user's accounts.
        //   const accounts = await web3.eth.getAccounts();
        //
        //   //Get the contract instance.
        //   const networkId = await web3.eth.net.getId();
        //
        //   //create contract helper class
        //   const contractHelper = new ContractHelper(web3, networkId, accounts);
        //
        //   // Set web3, accounts, and contract to the state, and then proceed with an
        //   // example of interacting with the contract's methods.
        //   this.setState({ web3: web3, account: accounts, contractHelper: contractHelper});
        // } catch (error) {
        //   // Catch any errors for any of the above operations.
        //   alert(
        //     `Failed to load web3, accounts, or contract. Check console for details.`,
        //   );
        //   console.error(error);
        // }
    }



    render(props) {
        //let {title, author, id} = this.props.location.state;
        if(this.props.accounts === undefined || this.props.helper == undefined){
          console.log('undefined props')
        } else {
          console.log('defined props')
        }
        return(
            <div>
                <Navbar accounts={this.props.accounts} helper={this.props.helper} />
                <Form
                  accounts={this.props.accounts}
                  helper={this.props.helper}
                  title={this.state.title}
                  authors={this.state.author}
                  id={this.state.id}/>
                <Footer />
            </div>
        )
    }

}

export default PaperForm;
