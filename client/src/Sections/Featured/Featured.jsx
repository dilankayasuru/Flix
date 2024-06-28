import React from "react";
import "./Featured.css";
import Button from "../../Components/Button";
import {useNavigate} from "react-router-dom";

export default function Featured() {

    const navigate = useNavigate();

    return (
        <section className="featutred-container">
            <h1>Speed Unleashed with Sprinter Elite</h1>
            <p>Introducing Sprinter Elite - your ultimate companion for speed and agility. Engineered with cutting edged
                technology and sleek design, these shoes propel you forward with every step. Dominate the track, conquer
                your goals. Get yours now
            </p>
            <Button onClick={() => navigate('/product/66772af1e4fa51f4686f5fe1')}>Shop Sprinter Elite</Button>
        </section>
    )
}