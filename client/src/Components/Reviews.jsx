import React, {useEffect, useState} from "react";
import {Rating} from "@mui/material";
import styled from "styled-components";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const ReviewsContainer = styled.div`
    max-width: 400px;

    .reviews-count {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
        align-items: center;
    }

    .reviews-count p {
        font-size: 1.2em;
    }

    .review-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.7em;
    }

    .review-user-name {
        padding-bottom: 0.5em;
        font-size: 1.5em;
        font-weight: lighter;
    }

    .review {
        padding-bottom: 1em;
        margin-bottom: 1em;
        border-bottom: 1px solid #000000;
    }
`;

export default function Reviews(props) {

    const [showReviews, setShowReviews] = useState(false);

    const [reviews, setReviews] = useState([]);

    const handleClick = () => {
        setShowReviews(!showReviews);
    }

    const style = {
        maxHeight: showReviews ? "none" : "40px",
        overflow: showReviews ? "visible" : "hidden",
    }

    useEffect(() => {
        setReviews(props.data)
    }, []);

    return (
        <ReviewsContainer style={style}>
            <div className="reviews-count">
                <p>Reviews ({reviews.length})</p>
                <div>
                    {showReviews
                        ? <KeyboardArrowUpRoundedIcon sx={{fontSize: "2em", cursor: "pointer"}} onClick={handleClick}/>
                        :
                        <KeyboardArrowDownRoundedIcon sx={{fontSize: "2em", cursor: "pointer"}} onClick={handleClick}/>
                    }
                </div>
            </div>
            {
                reviews.map((review) => (
                    <div key={review._id} className="review">
                        <div className="review-top">
                            <Rating name="read-only" value={review.rating} readOnly/>
                            <div
                                className="date">{new Date(review.date).getDate()}/{new Date(review.date).getMonth() + 1}/{new Date(review.date).getFullYear()}</div>
                        </div>
                        <p className="review-user-name">
                            {review.name}
                        </p>
                        <div>
                            <p>{review.review}</p>
                        </div>
                    </div>
                ))
            }
        </ReviewsContainer>
    )
}