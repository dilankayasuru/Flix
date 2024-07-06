import React, {useEffect, useState} from "react";
import "./Navbar.css";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {Close} from "@mui/icons-material";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Logo from "../../Components/Logo";
import Button from "../../Components/Button";
import PersonIcon from '@mui/icons-material/Person';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCart from "../../Components/ShoppingCart";
import styled from "styled-components";
import LogOut from "../../Components/LogOut";

const CartContainer = styled.div`
    background: #ffffff;
    height: 100vh;
    min-width: 450px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;
    overflow-y: scroll;
    scrollbar-width: none;
    box-shadow: 4px 4px 25px 10px rgba(0, 0, 0, .2);
    transition: all .5s ease-in-out;

    .cart-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        position: sticky;
        top: 0;
        right: 0;
        width: 100%;
        background: #ffffff;
        box-shadow: 0 0 25px 0 rgba(0, 0, 0, .3);
    }

    .cart-top p {
        font-size: 1.3em;
    }

    @media screen and (max-width: 450px) {
        min-width: 0;
        width: 100%;
    }
`;

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const mobileNavShow = {
        transform: "translateX(0)",
        minWidth: "320px"
    }

    const mobileNavHide = {
        transform: "translateX(350px)"
    }

    const blur = {
        display: `${showMenu || showCart ? "block" : "none"} `,
        backdropFilter: "blur(5px)",
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        zIndex: "1000",
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setToken(token);
    }, []);

    return (
        <>
            <section>
                <div className="desktop-nav">
                    <Link to={"/"}>
                        <Logo/>
                    </Link>
                    <nav>
                        <ul>
                            <li onClick={() => navigate("/shop/men")}><span>Men</span></li>
                            <li onClick={() => navigate("/shop/women")}><span>Women</span></li>
                            <li onClick={() => navigate("/shop/kids")}><span>Kids</span></li>
                            <li onClick={() => navigate("/shop")}><span>Shop</span></li>
                        </ul>
                    </nav>
                    <div className="button-container">
                        <Link to="/login">
                            {token ? <LogOut/> : <button className="signIn-button">Sign In</button>}
                        </Link>
                        <div className="nav-icons" onClick={() => setShowCart(!showCart)}>
                            <ShoppingCartRoundedIcon/>
                        </div>
                        <div onClick={() => navigate("/user")}>
                            <PersonIcon
                                sx={{
                                    background: "#d5d5d5",
                                    padding: "5px",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                }}
                                cursor="pointer"
                            />
                        </div>
                    </div>
                </div>
                <div className="mobile-nav-top">
                    <Link to={"/"}>
                        <Logo/>
                    </Link>
                    <div className="mobile-nav-top-icon-container">
                        <div className="mobile-nav-top-icon">
                            <div onClick={() => navigate("/user")}>
                                <PersonIcon
                                    sx={{
                                        padding: "5px",
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                    }}
                                    cursor="pointer"
                                />
                            </div>
                        </div>
                        <div className="mobile-nav-top-icon" onClick={() => setShowCart(!showCart)}>
                            <ShoppingCartRoundedIcon
                                sx={
                                    {
                                        fontSize: "2em",
                                    }
                                }
                            />
                        </div>
                        <div className="mobile-nav-top-icon" onClick={() => setShowMenu(!showMenu)}>
                        <MenuRoundedIcon
                                sx={
                                    {
                                        fontSize: "2.2em",
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="mobile-nav" style={showMenu ? mobileNavShow : mobileNavHide}>
                    <div className="close-btn">
                        <Close fontSize="large" className="close-btn" onClick={() => setShowMenu(!showMenu)}/>
                    </div>
                    <nav>
                        <ul>
                            <li onClick={() => {
                                setShowMenu(!showMenu)
                                navigate("/shop/men")
                            }}><span>Men</span></li>
                            <li onClick={() => {
                                setShowMenu(!showMenu)
                                navigate("/shop/women")
                            }}><span>Women</span></li>
                            <li onClick={() => {
                                setShowMenu(!showMenu)
                                navigate("/shop/kids")
                            }}><span>Kids</span></li>
                            <li onClick={() => {
                                setShowMenu(!showMenu)
                                navigate("/shop")
                            }}><span>Shop</span></li>
                        </ul>
                    </nav>
                    {
                        !token &&
                        <div className="login-container">
                            <div className="mobile-nav-text">
                                <p>
                                    Ready to unlock exclusive benefits? Sign in or join us today!
                                </p>
                            </div>
                            <div className="mobile-nav-buttons">
                                <Button onClick={() => {
                                    setShowMenu(!showMenu)
                                    navigate("/login")
                                }}>Join Us</Button>
                            </div>
                        </div>
                    }
                    {
                        token &&
                        <div className="login-container">
                            <LogOut/>
                        </div>
                    }
                </div>
            </section>
            <CartContainer style={showCart ? {transform: "translateX(0)"} : {transform: "translateX(150%)"}}>
                <div className="cart-top">
                    <p>My Cart</p>
                    <Close fontSize="large" onClick={() => setShowCart(!showCart)} cursor="pointer"/>
                </div>
                <ShoppingCart open={showCart}/>
            </CartContainer>
            <div className="blur" style={blur}></div>
        </>
    )
}