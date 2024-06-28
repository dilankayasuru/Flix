import React from "react";
import styled from "styled-components";
import Footer from "../Sections/Footer/Footer";
import Navbar from "../Sections/Navbar/Navbar";

const PageNotFoundContainer = styled.div`
    margin-top: 77px;
    min-height: calc(50vh);
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media screen and (max-width: 600px){
        border-top: 60px;
        min-height: calc(50vh);
        padding: 0 1em;
    }
`;

const BigText = styled.p`
    text-transform: uppercase;
    font-size: 100px;
    font-weight: 200;
    letter-spacing: 1px;
    
    @media screen and (max-width: 600px) {
        font-size: 90px;
    }
`;

const SmallText = styled.p`
    font-weight: 300;
    font-size: 20px;
    letter-spacing: 1px;
    margin-bottom: 5px;
`;

export default function PageNotFound() {
    return(
        <React.Fragment>
            <Navbar/>
            <PageNotFoundContainer>
                <div>
                    <BigText>Sorry</BigText>
                    <SmallText>404 - Page Not Found :(</SmallText>
                    <SmallText>Unfortunately, this page does not exists.</SmallText>
                </div>
            </PageNotFoundContainer>
            <Footer/>
        </React.Fragment>
    )
}