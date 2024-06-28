import React from "react";
import {useNavigate} from "react-router-dom";

const ImageContainer = {
    height: "300px",
    overflow: "hidden",
    marginBottom: "10px",
}

const TextContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

export default function Card(props) {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/product/${props._id}`)} style={{cursor: "pointer"}}>
            <div style={ImageContainer}>
                <img style={{height: "100%", width: "100%", objectFit: "cover"}} src={props.thumbnail} alt={props.name + "image"}/>
            </div>
            <div style={TextContainer}>
                <div>
                    <p style={{textTransform: "capitalize"}}>{props.name}</p>
                    <p style={{color: "#888888", textTransform: "capitalize"}}>{props.category}</p>
                </div>
                <p style={{fontSize: "1.5em"}}>${props.price}</p>
            </div>
        </div>
    )
}