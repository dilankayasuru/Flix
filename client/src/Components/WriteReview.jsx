import React, {useEffect, useState} from "react";
import {Close, Mode} from "@mui/icons-material";
import styled from "styled-components";
import {Rating, TextField} from "@mui/material";
import Button from "./Button";
import axios from "axios";
import Response from "./Response";

const ReviewFormWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    z-index: 10;
    padding: 1em;

    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
`;

const ReviewForm = styled.form`
    background: #ffffff;
    padding: 1em;
    border-radius: 15px;

    .write-review-header {
        margin-bottom: 20px;
    }

    .write-review-title {
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: 300;
        text-transform: uppercase;
        font-style: italic;
        margin-bottom: 10px;
    }

    .write-review-subtitle {
        font-weight: 300;
        margin-bottom: 10px;
    }

    .write-review-input-container {
        margin-bottom: 20px;
    }
`;

export default function WriteReview(props) {

    const [open, setOpen] = useState(false);

    const [review, setReview] = useState({
        rating: 0,
        review: ""
    });

    const [error, setError] = useState('');

    const [response, setResponse] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.post('https://flix-server.vercel.app/post-review', {...review, productId: props.productId})
            .then((res) => {
                setError('')
                setResponse(true)
                setOpen(false)
            })
            .catch((error) => {
                if (error.response) setError(error.response.data.message)
                else setError(error.message)
            })
    };

    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === "rating") value = parseInt(value);
        setReview({...review, [name]: value})
    };

    useEffect(() => {
        setReview({review: "", rating: 0})
    }, [open]);

    return (
        <React.Fragment>
        <span
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "5px",
                borderBottom: "1px solid #333",
                cursor: "pointer",
                fontWeight: "300"
            }}
            onClick={() => setOpen(true)}
        ><Mode/> Write a review</span>
            {open &&
                <ReviewFormWrapper>
                    <ReviewForm onSubmit={handleSubmit}>

                        <div
                            className="write-review-header"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "1.5em"
                            }}>

                            <div>
                                <p className="write-review-title">Write a Review</p>
                                <p className="write-review-subtitle">Share your thoughts about the product</p>
                            </div>
                            <Close
                                onClick={() => setOpen(false)}
                                cursor="pointer"/>
                        </div>
                        <div className="write-review-input-container">
                            <p className="write-review-subtitle">Overall Rating</p>
                            <Rating
                                name="rating"
                                onChange={handleChange}
                                value={review.rating}
                            />
                        </div>
                        <div className="write-review-input-container">
                            <p className="write-review-subtitle">Your Review</p>
                            <TextField
                                label="Write a review"
                                multiline
                                rows={4}
                                name="review"
                                fullWidth
                                required
                                onChange={handleChange}
                                value={review.review}
                            />
                        </div>
                        <div>
                            <Button type="submit" style={{
                                width: "100%",
                                borderRadius: "10px"
                            }}>Post</Button>
                            {error && <p style={{textAlign: "center", color: "rgb(220, 15, 15)"}}>{error}</p>}
                        </div>
                    </ReviewForm>
                </ReviewFormWrapper>}
            <Response state={{response, setResponse}} title={"Review Posted"}
                      message={"Your review has been successfully posted."}/>
        </React.Fragment>
    )
}