import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Delete} from "@mui/icons-material";
import Button from "./Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const CartContainer = styled.div`
    .cart-products-container {
        min-height: calc(100vh - 147px - 67px);
    }

    .cart-product {
        margin: 10px;
        border-radius: 15px;
        overflow: hidden;
        display: flex;
        gap: 20px;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 0 6px 10px 0;
    }

    .cart-product-details-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .cart-product-details p {
        margin-bottom: 7px;
    }

    .cart-product-qty input {
        width: 40px;
        text-align: center;
    }

    .cart-product-image {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
    }

    .cart-product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .cart-bottom {
        padding: 1.5em;
        position: sticky;
        bottom: 0;
        right: 0;
        width: 100%;
        text-align: center;
        background: #f7f7f7;
        box-shadow: 0 0 25px 0 rgba(0, 0, 0, .3);
    }

    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3em;
        margin-bottom: 1em;
    }

    .cart-bottom button {
        width: 60%;
        padding: 0.7em 0;
        font-size: 16px;
    }

    .empty-cart {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #6c6c6c;
        padding-top: 100px;
    }
`;

export default function ShoppingCart(props) {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');

    const decoded = token ? jwtDecode(token) : '';

    const [error, setError] = useState('');

    const [products, setProducts] = useState([]);

    const [total, setTotal] = useState(0);

    const [deleted, setDelete] = useState(false);

    const handleDelete = (variantId, size) => {
        const id = variantId._id;

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.put('http://localhost:5000/delete-cart-item', {id, size})
            .then(res => {
                setError('')
                setDelete(true)
            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data.message)
                } else {
                    setError(error.message)
                }
            })
    }

    const checkOut = () => {

        const items = []

        products.map(product => (
            items.push({...product.productId, size: product.size, qty: product.qty, variantId: product.variantId._id})
        ))

        navigate('/checkout', {state: items})
    }

    useEffect(() => {
        if (token && (decoded.role !== 'admin')) {

            axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

            axios.get('http://localhost:5000/get-cart')
                .then(res => {
                    setError('')
                    setProducts(res.data.cart.products)
                })
                .catch(error => {
                    setProducts([])
                    if (error.response) {
                        setError(error.response.data.message)
                    } else {
                        setError(error.message)
                    }
                })
        }
    }, [props.open, deleted])

    useEffect(() => {
        if (decoded) {
            let tot = 0;
            products.forEach(({productId, qty}) => (
                tot += productId.price * qty
            ))
            setTotal(tot)
            setDelete(false)
        }

    }, [products])


    return (
        <CartContainer>
            {!token && <div className="empty-cart">Sign in to use cart</div>}
            <div className="cart-products-container">
                {
                    products.length > 0 ? products.map(({productId, variantId, size, qty}, index) => (
                                <div key={index} className="cart-product">
                                    <div className="cart-product-details-container">
                                        <div className="cart-product-image">
                                            <img src={variantId.images[0]} alt="cart product image"/>
                                        </div>
                                        <div className="cart-product-details">
                                            <p>{productId.name}</p>
                                            <p>Size: {size}</p>
                                            <p>Qty: {qty}</p>
                                            <p>Price: ${productId.price}</p>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        alignSelf: "flex-start",
                                        gap: "15px"
                                    }}>
                                        <p style={{fontSize: "1.5em"}}>${productId.price * qty}</p>
                                        <Delete cursor="pointer" onClick={() => handleDelete(variantId, size)}/>
                                    </div>
                                </div>
                            )
                        ) :
                        <>
                            {
                                token && <div className="empty-cart">Your Cart is Empty</div>
                            }
                        </>

                }
                {error && <div className="empty-cart">{error}</div>}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <p>Subtotal:</p>
                    <p>${total}</p>
                </div>
                <Button onClick={checkOut}>Checkout</Button>
            </div>
        </CartContainer>

    )
}