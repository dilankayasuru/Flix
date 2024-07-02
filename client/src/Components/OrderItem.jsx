import React, {useEffect, useState} from "react";
import styled from "styled-components";
import VisibilityIcon from '@mui/icons-material/Visibility';
import OrderInfo from "./OrderInfo";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, useMediaQuery} from "@mui/material";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Button from "./Button";

const OrderItemRow = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-items: center;
    padding: 1em;
    border-radius: 15px;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, .2);
    margin: 13px 0;

    @media (max-width: 650px) {
        grid-template-columns: 1fr;
        place-items: normal;
        div p {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
    }
`;

const ActionButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .2);
    cursor: pointer;
    background: hsl(140, 52%, 55%);
    transition: all .2s ease-in-out;

    &:hover {
        background: hsl(140, 52%, 48%);
    }
`;

export default function OrderItem(props) {

    const decoded = jwtDecode(localStorage.getItem('jwtToken'));

    const isMobile = useMediaQuery("(max-width: 650px)");

    const [admin, setAdmin] = useState(false);

    const [error, setError] = useState('');

    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        setResponse('')
        setError('')

        const token = localStorage.getItem('jwtToken')

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.put("https://flix-server.vercel.app/update-order", {orderId: props._id, status: e.target.value})
            .then((res) => {
                setResponse(res.data.message)
                setError('')
            })
            .catch((error) => {
                setResponse('')
                if (error.response) setError(error.response.data.message)
                else setError(error.message)
            })
    };

    useEffect(() => {
        const token = jwtDecode(localStorage.getItem('jwtToken'))
        setAdmin(token.role === "admin");
    }, []);

    const cancelOrder = (order) => {

        console.log(order)

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + localStorage.getItem('jwtToken');

        axios.put(`https://flix-server.vercel.app/cancel-order/${props._id}`)
            .then(res => {
                setError('')
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                if (err.response) setError(err.response.data.message)
                else setError(err.message)
            })

    }

    return (
        <OrderItemRow>
            <div className="order-item-details">
                <p>
                    {
                        isMobile ? <span>Order ID</span> : <></>
                    }
                    <span>{props._id}</span>
                </p>
            </div>
            <div className="order-item-details">
                <p>
                    {
                        isMobile ? <span>Date</span> : <></>
                    }
                    <span>{new Date(props.date).getDate()}/{new Date(props.date).getMonth() + 1}/{new Date(props.date).getFullYear()}</span>
                </p>
            </div>
            <div className="order-item-details">
                <div style={isMobile ? {display: "flex", justifyContent: "space-between"} : {}}>
                    {
                        isMobile ? <p>Status</p>
                            : <></>
                    }
                    {
                        admin ? <React.Fragment>
                                <FormControl>
                                    <InputLabel id="select-status">Status</InputLabel>
                                    <Select
                                        sx={{minWidth: "120px"}}
                                        labelId="select-status"
                                        defaultValue={props.status}
                                        onChange={handleChange}
                                        label="Status"
                                        error={!!error}
                                    >
                                        <MenuItem value="completed">Completed</MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="canceled">Canceled</MenuItem>
                                    </Select>
                                    <FormHelperText>{error}</FormHelperText>
                                    {response && <FormHelperText sx={{color: "rgb(45,203,45)"}}>{response}</FormHelperText>}

                                </FormControl>
                            </React.Fragment>
                            : <span style={{textTransform: "capitalize"}}>{props.status}</span>
                    }
                </div>
            </div>
            <div className="order-item-details">
                <p>
                    {
                        isMobile ? <span>Price</span> : <></>
                    }
                    <span>${props.total}</span>
                </p>
            </div>
            <div className="order-item-details" style={{
                justifySelf: "center",
                display: "flex",
                gap: "5px"
            }}>
                <ViewOrder {...props}/>
                {
                    decoded.role === 'user' &&
                    (props.status !== "completed" && props.status !== "canceled") &&
                    <Button style={{borderRadius: "5px"}} onClick={() => cancelOrder(props)}>Cancel</Button>
                }
            </div>
        </OrderItemRow>
    )
}

function ViewOrder(props) {

    const [openOrder, setOpenOrder] = useState(false);

    function handleOpen() {
        setOpenOrder(true)
    }

    function handleClose() {
        setOpenOrder(false)
    }

    return (
        <React.Fragment>
            <ActionButton onClick={() => setOpenOrder(true)}><VisibilityIcon/>View Order</ActionButton>
            {openOrder ? <OrderInfo {...props} handleClose={handleClose}/> : <></>}
        </React.Fragment>
    )
}