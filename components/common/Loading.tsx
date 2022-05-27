import styled, {keyframes} from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const LoadingWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    /* background: rgb(241, 241, 241, 0.6); */
`;
const LoadingBar = styled.div`
    position: absolute;
    width: 80px;
    height: 80px;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    border: 6px solid #bceffd;
    border-radius: 50%;
    border-top: 6px solid #3498db;
    animation: ${spin} 1s linear infinite;
    z-index:2002;
`
const LoadingText = styled.div`
    position: absolute;
    top: calc(50% - 12px);
    left: calc(50% - 27px);
    font-size: 0.85rem;
`


const Loading = () => {
    return (
        <LoadingWrap>
            <LoadingBar />
            <LoadingText>Loading...</LoadingText>
        </LoadingWrap>
    )
}

export default Loading;