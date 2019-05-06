import React, { Component } from 'react';

//page components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Paper from "./components/Paper/Paper";
import Sidebar from "./components/Sidebar/Sidebar";

//styles
import "./../styles/page.css";

class ArticleProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    //also maybe include props for navbar that links to profile page

    //Props for paper: title, author, bio, citation
    //Props for rating: avg rating, my rating, review/comments
    //Props from database: previous versions

    //props above should be pulled from account info, but temp placed info for frontend dev

    render() {
        let {accounts, helper} = this.props
        if(accounts === undefined || helper == undefined){
          console.log('undefined props')
        } else {
          console.log('defined props')
        }
        return(
            <div>
                <Navbar accounts={this.props.accounts} helper={this.props.helper}/>
                <Sidebar rating='' myRating='' review=''/>
                <Paper title='Metabolism in the Heart'
                        authors='Emily White, Jane Moffit'
                        bio='m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ...m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore '
                        citation=''/>
                <Footer />
            </div>
        )
    }
}

export default ArticleProfile;