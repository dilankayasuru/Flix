import React, {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import {Delete, Mode} from "@mui/icons-material";
import styled from "styled-components";
import axios from "axios";
import VariantEdit from "./VariantEdit";

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

export default function VariantView(props) {

    const [size, setSize] = useState(0);

    const [qty, setQty] = useState(0);

    const [variant, setVariant] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        axios.defaults.headers.common["Authentication"] = 'Bearer ' + localStorage.getItem("jwtToken");

        axios.delete(`http://localhost:5000/update-product/deleted-variant/${variant._id}`)
            .then(res => {
                console.log(res.data.status)
                window.location.reload()
            })
            .catch(err => {
                if (err.response) console.log(err.response.data.message)
                else console.log(err.message)
            })
    }

    const handleImageError = (e) => {
        e.target.src = "/image-not-found.png"
        e.onerror = null
    };

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/get-edit/variant/${props.id}`)
            .then(res => {
                setVariant(res.data.variant)
                setSize(res.data.variant.stock[0].size)
                setIsLoading(false)
            })
            .catch(err => {
                if (err.response) console.log(err.response.data.message)
                else console.log(err.message)
                setIsLoading(false)
            })
    }, [open]);

    useEffect(() => {
        if (!isLoading) {
            const index = variant.stock.findIndex(data => data.size === size);
            setQty(variant.stock[index].qty)
        }
    }, [size]);

    return (
        <>
            {!isLoading &&
                <div style={{borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: "1em"}}>
                    <p>{variant.name}</p>
                    <Box
                        component='div'
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            paddingTop: '1em',
                            gap: '10px'
                        }}>
                        {
                            variant.images.map((image, index) => (
                                <img key={index} src={image} alt="varient image 1" style={ImageStyles}
                                     onError={handleImageError}/>
                            ))
                        }
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
                                <InputLabel htmlFor="view-size">Size</InputLabel>
                                <Select
                                    sx={{minWidth: 80}}
                                    native
                                    defaultValue={size}
                                    input={<OutlinedInput label="Size" id="view-size"/>}
                                    onChange={(e) => setSize(parseFloat(e.target.value))}
                                >
                                    {
                                        variant.stock.map(({size, _}, index) => {
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
                            <Mode cursor="pointer" onClick={() => setOpen(true)}/>
                            {open && <VariantEdit openState={{open, setOpen}} data={{variantId: variant._id}}/>}
                        </ActionButtons>
                    </Box>
                </div>
            }
        </>
    )
}