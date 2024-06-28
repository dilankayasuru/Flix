import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

export default function AdminProtected() {

    const token = localStorage.getItem('jwtToken');
    if (!token) return <Navigate to='/'/>

    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') return <Navigate to='/' />

    return <Outlet/>;
}