import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "./Button";

export default function LogOut() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    return (
        <button type="button" onClick={handleLogOut} className="signIn-button">Log out</button>
    )
};