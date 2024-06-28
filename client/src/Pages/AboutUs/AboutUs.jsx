import React from "react";
import "./AboutUs.css";
import Footer from "../../Sections/Footer/Footer";
import Navbar from "../../Sections/Navbar/Navbar";

export default function AboutUs() {
    return (
        <React.Fragment>
            <Navbar/>
            <div className="aboutUs-wrapper">
                <div className="aboutUs-header">
                    <p>About Us</p>
                </div>
                {/*<div className="header-image">*/}
                {/*    <img*/}
                {/*        src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
                {/*        alt="about us image"/>*/}
                {/*</div>*/}
                <div className="aboutUs-content-container">
                    <div className="content">
                        <div className="content-image">
                            <img
                                src="https://images.unsplash.com/photo-1593010932917-92bd21088dee?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="content image"/>
                        </div>
                        <div className="content-text">
                            <h2>Welcome to Flix</h2>
                            <p>At Flix, we believe that every step you take should be a statement of style, comfort, and
                                individuality. Founded with a passion for footwear and a dedication to quality, Flix is
                                your
                                ultimate destination for the latest trends and timeless classics in the world of
                                shoes.</p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-image">
                            <img
                                src="https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="content image"/>
                        </div>
                        <div className="content-text">
                            <h2>Our Story</h2>
                            <p>The journey of Flix began with a simple idea to create a shoe brand that combines
                                cutting-edge design with unparalleled comfort. Our founders, avid shoe enthusiasts with
                                a
                                keen eye for fashion, saw a gap in the market for footwear that didn't compromise on
                                quality
                                or style. With this vision, Flix was born.</p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-image">
                            <img
                                src="https://images.pexels.com/photos/5225416/pexels-photo-5225416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="content image"/>
                        </div>
                        <div className="content-text">
                            <h2>Our Mission</h2>
                            <p>Our mission is to empower you with footwear that not only complements your unique style
                                but
                                also supports your active lifestyle. Whether you're dressing up for a special occasion,
                                hitting the gym, or enjoying a casual day out, Flix has the perfect pair of shoes for
                                you.</p>
                        </div>
                    </div>
                    <div className="content-text content-footer">
                        <h2>Join the Flix Community</h2>
                        <p>At Flix, we are more than just a shoe brand; we are a community of like-minded individuals
                            who
                            share a love for fashion and quality. Follow us on social media, sign up for our newsletter,
                            and
                            be the first to know about our latest arrivals, exclusive offers, and events.</p>
                        <p>Thank you for choosing Flix. We are excited to be a part of your journey and look forward to
                            providing you with exceptional footwear that you’ll love to wear.
                        </p>
                        <p className="footer-bottom-text">Step into Style with Flix!</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}