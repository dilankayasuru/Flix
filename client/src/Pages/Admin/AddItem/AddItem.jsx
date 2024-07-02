import React, {createContext, useEffect, useState} from "react";
import {FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import Button from "../../../Components/Button";
import styled from "styled-components";
import AddVariant from "./AddVariant";
import NewVariant from "./NewVariant";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const DetailsFormContainer = styled.div`

    h2 {
        text-align: center;
        //padding: 0.5em 0;
        font-size: 1.5em;
        font-weight: 300;
        position: relative;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-style: italic;
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 700px;
        gap: 20px;
        margin: 0 auto;
        padding: 1.5em 1em;
    }

    form .action-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 20px;
    }

    form .action-buttons button {
        border-radius: 5px;
        min-width: 90px;
    }
`;

export const VariantContext = createContext();
export const ProductContext = createContext();

export default function AddItem(props) {

    const id = useLocation().state;

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        thumbnail: "",
        variants: []
    });

    const [variants, setVariants] = useState([]);

    const [error, setError] = useState('');

    const handleProductChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.post('https://flix-server.vercel.app/post-product', product)
            .then((res) => {
                setError('');
                props.handleClose();
            })
            .catch((error) => {
                setError(error.response.data.message);
            })
    }

    const navigateBack = (e) => {
        e.preventDefault();
        if (id) {
            return navigate('/admin')
        }
        props.handleClose();
    }

    useEffect(() => {
        setProduct(prevState => ({
            ...prevState,
            variants: variants
        }))
    }, [variants])

    useEffect(() => {
        if (id) {
            axios.get(`https://flix-server.vercel.app/get-edit/${id}`)
                .then(res => {
                    const {category, description, name, price, thumbnail, _id} = res.data.product;
                    const resVariants = [];
                    res.data.variants.map(variant => (
                        resVariants.push({...variant})
                    ));
                    setProduct({category, description, name, thumbnail, price, variants: resVariants, _id});
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, []);

    return (
        <DetailsFormContainer>
            <form>
                <h2>Product Description</h2>
                <FormControl sx={{width: "100%"}}>
                    <TextField
                        id="product-name"
                        label="Product Name"
                        name="name"
                        variant="outlined"
                        value={product.name}
                        onChange={handleProductChange}
                        required
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="product-price">Price</InputLabel>
                    <OutlinedInput
                        id="product-price"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleProductChange}
                        inputProps={{min: 0.1}}
                        required
                    />
                </FormControl>

                <FormControl sx={{minWidth: 120}}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={handleProductChange}
                        required
                    >
                        <MenuItem value="men">Men</MenuItem>
                        <MenuItem value="women">Women</MenuItem>
                        <MenuItem value="kids">Kids</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{width: "100%"}}>
                    <div style={{display: "flex"}}>
                        <TextField
                            id="Main Image"
                            label="Main Image"
                            name="thumbnail"
                            variant="outlined"
                            value={product.thumbnail}
                            onChange={handleProductChange}
                            required
                            fullWidth
                        />
                        <img
                            src={product.thumbnail}
                            alt="Product main image"
                            style={{
                                maxWidth: "56px",
                                maxHeight: "56px",
                                marginLeft: "5px",
                                borderRadius: "5px"
                            }}
                            onError={(e) => {
                                e.target.src = "/image-not-found.png"
                                e.onerror = null
                            }}
                        />
                    </div>

                </FormControl>

                <FormControl>
                    <TextField
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        minRows={4}
                        value={product.description}
                        onChange={handleProductChange}
                        required
                    />
                </FormControl>

                <h2>Variants</h2>
                <VariantContext.Provider value={{variants, setVariants}}>
                    {
                        product.variants.map((variant, i) => (
                            <ProductContext.Provider value={{product, setProduct}} key={i}>
                                <NewVariant key={i} {...variant}/>
                            </ProductContext.Provider>
                        ))
                    }
                    <AddVariant/>
                </VariantContext.Provider>

                <div className="action-buttons">
                    <Button type="button" onClick={navigateBack}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Save</Button>
                </div>
                {error && <p style={{color: "rgb(220, 15, 15)", textAlign: "center"}}>{error}</p>}
            </form>
        </DetailsFormContainer>
    )
};