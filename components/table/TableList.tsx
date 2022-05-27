import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import Loading from "../common/Loading";
import Styles from "../../styles/Table.module.css";
import { getTableListDB } from "../../store/types";

/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

type TableListProps = {
  tableList: getTableListDB[]|null;
  user: any;
  loading: any;
  tableError: any;
  error: string[];
  onClick: (id:any) => void;
  onKeyUp: (e:any) => void;
  onDelClick: (id:any) => void;
}

const TableList = ({tableList, user, loading, tableError, error, onClick, onKeyUp, onDelClick}:TableListProps) => {
    if(tableError){
      return <ErrorMessage>에러가 발생했습니다.</ErrorMessage>;
    }
    
    return (
      <>
        <div className={Styles.table_header}>
            <Link href="/page/TableWrite">
              <Button variant="primary">추가</Button>
            </Link>
        </div>
        {!loading && tableList && (
          <div className={Styles.table_list}>
          <ul>
            {tableList.map(table => {
              const passwordError = error[0] === table._id ?  {'border': '1px solid red'} : {};
              return(
                <li key={table._id} className={Styles.table_list_item}>
                    <div className={Styles.item_top}>
                      <div className={Styles.item_top_title}>
                          <div>{table.title}</div>
                          {table.user.username === user.username && <div className={Styles.item_delete_button} onClick={() => onDelClick(table._id)}></div>}
                      </div>
                      <div className={Styles.item_top_password}>
                        <Form.Control type="password" id={'password_'+table._id} data-id={table._id} name="password" placeholder="비밀번호" style={passwordError} onKeyUp={onKeyUp}/>
                        <Button variant="outline-primary" onClick={() => onClick(table._id)}>입장</Button>
                      </div>
                    </div>
                    {error[0] === table._id && <div className={Styles.item_top_error}>{error[1]}</div>}
                    <div className={Styles.item_body}>
                      {table.body}
                    </div>
                </li>
            )})}
          </ul>
        </div>
        )}
        {loading && <Loading />}
      </>
    )
}

export default TableList;