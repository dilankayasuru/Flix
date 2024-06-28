import React, {createContext, useEffect, useState} from "react";
import styled from "styled-components";
import GetOrders from "../../Components/GetOrders";
import Profile from "./Profile";
import PersonIcon from "@mui/icons-material/Person";
import {useMediaQuery} from "@mui/material";
import Footer from "../../Sections/Footer/Footer";
import Navbar from "../../Sections/Navbar/Navbar";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const UserProfileWrapper = styled.div`
    margin-top: 77px;
    min-height: calc(100vh - 77px);

    @media (max-width: 600px) {
        margin-top: 60px;
        min-height: calc(100vh - 60px);
    }

    .user-top-nav-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .7em 0;
        border-bottom: 1px solid #d5d5d5;
        position: sticky;
        z-index: 5;
        top: 77px;
        background: #ffffff;
        
    }

    @media (max-width: 600px) {
        .user-top-nav-container {
            top: 60px;
        }
    }

    .user-top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        text-transform: uppercase;
    }

    .user-tab {
        cursor: pointer;
    }

    .user-tab span {
        width: 100%;
        padding-bottom: 20px;
    }

`;

export const CategoryContextUser = createContext();

export default function UserProfile(props) {

    const [activeTab, setActiveTab] = useState("all");

    const [count, setCount] = useState({
        all: 0,
        active: 0,
        completed: 0,
        canceled: 0
    })

    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(token);

    const [currentTab, setCurrentTab] = useState("orders");
    const isMobile = useMediaQuery('(max-width: 400px)');

    const user = jwtDecode(localStorage.getItem('jwtToken'))

    useEffect(() => {
        if (decoded.role !== "user"){
            navigate('/admin');
        }
    }, []);

    return (
        <React.Fragment>
            <Navbar/>
            <UserProfileWrapper>
                <div className="user-top-nav-container">
                    <div className="user-top-nav">
                        <div className="user-orders-tab user-tab"

                             onClick={() => setCurrentTab("orders")}
                        >
                            <span style={currentTab === "orders" ? {borderBottom: "2px solid #000000"} : {borderBottom: "none"}}>Orders</span>
                        </div>
                        <div className="user-profile-tab user-tab"

                             onClick={() => setCurrentTab("profile")}
                        >
                            <span style={currentTab === "profile" ? {borderBottom: "2px solid #000000"} : {borderBottom: "none"}}>Profile</span>
                        </div>
                    </div>
                    <div className="user-top-nav" style={{height: isMobile ? "41px" : "auto"}}>
                        <p>Hello {user.name}</p>
                        <PersonIcon
                            sx={
                                {
                                    background: "#d5d5d5",
                                    padding: "5px",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                }
                            }
                            style={{display: isMobile ? "none" : "block"}}
                        />
                    </div>
                </div>

                {currentTab === "orders" ? <CategoryContextUser.Provider value={{setCount, activeTab}}><GetOrders></GetOrders></CategoryContextUser.Provider> : <Profile></Profile>}
            </UserProfileWrapper>
            <Footer/>
        </React.Fragment>
    )
}