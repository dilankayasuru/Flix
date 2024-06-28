import React, {useContext, useEffect, useState} from 'react';
import {
    FormControl,
    InputLabel, Select, Box, TextField, MenuItem
} from '@mui/material';
import {StockContext} from "./AddVariant";

export default function SizeQtyGroup() {

    const {sizeQty, setSizeQty} = useContext(StockContext);

    const [size, setSize] = useState(sizeQty[0].size);
    const [qty, setQty] = useState(sizeQty[0].qty);

    const handleSizeChange = (e) => {
        setSize(e.target.value)
    };

    const handleQtyChange = (e) => {
        setQty(e.target.value)
    };

    useEffect(() => {
        const index = sizeQty.findIndex(stock => stock.size === size);
        setQty(sizeQty[index].qty)
    }, [size]);

    useEffect(() => {
        setSizeQty(prevState =>
            prevState.map(stock =>
                stock.size === size ? { ...stock, qty: qty } : stock
            )
        )
    }, [qty])

    return (
        <Box component='div' sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '1em'}}>
            <FormControl sx={{m: 1, minWidth: 80, maxWidth: 120}}>
                <InputLabel id="size-label">Size</InputLabel>
                <Select
                    labelId="size-label"
                    id="select-size"
                    label="Size"
                    autoWidth
                    value={size}
                    onChange={handleSizeChange}
                >
                    {
                        sizeQty.map((data, index) => {
                            return <MenuItem key={index} value={data.size}>{data.size}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 50, maxWidth: 120}}>
                <TextField
                    label="Qty"
                    id="qty"
                    placeholder="Enter Qty"
                    variant="standard"
                    type='number'
                    InputProps={{inputProps: {min: 0}}}
                    value={qty}
                    onChange={handleQtyChange}
                />
            </FormControl>
        </Box>
    );
};