import React, {useContext, useEffect, useState} from "react";
import OrderItem from "./OrderItem";
import styled from "styled-components";
import {useMediaQuery} from "@mui/material";
import axios from "axios";
import {Grid} from "react-loader-spinner";
import {jwtDecode} from "jwt-decode";
import {CategoryContext} from "../Pages/Admin/Orders";
import {CategoryContextUser} from "../Pages/User/UserProfile";
import {useLocation} from "react-router-dom";

const OrderSectionWrapper = styled.div`
    padding: 0 1.5em;

    .orders-table-heading {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        place-items: center;
        padding: 1em;
    }
`;

export default function GetOrders() {

    const location = useLocation()

    const {setCount, activeTab} = useContext(location.pathname === '/admin' ? CategoryContext : CategoryContextUser);

    const token = localStorage.getItem('jwtToken');

    const isMobile = useMediaQuery("(max-width: 650px)");

    const [orders, setOrders] = useState([]);

    const [showOrders, setShowOrders] = useState([]);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setError('')

        const role = jwtDecode(token).role

        const route = role === "user" ? 'https://flix-server.vercel.app/get-orders-user' : 'https://flix-server.vercel.app/get-orders-admin'

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get(route)
            .then((res) => {
                setOrders(res.data.orders)
                setShowOrders(res.data.orders)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                if (error.response) setError(error.response.data.message)
                else setError(error.message)
            })
    }, []);

    useEffect(() => {
        if (activeTab === "all") {
            setShowOrders(orders)
        } else {
            setShowOrders(orders.filter(order => order.status === activeTab))
        }
    }, [activeTab])

    useEffect(() => {
        let active, completed, canceled = 0;

        active = orders.filter(order => order.status === 'active').length;
        completed = orders.filter(order => order.status === 'completed').length;
        canceled = orders.filter(order => order.status === 'canceled').length;

        setCount({
            all: orders.length,
            active: active,
            completed: completed,
            canceled: canceled
        })

    }, [orders])

    return (
        <>
            {loading ?
                <Grid
                    height="90"
                    width="90"
                    color="rgb(255,0,0)"
                    wrapperStyle={{
                        height: "100%",
                        width: "100%",
                        display: "grid",
                        placeItems: "center",
                        position: "absolute",
                        top: "0",
                        left: "0"
                    }}
                /> :
                <OrderSectionWrapper>
                    {
                        isMobile ?
                            <></> :
                            <div className="orders-table-heading">
                                <p>Order ID</p>
                                <p>Date</p>
                                <p>Status</p>
                                <p>Total</p>
                                <p>Action</p>
                            </div>
                    }
                    <div className="orders-container" style={{minHeight: "100vh"}}>
                        {
                            showOrders.length <= 0 ?
                                <p style={{
                                    textAlign: "center"
                                }}>
                                    No orders found
                                </p> :
                                showOrders.map(order => (
                                    <OrderItem {...order} key={order._id}/>
                                ))
                        }
                    </div>
                </OrderSectionWrapper>
            }
        </>
    )
}