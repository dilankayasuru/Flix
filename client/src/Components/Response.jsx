import React, {useState} from "react";
import styled from "styled-components";
import {Close} from "@mui/icons-material";

const Wrapper = styled.div`
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

const Container = styled.div`
    text-align: center;
    background: #ffffff;
    border-radius: 15px;
    padding: 1.5em;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 550px;
    max-height: 300px;
    display: grid;
    place-items: center;
    
    img {
        max-width: 100px;
        max-height: 100px;
    }

    h2 {
        letter-spacing: 1px;
        font-size: 26px;
        text-transform: uppercase;
        font-style: italic;
        margin-bottom: 26px;
        position: relative;
    }

    p {
        margin-bottom: 10px;
        letter-spacing: 1px;
        font-weight: 300;
        font-size: 17px;
    }
`;

export default function Response(props) {

    const {response, setResponse} = props.state;

    return (
        <Wrapper style={response ? {display: "grid"} : {display: "none"}}>
            <Container>
                <Close
                    cursor="pointer"
                    sx={{
                        position: "absolute",
                        right: "0",
                        top: "0",
                        margin: "15px"
                    }}
                    onClick={() => {
                        setResponse(false)
                    }}
                />
                <div>
                    <img src="/done.png" alt="done image"/>
                    <h2>{props.title}</h2>
                    <p>{props.message}</p>
                </div>

            </Container>
        </Wrapper>
    )
}