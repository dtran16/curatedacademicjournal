import React, { Component } from 'react';

//styles
import "./Paper.css";

class Paper extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        function handleReviewClick() {
            console.log("add review click");
    
        }

        return (
            <div className="bodyContainer"> 
                <h1>{this.props.title}</h1>
                <h4>{this.props.authors}</h4>

                <div className="abstract">
                    <h2>Abstract</h2>
                    <p>{this.props.bio}</p>
                </div>

                <div className="options">
                    <h3>Read Options</h3>
                    {this.props.option}
                </div>

                <div className="citations">
                    <h3>Citations</h3>
                    <p>{this.props.citation}</p>
                </div>

                <div className="addReview" onClick={handleReviewClick}>
                    <a href="http://localhost:3000/form">+ My Review</a>
                </div>
            </div>
        )
    }
}

export default Paper;