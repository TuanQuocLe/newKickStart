import styled from "styled-components";
export const Spinner = styled.div`
    border:  3px solid pink;
    border-top: 3px solid red;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: spin 0.8s linear infinite;
    margin: auto;

    @keyframes spin {
        0% {
            transform: rotate(0deg)
        } 
        100% {
            transform: rotate(360deg)
        }
    }
`