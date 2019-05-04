import React, { Component } from 'react';
import "./Search.css";
import { get } from 'https';

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
          <input className="inputContainer" maxLength="30" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
          <button onClick={this.handleSubmit}>Search</button>
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
