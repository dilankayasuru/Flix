import React from "react";
import styled from "styled-components";
import {Edit, Visibility} from "@mui/icons-material";
import {useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router-dom";

const InventoryItemRow = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-items: center;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1em 0;
    margin-bottom: 15px;

    @media (max-width: 600px) {
        display: block;

        .inventory-item-detail {
            padding: 0 1em 10px;
        }
    }

    .inventory-item-detail {
        display: flex;
        justify-content: space-between;
        gap: 1em;
    }

    .inventory-action-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .inventory-action-buttons div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
`;

export default function InventoryItem(props) {

    const navigate = useNavigate();

    const {name, _id, price, category} = props;

    const isMobile = useMediaQuery("(max-width: 600px)");

    return (
        <React.Fragment>
            <InventoryItemRow>
                <div className="inventory-item-detail">
                    {
                        isMobile ? <p>Product Name</p> : <></>
                    }
                    <p>{name}</p>
                </div>
                <div className="inventory-item-detail">
                    {
                        isMobile ? <p>ID</p> : <></>
                    }
                    <p>{_id}</p>
                </div>
                <div className="inventory-item-detail">
                    {
                        isMobile ? <p>Category</p> : <></>
                    }
                    <p>{category}</p>
                </div>
                <div className="inventory-item-detail">
                    {
                        isMobile ? <p>Price</p> : <></>
                    }
                    <p>${price}</p>
                </div>
                <div className="inventory-action-buttons">
                    <div onClick={() => navigate(`/product/${_id}`)} style={{cursor: "pointer"}}>
                        <Visibility/>
                        {
                            isMobile ? <span>View Stock</span> : <></>
                        }

                    </div>
                    <div onClick={() => navigate(`/edit-product`, {state: _id})} style={{cursor: "pointer"}}>
                        <Edit/>
                        {
                            isMobile ? <span>Edit</span> : <></>
                        }
                    </div>
                </div>
            </InventoryItemRow>
        </React.Fragment>
    )
}