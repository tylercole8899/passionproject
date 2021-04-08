import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoaderAnimation = styled.div`
    margin: 25% auto;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #a9a9a9;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: ${rotate} 2s linear infinite;
`;

const LoaderContainer = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.1);
`;

export default function Loader(){

    return(
        <LoaderContainer>
            <LoaderAnimation />
        </LoaderContainer>
    )
}