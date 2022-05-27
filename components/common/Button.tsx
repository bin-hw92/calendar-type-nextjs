import { Link } from "react-router-dom";
import styled, {css} from "styled-components";
import palette from "../../styles/palette";

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]};
    }

    &:disabled {
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }
`;
const StyleButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`
    ${buttonStyle}
`;

const Button = (props:any) => {
    return props.to ? (
        <StyledLink {...props} cyan={props.cyan? 1 : 0} />
    ) : (
        <StyleButton {...props} />
    );
};

export default Button;