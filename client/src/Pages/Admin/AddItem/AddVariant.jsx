import React, {createContext, useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import SizeQtyGroup from "./SizeQtyGroup";
import {VariantContext} from "./AddItem";

const AddNewVariant = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.6);
    padding: 1em;
    border-radius: 15px;
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        border: 2px solid #1976d2;
        color: #1976d2;
    }
`;

const thumbnailStyle = {
    borderRadius: "10px",
    maxWidth: "100px",
    maxHeight: "100px",
    minWidth: "50px",
    minHeight: "50px",
    width: "100%",
    height: "100%",
    objectFit: 'cover',
    boxShadow: "1px 1px 10px rgba(0,0,0,0.2)",
};

const sizeQtyModel = [];

for (let i = 3; i <= 17; i += 0.5) {
    const {size, qty} = {size: i, qty: 0};
    sizeQtyModel.push({size, qty})
}

export const StockContext = createContext();

export default function AddVariant() {

    const [sizeQty, setSizeQty] = useState(sizeQtyModel);

    const [open, setOpen] = React.useState(false);

    const {variants, setVariants} = useContext(VariantContext);

    const [error, setError] = useState('');

    const [variant, setVariant] = useState({
        name: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        stock: sizeQty
    });

    const handleChange = (e) => {
        setError('')
        const {name, value} = e.target;
        setVariant({...variant, [name]: value})
    };

    const handleImageError = (e) => {
        e.target.src = "/image-not-found.png"
        e.onerror = null
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSizeQty(sizeQtyModel);
        setOpen(false);
        setVariant({
            name: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            stock: sizeQty
        });
        setError('')
    };

    const handleAddVariant = () => {

        if (variants.find(v => v.name === variant.name)) return setError('Duplicate variant names are not allowed')

        if (variant.name) {
            setVariants(
                [
                    ...variants,
                    {
                        name: variant.name,
                        images: [variant.image1, variant.image2, variant.image3, variant.image4],
                        stock: sizeQty
                    }
                ]
            )
            return handleClose();
        }

        setError("Invalid variant name")
    };

    return (
        <React.Fragment>
            <AddNewVariant onClick={handleClickOpen}>
                <AddIcon fontSize='large'/>
                <span>Add Variant</span>
            </AddNewVariant>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'div',
                }}
            >
                <DialogTitle>Add New Variant</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Variant Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="name"
                        error={!!error}
                        helperText={!!error ? error: ""}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        value={variant.image1}
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
                        onChange={handleChange}
                        value={variant.image2}
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
                        onChange={handleChange}
                        value={variant.image3}
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
                        onChange={handleChange}
                        value={variant.image4}
                    />
                    <Box component='div'
                         sx={{
                             display: 'flex',
                             flexWrap: 'wrap',
                             justifyContent: 'space-around',
                             paddingTop: '1em',
                             gap: '10px'
                         }}>
                        <img src={variant.image1} alt="image 1" style={thumbnailStyle} onError={handleImageError}/>
                        <img src={variant.image2} alt="image 2" style={thumbnailStyle} onError={handleImageError}/>
                        <img src={variant.image3} alt="image 3" style={thumbnailStyle} onError={handleImageError}/>
                        <img src={variant.image4} alt="image 4" style={thumbnailStyle} onError={handleImageError}/>
                    </Box>

                    <DialogContentText p={"1em 0 0"}>
                        Please Select the Size and Enter the Quantity here.
                    </DialogContentText>

                    <StockContext.Provider value={{sizeQty, setSizeQty}}>
                        <SizeQtyGroup/>
                    </StockContext.Provider>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={handleAddVariant}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}