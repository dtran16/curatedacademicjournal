import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ArticleProfile from "../../articleProfile";
//styles
import './Recommendation.css';
import bMark from './bookmark.png';
import bMarkFilled from './bookmark_filled.png';
import star from './star.png';
import starFilled from './star_filled.png';

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {

        let favorite = star, marked = bMark;

        if (this.props.fav == 'true') {
            // console.log(this.props.fav);
            favorite = starFilled;
        }
        if (this.props.saved == 'true') {
            // console.log(this.props.saved);
            marked = bMarkFilled;
        }

        function toggleFav() {
            // favorite = starFilled;
            console.log("clicked favorite")
        }

        function toggleMark() {
            // console.log(this.props.saved);
            console.log("clicked bookmark")
        }
        console.log("title", this.props.title);
        return(
            <div className='itemContainer'>
                <div className="itemHeader">
                    <div className="recTitle"><Link to='/articleprofile'>{this.props.title}</Link></div>
                    <div className="recDate">{this.props.date}</div>
                    <div className='pressItem'>
                        <img className="clickItem" onClick={toggleFav}
                            src={favorite}
                            alt="Favorite"
                            height="20px"
                            width="20px"/>
                        <img className="clickItem" onClick={toggleMark}
                            src={marked}
                            alt="Bookmarked"
                            height="18x"
                            width="18px"/>
                    </div>
                </div>
                <div className='authors'>{this.props.authorName}</div>
                <Router>
                    <div>
                    <Route path="/articleprofile" render={(Props) => <ArticleProfile accounts={this.props.accounts} helper={this.props.helper} id= {this.props.paper} title={this.props.title} author= {this.props.authors} {...Props}/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Recommendation;

//testing out dyanmic clicking and updating of props

// class Recommendation extends React.Component {
//     constructor(props) {
//         super(props);
//         this.toggleFav = this.toggleFav.bind(this);
//         this.toggleMark = this.toggleMark.bind(this);

//         this.state={fav:props.fav, saved:props.saved};
//     }

//     // let favorite = star, marked = bMark;

//     // console.log(fav, saved)
//     toggleFav() {
//         console.log("clicked favorite")
//         this.setState({fav: true});
//         // if (favorite == star) {
//         //     favorite = starFilled;
//         // } else {
//         //     favorite = star;
//         // }
//         // this.favorite = starFilled;
//     }

//     toggleMark() {
//         // console.log(thi)
//         if (this.marked == bMark) {
//             this.props.saved = 'false'
//         } else {
//             this.props.saved = 'true';
//         }
//         // console.log(this.props)
//     }


//     render() {

//         let favorite = star, marked = bMark;

//         if (this.fav == 'true') {
//             favorite = starFilled;
//         }
//         if (this.saved == 'true') {
//             marked = bMarkFilled;
//         }

//         return(
//             <div className='itemContainer'>
//                 <div className="itemHeader">
//                     <h2>{this.props.title}</h2>
//                     <p>{this.props.date}</p>
//                     <div className='pressItem'>
//                         <img onClick={toggleFav}
//                             src={favorite}
//                             alt="Favorite"
//                             height="20px"
//                             width="20px"/>
//                         <img onClick={toggleMark}
//                             src={marked}
//                             alt="Bookmarked"
//                             height="18x"
//                             width="18px"/>
//                     </div>
//                 </div>
//                 <div className='authors'>{this.props.authors}</div>
//             </div>
//         )
//     }
// }
