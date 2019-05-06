import React, { Component } from 'react';
import "./Search.css";
import { get } from 'https';

import sButton from './search.png';
import down from './down.png';

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
          <div className="landingTitle">A Peer-Curated Academic Journal</div>
          <div className="searchBar">
            <input className="inputContainer"  value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            <div className="searchButton" onClick={this.handleSubmit}>
              <img src={sButton}
                alt="Search"
                height="25px"
                width="25px"/>
            </div>
          </div>
          <div className="searchLegend">
            <div id="recc">recommended</div>
            <div className="endAnchor">
              <div className="filter clickItem" id="justify">Subject
                <img src={down}
                  alt="Search"
                  height="20px"
                  width="20px"/>
              </div>
              <div className="filter clickItem">Sort By
                <img src={down}
                  alt="Search"
                  height="20px"
                  width="20px"/>
              </div>
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
      console.log("clicked");
      //redirect data back

    }
  };

export default Search;
