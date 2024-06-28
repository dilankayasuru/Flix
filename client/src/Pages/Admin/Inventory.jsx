import React, {useEffect, useState} from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import {FormControl, InputBase, InputLabel, MenuItem, Select, useMediaQuery} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InventoryItem from "./InventoryItem";
import AddItem from "./AddItem/AddItem";
import axios from "axios";
import {Grid} from "react-loader-spinner";

const InventoryContainer = styled.div`
    .inventory-items-container {
        padding: 1em;
    }
`;

const InventoryHeading = styled.div`
    position: sticky;
    top: 144px;
    padding: 1em 1em 0;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #d5d5d5;

    @media (max-width: 600px) {
        top: 127px;
        padding: 1em;

        .inventory-heading-top {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }

    h2 {
        font-weight: 300;
        font-size: 26px;
        letter-spacing: 1px;
        margin-bottom: 5px;
    }

    .inventory-heading-top {
        display: grid;
        place-items: center;
        gap: 1em;
        align-items: center;
        grid-template-columns: repeat(4, 1fr);
    }

    .inventory-items-table-heading {
        padding: 20px 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        place-items: center;

    }
`;

const Search = styled.div`
    grid-column: span 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
    padding: 7px 15px;
    gap: 10px;
    border-radius: 5px;
    width: 100%;
    max-width: 450px;

    @media (max-width: 600px) {
        margin-top: 10px;
        grid-row: 1 / 3;
    }
`;

const AddNewButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-self: flex-end;
    gap: 5px;
    padding: 7px 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    background: hsl(140, 52%, 55%);
    transition: all .2s ease-in-out;

    &:hover {
        background: hsl(140, 52%, 48%);
    }
`;


export default function Inventory() {

    const [products, setProducts] = useState([]);

    const isMobile = useMediaQuery("(max-width: 600px)");

    const [showAddItem, setShowAddItem] = useState(false);

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState('all');

    const [search, setSearch] = useState('');

    const [showProducts, setShowProducts] = useState([]);

    const openAddItem = () => {
        setShowAddItem(true)
    };

    const closeAddItem = () => {
        setShowAddItem(false)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (!search) {
            if (category === 'all') setShowProducts(products)
            else setShowProducts(products.filter(product => product.category === category));
        } else {
            setShowProducts(showProducts.filter(product => product.name.toLowerCase().includes(search)));
        }
    }, [search])

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/get-products')
            .then((res) => {
                setError('')
                setShowProducts(res.data.products);
                setProducts(res.data.products);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setError(error.response.message)
            })
    }, [showAddItem]);

    useEffect(() => {
        if (category === 'all') setShowProducts(products)
        else setShowProducts(products.filter(product => product.category === category));
    }, [category])

    return (
        <>
            {loading &&
                <Grid
                    height="90"
                    width="90"
                    color="rgb(255,0,0)"
                    wrapperStyle={{height: "100vh", width: "100%", display: "grid", placeItems: "center"}}
                />
            }
            {
                showAddItem ? <AddItem handleClose={closeAddItem}/> :
                    <InventoryContainer>

                        <InventoryHeading>
                            <h2>Inventory</h2>
                            <div className="inventory-heading-top">
                                <FormControl sx={{m: 1, minWidth: 110}}
                                             style={isMobile ? {justifySelf: "flex-start"} : {}}>
                                    <InputLabel id="select-category-label">Category</InputLabel>
                                    <Select
                                        labelId="select-category-label"
                                        id="select-category-label"
                                        autoWidth
                                        label="Category"
                                        style={{padding: 0}}
                                        sx={{
                                            color: "black",
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgb(0,0,0)',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0,0,0,0.3)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(0,0,0,0.4)',
                                            },
                                        }}
                                        onChange={(e) => setCategory(e.target.value)}
                                        value={category}
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="men">Men's</MenuItem>
                                        <MenuItem value="women">Women's</MenuItem>
                                        <MenuItem value="kids">Kid's</MenuItem>
                                    </Select>
                                </FormControl>
                                <Search>
                                    <SearchIcon></SearchIcon>
                                    <InputBase placeholder="Search..." fullWidth value={search} onInput={handleSearch}/>
                                </Search>
                                <AddNewButton onClick={openAddItem}>
                                    <AddIcon/> Add New
                                </AddNewButton>

                            </div>
                            {
                                isMobile ? <></> :
                                    <div className="inventory-items-table-heading">
                                        <p>Name</p>
                                        <p>ID</p>
                                        <p>Category</p>
                                        <p>Price</p>
                                        <p>Action</p>
                                    </div>
                            }

                        </InventoryHeading>

                        <div className="inventory-items-container">
                            {
                                showProducts.map((product, index) => {
                                    return <InventoryItem key={index} {...product}/>
                                })
                            }
                            {
                                (error || products.length <= 0) &&
                                <p style={{
                                    color: "rgb(220, 15, 15)",
                                    textAlign: "center"
                                }}>{error ? error : "No product found"}</p>
                            }
                        </div>
                    </InventoryContainer>
            }
        </>
    )
};