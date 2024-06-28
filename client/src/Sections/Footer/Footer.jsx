import React from "react";
import {Facebook, Instagram, YouTube} from "@mui/icons-material";
import "./Footer.css"
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <section className="footer-container">
            <footer>
                <div className="footer-left">
                    <div className="logo">
                        <Link style={{color: "#ffffff"}} to="/">Flix</Link>
                    </div>
                    <div>
                        <p>Flix Footware (Pvt) Ltd.</p>
                        <p>123 Main Street,</p>
                        <p>Colombo 00100,</p>
                        <p>Sri Lanka</p>
                    </div>
                    <div>
                        <p>Phone: +94 11 2345 6789</p>
                        <p>Email: info@flixfashion.lk</p>
                    </div>
                </div>
                <div className="footer-middle">
                    <div className="footer-titles">
                        <p>Links</p>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/contact">Contact us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="footer-titles">
                        <p>Follow Us</p>
                    </div>
                    <div className="social-icons">
                        <p>
                            <Instagram/> Instagram
                        </p>
                        <p>
                            <Facebook/> Facebook
                        </p>
                        <p>
                            <YouTube/> Youtube
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    )
}