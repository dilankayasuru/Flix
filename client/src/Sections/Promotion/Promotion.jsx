import React from "react";
import Image from "../../Images/promotion.png";
import "./Promotion.css";

export default function Promotion() {
    return(
        <section className="promotion-wrapper">
            <div className="promotion-container">
                <div className="promocode">
                    <p>Code: FlixNow25</p>
                </div>
                <div className="promotion-content">
                    <div className="promotion-text">
                        <p>Get the Special Discount</p>
                        <p>25%<br></br>OFF</p>
                        <p>Hurry, Limited Time Offer!</p>
                    </div>
                    <div className="promotion-image-container">
                        <img src={Image} alt="Promotion shoe"/>
                    </div>
                </div>
            </div>
        </section>
    )
}