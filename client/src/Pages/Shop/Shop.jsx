import React, {useEffect, useState} from "react";
import "./Shop.css";
import Card from "../../Components/Card";
import SortDropdown from "../../Components/SortDropdown";
import {Link, useParams} from "react-router-dom";
import Navbar from "../../Sections/Navbar/Navbar";
import Footer from "../../Sections/Footer/Footer";
import axios from "axios";
import {Grid} from "react-loader-spinner";

// const products = [
//     {
//         image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         name: "Celestial Stride",
//         category: "Men's Shoes",
//         price: 150
//     },
//     {
//         image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         name: "Enchanted Soles",
//         category: "Kid's Shoes",
//         price: 120
//     },
//     {
//         image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         name: "RadiantGlide",
//         category: "Men's Shoes",
//         price: 130
//     },
//     {
//         image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         name: "LunaLuxe Footwear",
//         category: "Men's Shoes",
//         price: 140
//     },
//     {
//         image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         name: "OpalElegance Shoes",
//         category: "Men's Shoes",
//         price: 100
//     },
//     {
//         image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         name: "Stardust Stompers",
//         category: "Kid's Shoes",
//         price: 150
//     }
// ];

export default function Shop() {

    const {category} = useParams();

    let title, description;

    switch (category) {
        case "men":
            title = "MEN'S SHOES"
            description = "Shop Flix for all styles of men's shoes including casual sneakers, high-performance running shoes, and comfy slides."
            break
        case "women":
            title = "WOMEN’S SHOES"
            description = "Flix women’s shoes and sneakers sport iconic streetwear design while carrying you in comfort."
            break
        case "kids":
            title = "KIDS' SHOES"
            description = "Watch your little all-star cross the finish line, tear up the turf, and take on the world in Flix's kids' shoes."
            break
        default:
            title = "Flix Shop"
            description = "The sale is on, so what are you waiting for? Whether you're doing reps or lighting up the scene, you'll find Flix shoes on sale that work."
    }

    const [products, setProducts] = useState([]);

    const [order, setOrder] = useState("default");

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(true);

    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        switch (order) {
            case "default":
                setSortedProducts(products)
                break
            case "highToLow":
                setSortedProducts(products.toSorted((a, b) => b.price - a.price))
                break
            case "lowToHigh":
                setSortedProducts(products.toSorted((a, b) => a.price - b.price))
                break
        }
    }, [order]);

    useEffect(() => {
        setLoading(true)
        const reqRoute = category ? `get-product-category/${category}` : "get-products"

        axios.get(`http://localhost:5000/${reqRoute}`)
            .then((res) => {
                setError('')
                setSortedProducts(res.data.products);
                setProducts(res.data.products);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                if (error.response) setError(error.response.date.message)
                setError(error.message)
            })
    }, [category]);

    return (
        <React.Fragment>
            <Navbar/>
            {loading &&
                <Grid
                    height="90"
                    width="90"
                    color="rgb(255,0,0)"
                    wrapperStyle={{height: "100vh", width: "100%", display: "grid", placeItems: "center"}}
                />}
            {!loading &&
                <div className="shop-container">
                    <div className="shop-text">
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                    <div className="products-container-shop">
                        <div className="dropdown">
                            <SortDropdown handleChange={setOrder} value={order}/>
                        </div>
                        {
                            sortedProducts.map((product, _) => {
                                return <Card key={product._id} {...product}/>
                            })
                        }
                    </div>
                    {
                        (error || products.length <= 0) &&
                        <p style={{
                            color: "rgb(220, 15, 15)",
                            textAlign: "center",
                        }}>{error ? error : "No product found"}</p>
                    }
                </div>}
            <Footer/>
        </React.Fragment>
    )
}