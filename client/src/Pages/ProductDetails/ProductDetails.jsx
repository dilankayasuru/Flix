import React, {useEffect, useState} from "react";
import './ProductDetails.css';
import Reviews from "../../Components/Reviews";
import Button from "../../Components/Button";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Footer from "../../Sections/Footer/Footer";
import Navbar from "../../Sections/Navbar/Navbar";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Grid} from "react-loader-spinner";
import {Input} from "@mui/material";
import Response from "../../Components/Response";

export default function ProductDetails() {

    const navigate = useNavigate();

    const {id} = useParams();

    const [product, setProduct] = useState({});

    const [reviews, setReviews] = useState([]);

    const [variants, setVariants] = useState([]);

    const [selectedVariant, setSelectedVariant] = useState({});

    const [selectedSizeQty, setSelectedSizeQty] = useState({size: 0, qty: 0});

    const [mainImage, setMainImage] = useState("");

    const [error, setError] = useState('');

    const [maxQty, setMaxQty] = useState(0);

    const [response, setResponse] = useState(false);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`http://localhost:5000/get-product-by-id/${id}`)
                    .then((res) => {
                        const reviews = res.data.reviews || [];
                        const variants = res.data.variants || [];
                        setProduct({...res.data.product});
                        setSelectedVariant(variants[0])
                        setMainImage(variants[0].images[0])
                        setReviews(reviews)
                        setVariants(variants)
                        setLoading(false)
                    })
                    .catch((error) => {
                        if (error.response) setError(error.response.date.message)
                        setError(error.message)
                    })
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (!loading) {
            setMainImage(selectedVariant.images[0])
            if (selectedVariant.stock.find(d => d.qty > 0)) {
                const {size, qty} = selectedVariant.stock.find(d => d.qty > 0)
                setSelectedSizeQty({...selectedSizeQty, size: size, qty: qty})
            }
            else {
                setMaxQty(0)
                setSelectedSizeQty({size: 0, qty: 0})
            }
        }
    }, [selectedVariant])

    useEffect(() => {
        !loading && selectedSizeQty.size !== 0 && setMaxQty(selectedVariant.stock.find(sizeQty => sizeQty.size === selectedSizeQty.size).qty)
    }, [selectedSizeQty]);

    const addToCart = () => {
        const token = localStorage.getItem('jwtToken');

        const item = {
            variantId: selectedVariant._id,
            productId: product._id,
            size: selectedSizeQty.size,
            qty: selectedSizeQty.qty
        };

        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            axios.put('http://localhost:5000/add-to-cart', {...item})
                .then(res => {
                    setError('')
                    setResponse(true)
                })
                .catch(error => {
                    if (error.response) setError(error.response.data.message)
                    else setError(error.message)
                    setResponse(false)
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {size, qty} = selectedSizeQty;
        const variantId = selectedVariant._id;
        const products = [{...product, size, qty, variantId}];
        if (selectedSizeQty.size === 0) {
            return
        }
        navigate('/checkout', {state: products})
    }

    return (
        <React.Fragment>
            <Navbar/>
            <Response state={{response, setResponse}} title={"Cart Updated"} message={"Your shopping cart has been successfully updated."}/>
            {loading &&
                <Grid
                    height="90"
                    width="90"
                    color="rgb(255,0,0)"
                    wrapperStyle={{height: "100vh", width: "100%", display: "grid", placeItems: "center"}}
                />}
            {!loading &&
                <section className="product-details-container">
                    {error && <p style={{color: "rgb(220, 15, 15)", textAlign: "center"}}>{error}</p>}
                    <div className="product-details-left">
                        <div className="product-image-container-outer">
                            <div className="product-image-container">
                                <img
                                    src={mainImage}
                                    alt="prodcut image"/>
                            </div>
                            <div className="product-preview-images-container">
                                {
                                    selectedVariant.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={selectedVariant.name}
                                            onMouseOver={() => setMainImage(image)}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <form
                        className="product-details-right"
                        onSubmit={handleSubmit}
                    >
                        <div className="product-details">
                            <div className="product-name-text">
                                <h1>{product.name}</h1>
                                <p className="product-name-secondary"
                                   style={{textTransform: "capitalize"}}>{product.category}</p>
                                <p className="product-price">${product.price}</p>
                            </div>
                            <div className="select-color-container">
                                <p className="sub-heading">Select Color</p>
                                {(!loading && selectedSizeQty) &&
                                    <p style={{marginBottom: "10px", opacity: "70%"}}>{selectedVariant.name}</p>}
                                <div className="select-color-image-container">
                                    {
                                        variants.map((variant, index) => (
                                            <img
                                                key={index}
                                                src={variant.images[0]}
                                                alt={variant.name}
                                                style={variant === selectedVariant ?
                                                    {border: "1px solid rgb(0,0,0)"} : {border: "none", opacity: "70%"}}
                                                onClick={(e) => {
                                                    setSelectedVariant(variant)
                                                }}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="select-size-container-outer">
                                <p className="sub-heading">Select Size</p>
                                <div className="select-size-container">
                                    {
                                        selectedVariant.stock.map(({size, qty}) => (
                                            qty > 0 &&
                                            <p
                                                key={size}
                                                style={
                                                    selectedSizeQty.size === size ?
                                                        {border: "1px solid rgb(0,0,0)"} : {border: "none"}}
                                                onClick={() => setSelectedSizeQty({...selectedSizeQty, size: size})}
                                            >{size}</p>
                                        ))
                                    }
                                </div>
                                {maxQty === 0 && <p style={{textAlign: "center", opacity: "70%"}}>Out of Stock</p>}
                                <div style={{marginTop: "15px"}}>
                                    <label className="sub-heading">Qty : </label>
                                    <Input
                                        type="number"
                                        inputProps={{min: 1, max: maxQty}}
                                        sx={{minWidth: "100px", m: "0 15px"}}
                                        onChange={(e) => setSelectedSizeQty({
                                            ...selectedSizeQty,
                                            qty: parseInt(e.target.value)
                                        })}
                                        disabled={maxQty === 0}
                                        required
                                    />
                                    <span style={maxQty === 0 ? {color: "#ff0000"} : {color: "#01a148"}}>
                                        {maxQty} in Stock
                                    </span>
                                </div>
                            </div>
                            <div className="product-details-button-container">
                                <Button type="submit" disabled={selectedSizeQty.size === 0}>Buy Now</Button>
                                <Button type="button" onClick={addToCart}>Add to Cart <ShoppingCartRoundedIcon/></Button>
                            </div>
                            <div className="product-description-text">
                                <p className="sub-heading">Description</p>
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <Reviews data={reviews}/>
                    </form>
                </section>
            }
            <Footer/>
        </React.Fragment>
    )
}