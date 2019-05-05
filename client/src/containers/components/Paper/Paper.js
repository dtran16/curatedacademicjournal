import React, { Component } from 'react';

//styles
import "./Paper.css";

class Paper extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {

        return (
            <div className="paperContainer"> 
                <h1>{this.props.title}</h1>
                <h4>{this.props.authors}</h4>
                <div className="abstract">
                    <h2>Abstract</h2>
                    {this.props.bio}
                </div>
                <div className="options">
                    <h3>Read Options</h3>
                </div>
                <div className="Citations">
                    <h3>Citations</h3>
                    <p>{this.props.citation}</p>
                </div>

            </div>
        )
    }
}

export default Paper;