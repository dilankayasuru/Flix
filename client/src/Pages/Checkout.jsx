import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {FormControl, TextField} from "@mui/material";
import Button from "../Components/Button";
import Footer from "../Sections/Footer/Footer";
import Navbar from "../Sections/Navbar/Navbar";
import {useLocation, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import ThankYou from "../Components/ThankYou";

const Heading = styled.h2`
    letter-spacing: 1px;
    font-weight: 300;
    font-size: 20px;
    text-transform: uppercase;
    font-style: italic;
    position: relative;
    margin-bottom: 25px;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -3px;
        width: 100px;
        border-bottom: 1px solid #000000;
    }
`;

const OrderItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .order-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }

    .order-details img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    }

    .text-details p {
        //padding: 1px 0;
        line-height: 22px;
    }

    .item-price {
        font-size: 22px;
    }
`;

const CheckoutWrapper = styled.div`
    min-height: 100vh;
    padding-top: calc(77px + 2em);
    padding-bottom: 2em;
    display: flex;
    justify-content: center;
    gap: 10px;

    @media (max-width: 600px) {
        padding-top: calc(60px + 2em);
    }

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        gap: 2em;
    }

    p {
        line-height: 1.3em;
    }
`;

const CheckoutLeft = styled.div`
    width: 100%;
    padding: 0 1em;
    max-width: 450px;

    .amount-bar {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1em 0;
    }

    .left-inner {
        position: sticky;
        top: 109px;
    }
`;

const CheckoutRight = styled.form`
    width: 100%;
    padding: 0 1em;
    max-width: 450px;
`;


export default function Checkout() {

    const navigate = useNavigate();

    const location = useLocation();

    const data = location.state;

    const shippingCharge = 5;

    const [shippingDetails, setShippingDetails] = useState({
        address: "", apartment: "", city: "", postalCode: 0, phone: ""
    })

    const [products, setProducts] = useState([]);

    const [order, setOrder] = useState({
        total: 0, address: {}, phone: "", products: []
    });

    const [error, setError] = useState('');

    const [response, setResponse] = useState({message: "", orderId: ""})

    const [promo, setPromo] = useState('');

    const handleChange = (e) => {
        setError('')
        const {name, value} = e.target;
        setShippingDetails({...shippingDetails, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.post('http://localhost:5000/checkout', order)
            .then((res) => {
                const {message, orderId} = res.data;
                setError('');
                setResponse({message, orderId})
            })
            .catch((error) => {
                setResponse({message: "", orderId: ""})
                if (error.response) setError(error.response.data.message)
                else setError(error.message)
            })
    };


    useEffect(() => {
        const {address, phone} = jwtDecode(localStorage.getItem("jwtToken")).shipping
        setShippingDetails({...address, phone})
        if (!data) return navigate('/shop')
        setProducts(data)
    }, []);

    useEffect(() => {
        let subTot = 0;
        products.map(product => (
            subTot += product.qty * product.price
        ))

        const orderProducts = [];

        products.map(product => {
            orderProducts.push({
                qty: product.qty, size: product.size, variantId: product.variantId, productId: product._id
            })
        })

        const {address, apartment, city, postalCode, phone} = shippingDetails;

        setOrder({
            total: subTot + shippingCharge,
            address: {
                address: address, apartment: apartment, city: city, postalCode: postalCode
            },
            phone: phone,
            products: orderProducts
        });
    }, [products, shippingDetails]);

    const checkPromo = (e) => {
        setPromo(e.target.value)
    }

    useEffect(() => {
        let originalPrice = 0;
        products.map(product => (
            originalPrice += product.qty * product.price
        ))
        if (promo === "FlixNow25"){
            setOrder({...order, total: originalPrice - originalPrice * 0.25})
        }
        else {
            setOrder({...order, total: originalPrice})
        }
    }, [promo])

    return (<React.Fragment>
        <Navbar/>
        {response.message === "Order placed successfully" && <ThankYou {...response}/>}
        <CheckoutWrapper>
            <CheckoutLeft>
                <div className="left-inner">
                    <Heading>Order Details</Heading>
                    <div style={{paddingBottom: "20px"}}>
                        <p style={{opacity: "60%"}}>Total</p>
                        <p style={{fontSize: "24px"}}>${order.total}</p>
                    </div>
                    {products.map(product => (<OrderItem key={product._id}>
                        <div className="order-details">
                            <img
                                src={product.thumbnail}
                                alt={product.name}/>
                            <div className="text-details">
                                <p>{product.name}</p>
                                <p><span style={{opacity: "60%"}}>Size</span> {product.size}</p>
                                <p><span style={{opacity: "60%"}}>Qty</span> {product.qty}</p>
                            </div>
                        </div>
                        <div style={{textAlign: "end"}}>
                            <p className="item-price">${product.price * product.qty}</p>
                            <p style={{opacity: "60%", fontSize: "12px"}}>${product.price} each</p>
                        </div>
                    </OrderItem>))}
                    <div className="amount-bar">
                        <p>Subtotal</p>
                        <p>${order.total}</p>
                    </div>
                    <div className="amount-bar">
                    <span style={{opacity: "60%"}}>
                        <p>Shipping</p>
                        <p>(3-5 business days)</p>
                    </span>
                        <p>${shippingCharge}</p>
                    </div>
                    <div className="amount-bar">
                        <p>Total due</p>
                        <p>${order.total}</p>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "1em",
                        alignItems: "center"
                    }}>
                        <p>Apply PromoCode:</p>
                        <TextField
                            id="promocode" label="Promo Code" variant="outlined"
                            value={promo}
                            onInput={checkPromo}
                            helperText={promo === "FlixNow25" && "PromoCode Applied"}
                        />
                    </div>
                </div>
            </CheckoutLeft>
            <CheckoutRight onSubmit={handleSubmit}>
                <div>
                    <Heading>Shipping Details</Heading>
                    <div>
                        <TextField
                            fullWidth
                            label="Address"
                            required
                            sx={{
                                marginBottom: "15px", '& .MuiFormLabel-root': {
                                    fontSize: '0.8rem',
                                },
                            }}
                            name="address"
                            value={shippingDetails.address}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Appartment, suite, etc. (optional)"
                            sx={{
                                marginBottom: "15px", '& .MuiFormLabel-root': {
                                    fontSize: '0.8rem',
                                },
                            }}
                            name="apartment"
                            value={shippingDetails.apartment}
                            onChange={handleChange}
                        />
                        <div
                            style={{
                                display: "flex", alignItems: "center", gap: "15px"
                            }}
                        >
                            <TextField
                                fullWidth
                                label="City"
                                required
                                sx={{
                                    marginBottom: "15px", '& .MuiFormLabel-root': {
                                        fontSize: '0.8rem',
                                    },
                                }}
                                name="city"
                                value={shippingDetails.city}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Postal Code"
                                required
                                sx={{
                                    marginBottom: "15px", '& .MuiFormLabel-root': {
                                        fontSize: '0.8rem',
                                    },
                                }}
                                name="postalCode"
                                value={shippingDetails.postalCode || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <TextField
                            fullWidth
                            type="tel"
                            label="Phone"
                            sx={{
                                marginBottom: "15px", '& .MuiFormLabel-root': {
                                    fontSize: '0.8rem',
                                },
                            }}
                            name="phone"
                            value={shippingDetails.phone}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                <div style={{paddingTop: "20px"}}>
                    <Heading>Payment Details</Heading>
                    <div>
                        <TextField
                            fullWidth
                            type="text"
                            label="CARDHOLDER NAME"
                            required
                            inputProps={{style: {textTransform: "uppercase"}}}
                            sx={{
                                marginBottom: "15px", '& .MuiFormLabel-root': {
                                    fontSize: '0.8rem',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="CARD NUMBER"
                            required
                            sx={{
                                marginBottom: "15px", '& .MuiFormLabel-root': {
                                    fontSize: '0.8rem',
                                },
                            }}
                            inputProps={{maxLength: 19}}
                            onChange={(e) => {
                                const value = e.target.value;
                                e.target.value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            }}
                        />
                        <div
                            style={{
                                display: "flex", alignItems: "center", gap: "15px"
                            }}
                        >
                            <TextField
                                fullWidth
                                label="MOUNTH"
                                required
                                type="number"
                                inputProps={{min: 1, max: 12}}
                                sx={{
                                    marginBottom: "15px", '& .MuiFormLabel-root': {
                                        fontSize: '0.8rem',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="YEAR"
                                type="number"
                                required
                                sx={{
                                    marginBottom: "15px", '& .MuiFormLabel-root': {
                                        fontSize: '0.8rem',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="CVV"
                                type="number"
                                required
                                inputProps={{min: 0, max: 999}}
                                sx={{
                                    marginBottom: "15px", '& .MuiFormLabel-root': {
                                        fontSize: '0.8rem',
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        style={{
                            borderRadius: "0", width: "100%", padding: "1em 0", textTransform: "uppercase"
                        }}
                    >
                        Pay now
                    </Button>
                </div>
                {error && <p style={{color: "rgb(220, 15, 15)", textAlign: "center"}}>{error}</p>}
            </CheckoutRight>
        </CheckoutWrapper>
        <Footer/>
    </React.Fragment>)
}