import React from "react";
import "./ContactUs.css";
import Button from "../../Components/Button";
import Navbar from "../../Sections/Navbar/Navbar";
import Footer from "../../Sections/Footer/Footer";

export default function ContactUs() {
    return (
        <React.Fragment>
            <Navbar/>
            <div className="contactUs-container">
                <div className="contactUs-text">
                    <h1>Got something to say? We're all ears.</h1>
                    <p>We're here to listen. Feel free to drop us a line with any questions, comments, or feedback you
                        may
                        have. We look forward to hearing from you!</p>
                </div>
                <form action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="1c15c885-0948-4775-8155-7b766e8ddc17"/>
                    <p className="form-top-text">Send us a message</p>
                    <div className="input-container name">
                        <input type="text" placeholder="NAME" name="name" required/>
                    </div>
                    <div className="input-container email">
                        <input type="email" placeholder="EMAIL" name="email" required/>
                    </div>
                    <div className="input-container message">
                        <textarea placeholder="MESSAGE" name="message" required/>
                    </div>
                    <Button type="submit">SEND</Button>
                </form>
            </div>
            <Footer/>
        </React.Fragment>
    )
}