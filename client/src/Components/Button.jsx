import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
    padding: .5em 1.2em;
    font-size: 1em;
    border-radius: 25px;
    background: ${props => props.primary ? '#000000' : "#d5d5d5"};
    color: ${props => props.primary ? '#ffffff' : "#000000"};
    border: 1px solid ${props => props.primary ? '#ffffff' : "#ffffff"};
    cursor: pointer;
    transition: all .2s ease;
    
    &:hover {
        background: ${props => props.primary ? '#ffffff' : "#bebebe"};
        border: 1px solid ${props => props.primary ? '#000000' : "#ffffff"};
        color: #000000;
    }
`;

Button.propTypes = {
    primary: PropTypes.bool,
};
export default Button