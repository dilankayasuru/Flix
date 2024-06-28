import React, {useEffect, useState} from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import Orders from "./Orders";
import Inventory from "./Inventory";
import Navbar from "../../Sections/Navbar/Navbar";
import Footer from "../../Sections/Footer/Footer";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AdminWrapper = styled.div`
    margin-top: 77px;
    min-height: calc(100vh - 77px);
    position: relative;

    .adminBar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1em .5em;
        box-shadow: 1px 0 5px rgba(0, 0, 0, .2);
        position: sticky;
        z-index: 2;
        top: 77px;
        background: #ffffff;
    }

    .tabSwitch {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tab {
        text-align: center;
        width: 100px;
        cursor: pointer;
        text-transform: uppercase;
    }

    .tab span {
        width: 100%;
        padding-bottom: 23px;
    }

    .profile-pic-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        position: relative;
    }

    .profile-pic {
        border-radius: 50%;
        overflow: hidden;
        width: 35px;
        height: 35px;
        text-align: center;
        box-shadow: 1px 0 25px rgba(0, 0, 0, .2);
        background: #d5d5d5;
    }

    @media screen and (max-width: 600px) {
        margin-top: 60px;
        min-height: calc(100vh - 60px);

        .adminBar {
            top: 60px;
            justify-content: space-between;
        }

    }
`;



export default function Admin() {

    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(token);

    const [switchTab, setSwitchTab] = useState("orders");

    useEffect(() => {
        if (decoded.role !== "admin"){
            navigate('/user', {username: decoded.username});
        }
    }, []);


    return (
        <React.Fragment>
            <Navbar/>
            <AdminWrapper>
                <div className="adminBar">
                    <div className="tabSwitch">
                        <div
                            className="store-tab tab"
                            onClick={() => setSwitchTab("inventory")}
                        >
                        <span
                            style={switchTab === "orders" ? {borderBottom: "none"} : {borderBottom: "2px solid #000000"}}>
                            Inventory
                        </span>
                        </div>
                        <div
                            className="orders-tab tab"
                            onClick={() => setSwitchTab("orders")}
                        >
                        <span
                            style={switchTab === "inventory" ? {borderBottom: "none"} : {borderBottom: "2px solid #000000"}}>
                            Orders
                        </span>
                        </div>
                    </div>
                    <div className="profile-pic-container">
                        <p>Admin</p>
                        <div className="profile-pic">
                            <PersonIcon
                                sx={
                                    {fontSize: "2em"}
                                }
                            />
                        </div>
                    </div>
                </div>

                {switchTab === "inventory" ? <Inventory/> : <Orders/>}

            </AdminWrapper>
            <Footer/>
        </React.Fragment>
    )
}