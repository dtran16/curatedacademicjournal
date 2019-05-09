import React, { Component } from "react";

//styles
import "./form.css";

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
    console.log("storage", this.state.storageValue)
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

  async handleSubmit(event) {
     event.preventDefault();
    console.log(this.state.rating, this.state.stake, this.state.comment);

    await this.state.helper.userVoteOnPaper(this.props.id, this.state.rating, this.state.stake);
    await this.state.helper.addComment(this.props.id, this.state.comment);


  }

  render() {
    if (this.state.storageValue == null) {
      return <div>Loading ...</div>;
    }
    //help i need to get thefucking title
    return (
      <div className="bodyContainer">
        <div className="infoContainer">
          <h1>{this.props.title}</h1>
          <h4>{this.props.authors}</h4>
          {/* <h3>Current Balance: </h3> */}
        </div>
        <div>
          <h2>MY REVIEW</h2>
        </div>
        <form id="formContainer" onSubmit={this.handleSubmit}>
          <label>
            <div>Rating of the Paper</div>
            <div>
              <input type="text" onChange={this.handleChange1}/> /10
            </div>
          </label>
          <label>
            <div>Stake</div>
            <div>
              <input type="text" onChange={this.handleChange2}/> Tokens
              <div className="rightAnchor" id="subWrite">My Remaining Balance: {this.state.storageValue} Tokens</div>
            </div>
          </label>
          <label id="twoLiner">
            <div id="lineBuffer">Comments/Feedback</div>
            <input type="text" onChange={this.handleChange3} />
          </label>
          <div className="rightAnchor">
            <input id="subButton" type="submit" value="CONTINUE"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Form;
