import React, {useEffect, useState} from "react";
import {Close, Mode} from "@mui/icons-material";
import styled from "styled-components";
import {Box, DialogContentText, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "./Button";
import axios from "axios";

const SizeQtyModel = [];

for (let i = 3; i <= 17; i += 0.5) {
    SizeQtyModel.push({size: i, qty: 0})
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    z-index: 10;
    padding: 1em;

    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
`;

const Container = styled.div`
    background: #ffffff;
    border-radius: 15px;
    padding: 1.5em;
    position: relative;
    margin-top: 70px;
`;

const Image = styled.img`
    border-radius: 10px;
    max-width: 100px;
    max-height: 100px;
    min-width: 50px;
    min-height: 50px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
`;

export default function VariantEdit(props) {

    const ImageError = (e) => {
        e.target.src = "/image-not-found.png"
        e.onerror = null
    }

    const [variant, setVariant] = useState({});

    const [images, setImages] = useState({})

    const {open, setOpen} = props.openState;

    const [size, setSize] = useState(3);

    const [qty, setQty] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.data.variantId) {
            axios.get(`https://flix-server.vercel.app/get-edit/variant/${props.data.variantId}`)
                .then(res => {
                    setVariant(res.data.variant)
                    setLoading(false)
                })
                .catch(err => {
                    if (err.response) console.log(err.response.data.message)
                    else console.log(err.message)
                    setLoading(false)
                })
        } else {
            setVariant({
                name: "",
                images: [],
                stock: SizeQtyModel,
            })
            setLoading(false)
        }
    }, [open])

    useEffect(() => {
        if (!loading) {
            const index = variant.stock.findIndex(data => data.size === size)
            setQty(variant.stock[index].qty)
        }
    }, [size])

    useEffect(() => {
        if (!loading) {
            const index = variant.stock.findIndex(data => data.size === size)
            setVariant(prevState => {
                const updateStock = prevState.stock.map((data, i) => {
                    if (index === i) return {...data, qty: qty}
                    return data
                })
                return {...prevState, stock: updateStock}
            });
        }
    }, [qty]);

    const changeImage = (e) => {
        const {name, value} = e.target;

        if (props.data.productId) {
            switch (name) {
                case "image1":
                    variant.images[0] ? variant.images[0] = value : variant.images.push(value)
                    break
                case "image2":
                    variant.images[1] ? variant.images[1] = value : variant.images.push(value)
                    break
                case "image3":
                    variant.images[2] ? variant.images[2] = value : variant.images.push(value)
                    break
                case "image4":
                    variant.images[3] ? variant.images[3] = value : variant.images.push(value)
                    break
            }
        }

        switch (name) {
            case "image1":
                setVariant(prevState => {
                    const newImages = prevState.images.map((img, idx) => {
                        if (idx === 0) return value
                        return img
                    })
                    return {...prevState, images: newImages}
                })
                break
            case "image2":
                setVariant(prevState => {
                    const newImages = prevState.images.map((img, idx) => {
                        if (idx === 1) return value
                        return img
                    })
                    return {...prevState, images: newImages}
                })
                break
            case "image3":
                setVariant(prevState => {
                    const newImages = prevState.images.map((img, idx) => {
                        if (idx === 2) return value
                        return img
                    })
                    return {...prevState, images: newImages}
                })
                break
            case "image4":
                setVariant(prevState => {
                    const newImages = prevState.images.map((img, idx) => {
                        if (idx === 3) return value
                        return img
                    })
                    return {...prevState, images: newImages}
                })
                break
        }
    };

    const handleSave = () => {

        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        if (props.data.productId) {
            return axios.post(`https://flix-server.vercel.app/update-product/new-variant/${props.data.productId}`, {...variant})
                .then(res => {
                    setOpen(false)
                })
                .catch(err => {
                    if (err.response) console.log(err.message)
                    else console.log(err.message)
                })
        }

        axios.put(`https://flix-server.vercel.app/update-product/variant/${variant._id}`, {variant})
            .then(res => {
                console.log(res.data.status)
            })
            .catch(err => {
                if (err.response) console.log(err.response.data.message)
                else console.log(err.message)
            })
    }

    return (
        <React.Fragment>
            {
                !loading &&
                <Wrapper>
                    <Container>
                        <div>
                            <Close
                                cursor="pointer"
                                style={{position: "absolute", top: "0", right: "0", margin: "15px"}}
                                onClick={() => {
                                    setOpen(false)
                                    setLoading(true)
                                }}
                            />
                        </div>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Variant Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="name"
                            onChange={(e) => {
                                setVariant({...variant, name: e.target.value})
                            }}
                            value={variant.name}

                        />
                        <DialogContentText p="1em 0 0">
                            Please Copy and Paste the Image urls here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="image1"
                            label="Image 1"
                            type="url"
                            fullWidth
                            variant="standard"
                            value={variant.images[0]}
                            onChange={changeImage}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="image2"
                            label="Image 2"
                            type="url"
                            fullWidth
                            variant="standard"
                            value={variant.images[1]}
                            onChange={changeImage}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="image3"
                            label="Image 3"
                            type="url"
                            fullWidth
                            variant="standard"
                            value={variant.images[2]}
                            onChange={changeImage}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="image4"
                            label="Image 4"
                            type="url"
                            fullWidth
                            variant="standard"
                            value={variant.images[3]}
                            onChange={changeImage}
                        />
                        <Box component='div'
                             sx={{
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 justifyContent: 'space-around',
                                 paddingTop: '1em',
                                 gap: '10px'
                             }}>
                            {
                                variant.images.map((image, index) => (
                                    <Image key={index} src={image} alt={`image index ${index}`} onError={ImageError}/>
                                ))
                            }
                        </Box>
                        <DialogContentText p={"1em 0 0"}>
                            Please Select the Size and Enter the Quantity here.
                        </DialogContentText>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <FormControl sx={{m: 1, minWidth: 80}}>
                                    <InputLabel id="edit-stock-size">Size</InputLabel>
                                    <Select
                                        labelId="edit-stock-size"
                                        id="edit-stock-size-select"
                                        label="Size"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                    >
                                        {
                                            SizeQtyModel.map(model => (
                                                <MenuItem key={model.size} value={model.size}>{model.size}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    inputProps={{min: 0}}
                                    autoFocus
                                    margin="dense"
                                    name="qty"
                                    label="Qty"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={qty}
                                    onChange={(e) => setQty(parseInt(e.target.value))}
                                />
                            </Box>
                            <Button type="button" onClick={handleSave}>Save</Button>
                        </div>
                    </Container>
                </Wrapper>
            }
        </React.Fragment>
    )
}