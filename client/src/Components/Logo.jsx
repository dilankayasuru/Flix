import styled from "styled-components";

const LogoContainer = styled.div`
    height: 45px;
`;

const LogoImageStyles = {
    height: "100%"
}
export default function Logo() {
    return (
        <LogoContainer>
            <img src="/logo.png" alt="logo" style={LogoImageStyles}/>
        </LogoContainer>
    )
}