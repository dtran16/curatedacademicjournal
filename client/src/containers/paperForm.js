import React from "react";

import getWeb3 from "../utils/getWeb3";
import ContractHelper from "../contractHelper"
import Form from './components/Form/form.js';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

class PaperForm extends React.Component {
    state = { storageValue: 0, web3: null, accounts: null, contractHelper: null };
    constructor(props) {
      super(props);

    }

    componentDidMount = async (nextProps) => {
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
        let {accounts, helper} = this.props
        if(accounts === undefined || helper == undefined){
          console.log('undefined props')
        } else {
          console.log('defined props')
        }
        return(
            <div>
                <Navbar accounts={accounts} helper={helper}/>
                <Form accounts={accounts} helper={helper}/>
                <Footer />
            </div>
        )
    }

}

export default PaperForm;
