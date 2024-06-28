import React, {createContext, useState} from "react";
import Navbar from "../Sections/Navbar/Navbar";
import Footer from "../Sections/Footer/Footer";
import styled from "styled-components";
import {FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import NewVariant from "../Pages/Admin/AddItem/NewVariant";
import Button from "./Button";
import VariantEdit from "./VariantEdit";
import {useNavigate} from "react-router-dom";

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

const EditProductContext = createContext();

export default function EditProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    const [variants, setVariants] = useState([]);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

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
                            // value={product.name}
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
                            // value={product.price}
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
                            // value={product.category}
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
                                // value={product.thumbnail}
                                required
                                fullWidth
                            />
                            <img
                                src={"jjg"}
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
                            // value={product.description}
                            required
                        />
                    </FormControl>

                    <h2>Variants</h2>
                    <EditProductContext.Provider value={{variants, setVariants, product, setProduct}}>
                        {
                            // product.variants.map((variant, i) => (
                            //     <NewVariant key={i} {...variant}/>
                            // ))
                        }
                        {open && <VariantEdit openState={{open, setOpen}} data={{}}/>}
                    </EditProductContext.Provider>
                    <Button style={{borderRadius: "5px"}} type="button" onClick={() => setOpen(true)}>Add new
                        variant</Button>
                    <div className="action-buttons">
                        <Button type="button" onClick={() => navigate('/admin')}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                    {error && <p style={{color: "rgb(220, 15, 15)", textAlign: "center"}}>{error}</p>}
                </form>
            </DetailsFormContainer>
            <Footer/>
        </React.Fragment>
    )
}