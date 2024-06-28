import React, {createContext, useEffect, useState} from "react";
import styled from "styled-components";
import GetOrders from "../../Components/GetOrders";
import {useMediaQuery} from "@mui/material";

const AdminNavigation = styled.div`
    border-bottom: 1px solid #d5d5d5;
    display: flex;
    justify-content: left;
    align-items: center;

    .admin-tab-tertiary {
        padding: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .admin-tab-tertiary .count {
        border: 1px solid #000000;
        border-radius: 5px;
        padding: 5px;
    }
`;

const AdminHeading = styled.p`
    font-weight: 300;
    font-size: 26px;
    letter-spacing: 1px;
    margin-bottom: 5px;
`;

const OrdersViewController = styled.div`
    position: sticky;
    top: 145px;
    background: rgb(255, 255, 255);
    padding: 1em 1em 0;
    z-index: 2;
    box-shadow: 1px 0 5px rgba(0, 0, 0, .2);

    @media screen and (max-width: 600px) {
        top: 127px;
    }
`;

export const CategoryContext = createContext();

export default function Orders() {

    const [activeTab, setActiveTab] = useState("all");

    const [count, setCount] = useState({
        all: 0,
        active: 0,
        completed: 0,
        canceled: 0
    })

    const isDesktop = useMediaQuery("(min-width: 500px)");

    return (
        <div>
            <OrdersViewController>
                <AdminHeading>Orders</AdminHeading>
                <AdminNavigation>
                    <div
                        className="admin-tab-tertiary"
                        style={(activeTab === "all") ? {borderBottom: "1px solid #000000"} : {borderBottom: "none"}}
                        onClick={() => setActiveTab("all")}
                    >
                        <span>All</span>
                        {isDesktop && <span className="count">{count.all}</span>}
                    </div>
                    <div
                        className="admin-tab-tertiary"
                        style={(activeTab === "active") ? {borderBottom: "1px solid #000000"} : {borderBottom: "none"}}
                        onClick={() => setActiveTab("active")}
                    >
                        <span>Active</span>
                        {isDesktop && <span className="count">{count.active}</span>}
                    </div>
                    <div
                        className="admin-tab-tertiary"
                        style={(activeTab === "completed") ? {borderBottom: "1px solid #000000"} : {borderBottom: "none"}}
                        onClick={() => setActiveTab("completed")}

                    >
                        <span>Completed</span>
                        {isDesktop && <span className="count">{count.completed}</span>}

                    </div>
                    <div
                        className="admin-tab-tertiary"
                        style={(activeTab === "canceled") ? {borderBottom: "1px solid #000000"} : {borderBottom: "none"}}
                        onClick={() => setActiveTab("canceled")}
                    >
                        <span>Canceled</span>
                        {isDesktop && <span className="count">{count.canceled}</span>}
                    </div>
                </AdminNavigation>
            </OrdersViewController>
            <CategoryContext.Provider value={{setCount, activeTab}}>
                <GetOrders/>
            </CategoryContext.Provider>
        </div>
    )
}
