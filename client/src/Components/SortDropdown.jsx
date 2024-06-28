import {useState} from "react";
import styled from "styled-components";

const Select = styled.select`
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 0.675em 6em 0.675em 1em;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 0.25rem;
    color: #000;
    cursor: pointer;
`;

export default function SortDropdown(props) {

    return (
        <Select onChange={(e) => props.handleChange(e.target.value)} value={props.value}>
            <option value="default">Sort By Default</option>
            <option value="highToLow">Price High to Low</option>
            <option value="lowToHigh">Price Low to High</option>
        </Select>
    )
}