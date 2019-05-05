import React from "react";

//styles
import './Recommendation.css';
import bMark from './bookmark.png';
import bMarkFilled from './bookmark_filled.png';
import star from './star.png';
import starFilled from './star_filled.png';

function Recommendation(Props) {
    const title = Props.title, date = Props.date, authors = Props.authors,
        fav = Props.fav, saved = Props.saved;

    const favorite = star, marked = bMark;

    return(
        <div className='itemContainer'>
            <div className="itemHeader">
                <h2>{title}</h2>
                <p>{date}</p>
                <img className='pressItem'
                    src={favorite}
                    alt="Favorite"
                    height="20px"
                    width="20px"/>
                <img className='pressItem'
                    src={marked}
                    alt="Bookmarked"
                    height="18x"
                    width="18px"/> 
            </div>
            <div className='authors'>{authors}</div>
        </div>
    )
}

export default Recommendation;