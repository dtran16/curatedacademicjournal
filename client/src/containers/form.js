//import React from "react"
import React, { Component } from "react";
import "./form.css";
//containers
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Change from './components/Change/change';

class Form extends Component {
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
        //setup();
        console.log(this.state.storageValue);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount = async () => {
        var response = await this.state.helper.getUserBalance()
        this.setState({ helper: this.state.helper,
                        accounts: this.state.accounts,
                        storageValue: response
                    });
        // this.state = { helper: this.state.helper,
        //                 accounts: this.state.accounts,
        //                 storageValue: response
        //             };
        console.log(this.state.storageValue)
    }

    handleChange1(event) {
        this.setState({rating: event.target.value});
    }
    handleChange2(event) {
        this.setState({stake: event.target.value});
    }
    handleChange3(event) {
        this.setState({comment: event.target.value});
    }

      handleSubmit(event) {
        console.log(this.state.rating, this.state.stake, this.state.comment);
        //await this.state.helper.userVoteOnPaper([id], this.state.rating, this.state.stake);
        //await this.state.helper.addComment([id], this.state.comment);
        event.preventDefault();
      }

    render() {
        if (this.state.storageValue == null) {
          return <div>Loading ...</div>;
        }
    //help i need to get thefucking title
        return (
          <div>
            <Navbar accounts={this.state.accounts} helper={this.state.helper}/>
            <div className="title">
                <h1>Metabolism in the Heart</h1>
                <p> [Authors] </p>
                <h3>Current Balance: </h3>
            </div>
            <div id="info">
                <h3> MY REVIEW </h3>
                <h3>My Balance: {this.state.storageValue} </h3>
            </div>
            <div id="form">
                <form onSubmit={this.handleSubmit}>
                    <label>
                      Rating of the Paper
                      <input type="text" onChange={this.handleChange1} /> <p>/10</p>
                    </label>
                    <label>
                        Stake
                      <input type="text" onChange={this.handleChange2} />
                    </label>
                    <label>
                        Comments/Feedback
                      <input type="text" onChange={this.handleChange3} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
            </div>
            <Footer />
          </div>

        )
    }

}

export default Form;
