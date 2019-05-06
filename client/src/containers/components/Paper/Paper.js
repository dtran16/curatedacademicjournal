import React, { Component } from 'react';
import {Link, BrowserRouter as Router } from 'react-router-dom';

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
<<<<<<< HEAD

                <div className="addReview" onClick={handleReviewClick}>
                    <a href="http://localhost:3000/form">+ My Review</a>
                </div>
=======
                <div className="addReview"><Link to="/form">+ My Review</Link></div>
                {/* <a className="addReview" onClick={handleReviewClick} href="http://localhost:3000/form">
                    + My Review
                </a> */}
>>>>>>> Staging
            </div>
        )
    }
}

export default Paper;