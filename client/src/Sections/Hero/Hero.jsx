import React from "react";
import "./Hero.css";
import Image from "../../Images/shoe.png";
import Button from "../../Components/Button";
import {Link} from "react-router-dom";

export default function Hero() {
    return (
        <section className="hero-container">
            <div className="hero-left">
                <div className="hero-left-title">
                    <h1>Step into Style</h1>
                    <h2>Discover your perfect pair</h2>
                </div>
                <p>
                    Welcome to Flix, where every step is a statement. From sleek urban kicks to rugged outdoor
                    companions, find your perfect match and step into a world of comfort, quality, and style. Explore
                    our latest collection and make every stried count.
                </p>
                <Link to={"/shop"}>
                    <Button>Shop Now</Button>
                </Link>
            </div>
            <div className="hero-right">
                <img src={Image} alt="shoe pair"/>
            </div>
        </section>
    )
}