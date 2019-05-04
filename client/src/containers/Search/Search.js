import React, { Component } from 'react';
import "./Search.css";
import { get } from 'https';

import sButton from './search.png';

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      };
    }
  
    render() {
      return (
        <div className="searchContainer">
          <h1>A Peer-Curated Academic Journal</h1>
          <div className="searchBar">
            <input className="inputContainer" maxLength="30" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            <div className="searchButton" onClick={this.handleSubmit}>
              <img src={sButton}
                alt="Search"
                height="25px"
                width="25px"/>
            </div>
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
