import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import Loading from "../common/Loading";
import { getTableListDB } from "../../store/types";
import { KeyboardEvent } from "react";

/* styled component */
const TableHeader = styled.div`
  text-align: right;
  margin: 30px auto;
`;
const TableListWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ul {
    margin: auto;
    padding: 0;
    width: 100%;
    list-style: none;
    
    .table-list-item { /* li 부분 */
      margin-bottom: 35px;
      border-bottom: 1px solid #333;
      
      .item-top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item-top-title {
          display: flex;
          width: calc(100% - 150px);
          font-size: 1.25rem;
          font-weight: bold;
          align-items: center;
          
          .item-delete-button {
            margin-left: 10px;
            width: 20px;
            height: 20px;
            background: url('/image/delete-icon.svg');
            background-size: 100% 100%;
            cursor: pointer;
          }
        }

        .item-top-password {
          display: flex;
          align-items: center;
          justify-content: space-between;

          input {
            width: calc(100% - 70px);
          }
        }
      }

      .item-body {
        padding: 20px 0 30px 0;
        white-space: pre-wrap;
      }

      
      .item-top-error {
        padding: 10px 0;
        color: red;
        text-align: right;
        font-size: 0.9rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .table-list-item {
        margin-bottom: 25px;
    }
    .item-top-password > input {
        width: calc(100% - 50px);
    }
  }
`

/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

type TableListProps = {
  tableList: getTableListDB[]|null;
  user: {
    [key in string] : string;
  }|null;
  loading: any;
  tableError: any;
  error: string[];
  onClick: (id:string) => void;
  onKeyUp: (e:KeyboardEvent<HTMLInputElement>) => void;
  onDelClick: (id:string) => void;
}

const TableList = ({tableList, user, loading, tableError, error, onClick, onKeyUp, onDelClick}:TableListProps) => {
    if(tableError){
      return <ErrorMessage>에러가 발생했습니다.</ErrorMessage>;
    }
    
    return (
      <>
        <TableHeader>
            <Link href="/page/TableWrite">
              <Button variant="primary">추가</Button>
            </Link>
        </TableHeader>
        {!loading && tableList && (
          <TableListWrap>
          <ul>
            {tableList.map(table => {
              const passwordError = error[0] === table._id ?  {'border': '1px solid red'} : {};
              return(
                <li key={table._id} className="table-list-item">
                    <div className="item-top">
                      <div className="item-top-title">
                          <div>{table.title}</div>
                          {table.user.username === user?.username && <div className="item-delete-button" onClick={() => onDelClick(table._id)}></div>}
                      </div>
                      <div className="item-top-password">
                        <Form.Control type="password" id={'password_'+table._id} data-id={table._id} name="password" placeholder="비밀번호" style={passwordError} onKeyUp={onKeyUp}/>
                        <Button variant="outline-primary" onClick={() => onClick(table._id)}>입장</Button>
                      </div>
                    </div>
                    {error[0] === table._id && <div className="item-top-error">{error[1]}</div>}
                    <div className="item-body">
                      {table.body}
                    </div>
                </li>
            )})}
          </ul>
        </TableListWrap>
        )}
        {loading && <Loading />}
      </>
    )
}

export default TableList;