import React, { Component } from 'react';

// export default function Search() {
//     //handle type
//     //catch data
//     //

//     return (
//         <div>
//             <input type="text" name="lname" />
//             <input type="submit" value="Submit"/>
//         </div>
//     )
// }

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
            <div className="searchContainer">
                <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            </div>
            <button type="button" onClick={this.onSubmit.bind(this)} className="btn">Save</button>
        </div>
      );
    }
  
    updateInputValue(evt) {
      this.setState({
        inputValue: evt.target.value
      });
    }
  };

export default Search;
