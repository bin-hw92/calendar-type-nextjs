
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import Styles from "../../styles/Table.module.css";

/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margi-top: 1rem;
`;

type WriteTableProps = {
    table: {
        title: any;
        body: any;
        password: any;
        users: any[];
    };
    error: (string|number)[];
    onChange: (e: any) => void;
    onCancel: () => void;
    onSubmit: (e: any) => void
}

const WriteTable = ({ table, error, onSubmit, onCancel, onChange }:WriteTableProps) => {
    const titleError = error[0] === 1 ?  {'border': '1px solid red'} : {};
    const passwordError = error[0] === 2 ?  {'border': '1px solid red'} : {};
    const bodyError = error[0] === 3 ?  {'border': '1px solid red'} : {};

    return (
        <>
        <form className={Styles.table_write} onSubmit={onSubmit}>
            <ul>
                <li className={Styles.table_title}>
                    <Form.Control type="text" id="title" style={titleError} name="title" placeholder="제목을 입력하세요" onChange={onChange} value={table.title} />
                </li>
                <li className={Styles.table_title}>
                    <Form.Control type="password" id="password" style={passwordError} name="password" placeholder="비밀번호를 입력하세요" onChange={onChange} value={table.password} />
                </li>
                <li className={Styles.table_text}>
                    <Form.Control as="textarea" name="body" rows={5} onChange={onChange} value={table.body} style={bodyError} />
                </li>
            </ul>
            {error[0] > 0 && <ErrorMessage>{error[1]}</ErrorMessage>}
            <div className={Styles.table_bottom}>
                <Button variant="secondary" data-btn="N" onClick={onCancel}>취소</Button>
                <Button variant="primary" data-btn="Y" onClick={onSubmit}>저장</Button>
            </div>
        </form>
        </>
    )
};


export default WriteTable;