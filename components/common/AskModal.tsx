import { MouseEvent } from 'react';
import styled from 'styled-components';

const TodoWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background: rgb(204, 204, 204, 0.4);
    height: 100%;

    .todo-content {
        position: absolute;
        /* top: calc(50% - 100px); */
        top: 100px;
        left: calc(50% - 600px);
        width: 90%;
        max-width: 1200px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;

        .todo-close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: url('/image/close-icon.svg') no-repeat;
            background-size: cover;
            width: 25px;
            height: 25px;
            border: 0;
        }

        form {
            ul {
                margin: 50px auto auto;
                padding: 0 2rem;
                list-style: none;

                li {
                    padding-bottom: 2rem;
                }
                li:last-child {
                    padding-bottom: 1rem;
                }
            }
        } 
    }

    
    @media screen and (max-width: 1200px) {
        .todo-content {
            left: 5%;
        }
    }
    @media screen and (max-width: 768px) {
        .todo-content {
            left: 5%;
        }
    }
    @media screen and (max-width: 480px) {
        .todo-content {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`

type AskModalProps = {
    onClick: (e:MouseEvent<Element>) => void;
    childrenForm: any;
}

const AskModal = ({onClick, childrenForm }:AskModalProps) => {

    return (
        <TodoWrap onClick={onClick}>
            <div className="todo-content">
                <button className="todo-close-btn" data-btn="N"></button>
                {childrenForm}
            </div>
        </TodoWrap>
    );
};

export default AskModal;