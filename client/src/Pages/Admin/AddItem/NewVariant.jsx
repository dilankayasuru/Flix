import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {Box, FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import {Delete, Mode} from "@mui/icons-material";
import {VariantContext} from "./AddItem";
import {ProductContext} from "./AddItem";
import {jwtDecode} from "jwt-decode";

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const ImageStyles = {
    borderRadius: "10px",
    boxShadow: "1px 1px 10px rgba(0,0,0,0.2)",
    width: "100px",
    height: "100px",
}

export default function NewVariant(props) {

    const decoded = jwtDecode(localStorage.getItem('jwtToken'));

    const {product, setProduct} = useContext(ProductContext);

    const {variants, setVariants} = useContext(VariantContext);

    const [size, setSize] = useState(props.stock[0].size);

    const [qty, setQty] = useState(props.stock[0].qty);


    const handleDelete = () => {
        if (!product.name) {
            setVariants(
                variants.filter(variant => variant.name !== props.name)
            )
        } else {
            setProduct({...product, variants: product.variants.filter(variant => variant.name !== props.name)})
        }
    };

    useEffect(() => {
        const index = props.stock.findIndex(data => data.size === size);
        setQty(props.stock[index].qty)
    }, [size]);

    const handleImageError = (e) => {
        e.target.src = "/image-not-found.png"
        e.onerror = null
    };

    return (
        <div style={{borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: "1em"}}>
            <p>Variant: {props.name}</p>
            <Box
                component='div'
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    paddingTop: '1em',
                    gap: '10px'
                }}>

                <img src={props.images[0]} alt="varient image 1" style={ImageStyles}
                     onError={handleImageError}/>
                <img src={props.images[1]} alt="varient image 2" style={ImageStyles}
                     onError={handleImageError}/>
                <img src={props.images[2]} alt="varient image 3" style={ImageStyles}
                     onError={handleImageError}/>
                <img src={props.images[3]} alt="varient image 4" style={ImageStyles}
                     onError={handleImageError}/>
            </Box>
            <Box
                component='div'
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingTop: '1em',
                    gap: '10px'
                }}>
                <div>
                    <FormControl sx={{m: 1, minWidth: 50, maxWidth: 120}}>
                        <InputLabel htmlFor="view-size-select">Size</InputLabel>
                        <Select
                            native
                            defaultValue={size}
                            input={<OutlinedInput label="Size" id="view-size-select"/>}
                            onChange={(e) => setSize(parseFloat(e.target.value))}
                        >
                            {
                                props.stock.map(({size, _}, index) => {
                                    return <option key={index} value={size}>{size}</option>
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{m: 1, minWidth: 50, maxWidth: 120}}>
                        <TextField
                            label="Qty"
                            id="view-qty"
                            value={qty}
                            variant="standard"
                            type='number'
                            InputProps={{readOnly: true}}
                        />
                    </FormControl>
                </div>
                <ActionButtons>
                    <Delete cursor="pointer" onClick={handleDelete}/>
                </ActionButtons>
            </Box>
        </div>
    )
}