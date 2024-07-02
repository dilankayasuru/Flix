import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Close} from "@mui/icons-material";
import Button from "./Button";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import WriteReview from "./WriteReview";

const OrderInfoWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    min-height: calc(100vh - 140px);
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    margin-top: 140px;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1em;

    @media (max-width: 600px) {
        margin-top: 123px;
        min-height: calc(100vh - 123px);
    }
`;

const OrderDetailsContainer = styled.div`
    background: #ffffff;
    padding: 0 1em 1em;
    border-radius: 15px;
    overflow-y: scroll;
    height: calc(100vh - 200px);
    box-shadow: 1px 1px 15px rgba(0, 0, 0, .5);

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    .order-details-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
        position: sticky;
        top: 0;
        background: #ffffff;
        padding-bottom: 10px;
    }

    .order-details-heading h2 {
        letter-spacing: 1px;
        text-transform: uppercase;
        font-style: italic;
        position: relative;
    }

    .order-details-heading h2::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #000000;
        width: 150px;
    }
`;

const OrderDetails = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    gap: 15px;
    padding: 1em;
    background: #e3e3e3;
    border-radius: 5px;

    @media (max-width: 600px) {
        flex-wrap: wrap;
    }

    div {
        width: 100%;
    }

    p {
        margin-bottom: 5px;
        letter-spacing: 1px;
    }

    & p:last-child {
        color: #484848;
    }
`;

const OrderItemsContainer = styled.div`
    .order-items-table-heading {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #d5d5d5;
        margin-bottom: 10px;
    }
`;

const OrderItemRow = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid #d5d5d5;
    padding-bottom: 10px;
    margin-bottom: 10px;

    .order-item-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .order-item-image {
        height: 80px;
        width: 80px;
        overflow: hidden;
        border-radius: 5px;
    }

    .order-item-image img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
    }

    div p span {
        margin-right: 5px;
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
        place-items: flex-start;
        gap: 10px;

        .order-item-image {
            grid-row: 1 / 5;
            width: 100%;
            height: 100%;
        }

    }
`;

export default function OrderInfo(props) {

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <OrderInfoWrapper>
            <OrderDetailsContainer>
                <div className="order-details-heading">
                    <h2>Order Details</h2>
                    <Close onClick={props.handleClose} cursor="pointer" sx={{fontSize: "26px"}}/>
                </div>
                <div>
                    <OrderDetails>
                        <div>
                            <p>Date Placed</p>
                            <p>{new Date(props.date).getDate()}/{new Date(props.date).getMonth() + 1}/{new Date(props.date).getFullYear()}</p>
                        </div>
                        <div>
                            <p>Order ID</p>
                            <p>{props._id}</p>
                        </div>
                        <div>
                            <p>Total</p>
                            <p>${props.total}</p>
                        </div>
                        <div>
                            <p>Address</p>
                            <p style={{flexDirection: "column", display: "flex"}}>
                                <span>{props.address.address} </span>
                                <span>{props.address.apartment} </span>
                                <span>{props.address.city} </span>
                                <span>{props.address.postalCode} </span>
                                <span>{props.phone}</span>
                            </p>
                        </div>
                    </OrderDetails>
                </div>
                <OrderItemsContainer>
                    {isMobile ? <></> : <div className="order-items-table-heading">
                        <p>Product</p>
                        <p>Price</p>
                        <p>Qty</p>
                        <p>Action</p>
                    </div>}

                    <div className="order-items">
                        {
                            props.products.map(product => (
                                <OrderItem {...product} status={props.status} key={product.productId}/>
                            ))
                        }
                    </div>
                </OrderItemsContainer>
            </OrderDetailsContainer>
        </OrderInfoWrapper>)
}

function OrderItem(props) {

    const [user, setUser] = useState(false);

    const [product, setProduct] = useState({});

    const [variantImg, setVariantImg] = useState('');

    useEffect(() => {
        const token = jwtDecode(localStorage.getItem('jwtToken'));
        setUser(token.role === 'user');

        try {
            axios.get(`https://flix-server.vercel.app/product/${props.productId}/${props.variantId}`)
                .then((res) => {
                    setProduct(res.data.product)
                    setVariantImg(res.data.variantImg)
                })
                .catch((error) => {
                    if (error.response) console.log(error.response.data.message)
                    else console.log(error.message)
                })
        } catch (error) {
            console.log(error.message)
        }
    }, []);

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (<OrderItemRow>
        {isMobile ? <>
            <div className="order-item-image">
                <img
                    src={variantImg}
                    alt="order -item"/>
            </div>
            <div className="order-item-info">
                <p style={isMobile ? {marginBottom: "10px"} : {}}>{"Radiant Glide"}</p>
                <p>Size {10}</p>
            </div>
        </> : <div className="order-item-details">
            <div className="order-item-image">
                <img
                    src={variantImg}
                    alt="order -item"/>
            </div>
            <div className="order-item-info">
                <p>{product.name}</p>
                <p>Size {props.size}</p>
            </div>
        </div>}


        <div>
            <p>
                {isMobile ? <span>Price</span> : <></>}
                <span>${product.price}</span>
            </p>
        </div>

        <div>
            <p>
                {isMobile ? <span>Qty</span> : <></>}
                <span>{props.qty}</span>
            </p>
        </div>

        <div style={isMobile ? {
            gridColumn: "span 2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
        } : {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }}
        >
            {
                user && props.status === "completed" && <WriteReview productId={props.productId}/>
            }
            <Link to={`/product/${props.productId}`} style={{margin: "0 auto"}}>
                <Button>View Item</Button>
            </Link>
        </div>
    </OrderItemRow>)
}