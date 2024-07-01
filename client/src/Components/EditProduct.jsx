import React, {createContext, useEffect, useState} from "react";
import Navbar from "../Sections/Navbar/Navbar";
import Footer from "../Sections/Footer/Footer";
import styled from "styled-components";
import {FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import NewVariant from "../Pages/Admin/AddItem/NewVariant";
import Button from "./Button";
import VariantEdit from "./VariantEdit";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Grid} from "react-loader-spinner";
import VariantView from "./VariantView";

const Space = styled.div`
    width: 100%;
    height: 77px;

    @media (max-width: 600px) {
        height: 60px;
    }
`;

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

export const EditProductContext = createContext();

export default function EditProduct() {

    const navigate = useNavigate();

    const location = useLocation();

    const [product, setProduct] = useState({});

    const [variants, setVariants] = useState([]);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        try {
            axios.get(`http://localhost:5000/get-edit/${location.state}`)
                .then(res => {
                    setProduct(res.data.product)
                    setVariants(res.data.variants)
                    setIsLoading(false)
                })
                .catch(err => {
                    setError(err)
                    setIsLoading(false)
                })
        } catch (error) {
            if (error.response) setError(error.response.data.message)
            else setError(error.message)
        }

    }, [open]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }

    const handleSave = (e) => {
        e.preventDefault();

        axios.defaults.headers.common["Authentication"] = 'Bearer ' + localStorage.getItem('jwtToken');

        axios.put(`http://localhost:5000/update-product/${product._id}`, {...product})
            .then(res => {
                navigate("/admin")
            })
            .catch(err => {
                if (err.response) console.log(err.response.data.message)
                else console.log(err.message)
            })
    }

    if (!isLoading) {
        return (
            <React.Fragment>
                <Navbar/>
                <Space/>
                <DetailsFormContainer>
                    <form>
                        <h2>Product Description</h2>
                        <FormControl sx={{width: "100%"}}>
                            <TextField
                                id="product-name"
                                label="Product Name"
                                name="name"
                                variant="outlined"
                                defaultValue={product.name}
                                value={product.name}
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                defaultValue={product.category}
                                value={product.category}
                                onChange={handleChange}
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
                                    onChange={handleChange}
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
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <h2>Variants</h2>
                        <EditProductContext.Provider value={{variants, setVariants, product, setProduct}}>
                            {
                                variants.map((variant, i) => (
                                    <VariantView key={i} id={variant._id}/>
                                ))
                            }
                            {open && <VariantEdit openState={{open, setOpen}} data={{productId: product._id}}/>}
                        </EditProductContext.Provider>
                        <Button style={{borderRadius: "5px"}} type="button" onClick={() => setOpen(true)}>Add new
                            variant</Button>
                        <div className="action-buttons">
                            <Button type="button" onClick={() => navigate('/admin')}>Cancel</Button>
                            <Button type="submit" onClick={handleSave}>Save</Button>
                        </div>
                        {error && <p style={{color: "rgb(220, 15, 15)", textAlign: "center"}}>{error}</p>}
                    </form>
                </DetailsFormContainer>
                <Footer/>
            </React.Fragment>
        )
    }
    else
        return (
            <React.Fragment>
                <Navbar/>
                <Space/>
                <Grid
                    height="90"
                    width="90"
                    color="rgb(255,0,0)"
                    wrapperStyle={{height: "100vh", width: "100%", display: "grid", placeItems: "center"}}
                />
                <Footer/>
            </React.Fragment>

        )
}