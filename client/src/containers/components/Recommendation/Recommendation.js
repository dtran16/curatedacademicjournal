import React, { Component } from 'react';

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
        
        if (this.fav == 'true') {
            this.favorite = starFilled;
        }
        if (this.saved == 'true') {
            this.marked = bMarkFilled;
        }

        function toggleFav() {
            console.log("clicked favorite")
        }

        function toggleMark() {
            console.log("clicked bookmark")
        }

        return(
            <div className='itemContainer'>
                <div className="itemHeader">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.date}</p>
                    <div className='pressItem'>
                        <img onClick={toggleFav}
                            src={favorite}
                            alt="Favorite"
                            height="20px"
                            width="20px"/>
                        <img onClick={toggleMark}
                            src={marked}
                            alt="Bookmarked"
                            height="18x"
                            width="18px"/> 
                    </div>
                </div>
                <div className='authors'>{this.props.authors}</div>
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