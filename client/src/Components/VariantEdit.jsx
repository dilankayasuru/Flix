import React, {useEffect, useState} from "react";
import {Close, Mode} from "@mui/icons-material";
import styled from "styled-components";
import {Box, DialogContentText, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "./Button";

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

    return (
        <React.Fragment>
            <Wrapper>
                <Container>
                    <div>
                        <Close
                            cursor="pointer"
                            style={{position: "absolute", top: "0", right: "0", margin: "15px"}}
                            onClick={() => setOpen(false)}
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
                        value={images.image1}
                        onChange={(e) => {
                            setImages({...images, image1: e.target.value})
                        }}
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
                        value={images.image2}
                        onChange={(e) => {
                            setImages({...images, image2: e.target.value})
                        }}
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
                        value={images.image3}
                        onChange={(e) => {
                            setImages({...images, image3: e.target.value})
                        }}
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
                        value={images.image4}
                        onChange={(e) => {
                            setImages({...images, image4: e.target.value})
                        }}
                    />
                    <Box component='div'
                         sx={{
                             display: 'flex',
                             flexWrap: 'wrap',
                             justifyContent: 'space-around',
                             paddingTop: '1em',
                             gap: '10px'
                         }}>
                        <Image src={'sa'} alt="image 1" onError={ImageError}/>
                        <Image src='ass' alt="image 2" onError={ImageError}/>
                        <Image src={'as'} alt="image 3" onError={ImageError}/>
                        <Image src={'s'} alt="image 4" onError={ImageError}/>
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
                                    // value={size}
                                    // onChange={(e) => setSize(e.target.value)}
                                >
                                    {/*{*/}
                                    {/*    SizeQtyModel.map(model => (*/}
                                    {/*        <MenuItem key={model.size} value={model.size}>{model.size}</MenuItem>*/}
                                    {/*    ))*/}
                                    {/*}*/}
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
                                // value={qty}
                                // onChange={(e) => setQty(e.target.value)}
                            />
                        </Box>
                        <Button>Save</Button>
                    </div>
                </Container>
            </Wrapper>
        </React.Fragment>
    )
}