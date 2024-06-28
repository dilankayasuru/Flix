import React from "react";
import Hero from "../Sections/Hero/Hero";
import Featured from "../Sections/Featured/Featured";
import Explore from "../Sections/Explore/Explore";
import Promotion from "../Sections/Promotion/Promotion";
import Navbar from "../Sections/Navbar/Navbar";
import Footer from "../Sections/Footer/Footer";

export default function home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Featured/>
            <Explore/>
            <Promotion/>
            <Footer/>
        </>
    )
}