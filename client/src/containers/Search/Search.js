import React, { Component } from 'react';
import "./Search.css";

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      };
    }
  
    render() {
      return (
        <div className="searchBar">
            <div className="inputContainer">
                <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            </div>
            <div className="button">
                <input type="submit" onClick={this.handleSubmit} ></input>
            </div>
        </div>
      );
    }
  
    updateInputValue(evt) {
      this.setState({
        inputValue: evt.target.value
      });
    }

    handleSubmit() {
      //redirect data back
    
    }
  };

export default Search;
