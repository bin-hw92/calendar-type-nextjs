
import { ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

/* styled component */
const WriteForm = styled.form`
    .todo-title > input{
        width: 100%;
    }
    .todo-date {
        display: flex;

        .date-list {
            display: flex;
            margin-right: 100px;
            width: calc(50% - 50px);

            div {
                input {
                    display: block;
                    width: 100%;
                    padding: 0.375rem 0.75rem;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #212529;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid #ced4da;
                    appearance: none;
                    border-radius: 0.25rem;
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
            }

            select{
                margin-left: 1rem;
                max-width: 100px;
            }
        }

        .date-list:last-child {
            margin-right: 0;
        }
    }
    .todo-bottom {
        margin-bottom: 30px;
        width: 100%;
        text-align: center;

        button {
            margin-right: 1rem;
        }
        button:last-child {
            margin-right: auto;
        }
    }
        
    @media screen and (max-width: 1200px) {
        .todo-date {
            div {
                margin-right: 20px;
                width: calc(50% - 10px);
                select {
                    width: 41%;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .todo-date {
            flex-wrap: wrap;

            div {
                margin-right: 0px;
                margin-bottom: 10px;
                width: 100%;
            }
        }
    }
`
const LabelWrap = styled.div`
    display: flex;
    margin-bottom: 10px;
    
    div {
        margin-right: 10px;
        width: 10%;
        height: 30px;
        border: 1px solid #ced4da;
        cursor: pointer;
    }
    .red {
        background: #f77878;
    }
    .blue {
        background: #9b9bfb;
    }
    .green {
        background: #86f586;
    }
    .orange {
        background: #ffc107;
    }
    .gray {
        background: #dbdbdb;
    }
    .label-on {
        border: 2px solid #000000;
    }
`
/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

type LabelItemProps = {
    labels: {
        id: number;
        name: string;
        color: string;
    }[];
    labelStyle: string;
    onStyleClick: (id: number) => void;
}

type WriteViewProps = {
    write: {
        title: string;
        body: string;
        startDay: string;
        startDate: {
            year: string;
            month: string;
            date: string;
            hour: string;
            min: string;
        },
        endDay: string;
        endDate: {
            year: string;
            month: string;
            date: string;
            hour: string;
            min: string;
        },
        hoursArray: number[],
        minArray: number[],
        labels: {
            id: number;
            name: string;
            color: string;
        }[];
        labelStyle: string;
        labelText: string;
    }
    error: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onDateChange: (date: Date, type: string) => void;
    onSubmit: (e: FormEvent) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    calendarId: string|null;
    onStyleClick: (id: number) => void;
}

const LabelItem = ({labels, labelStyle, onStyleClick }:LabelItemProps) => {
    return (
        <>
        {labels.map((label) => {
            const $classStyle = label.color === labelStyle? `label-on ${label.name}` : label.name;
            return <div className={$classStyle} key={label.id} onClick={() => onStyleClick(label.id)}></div>
        })}
        </>
    );
};

const WriteView = ({ write, error, onChange, onDateChange, onSubmit, onInputChange, calendarId, onStyleClick }:WriteViewProps) => {
    const { title, body, startDay, startDate, endDay, endDate, hoursArray, minArray, labels, labelStyle, labelText} = write;
    const sDate = new Date(startDay);
    const eDate = new Date(endDay);
    const titlestyle = error[0] === 'title'?  {'border': '1px solid red'} : {};
    const datestyle = error[0] === 'date'?  {'border': '1px solid red'} : {};
    const labelstyle = error[0] === 'label'?  {'border': '1px solid red'} : {};
    
    return (
        <>
        <WriteForm onSubmit={onSubmit}>
        <ul>
                <li className="todo-title">
                    <Form.Control type="text" id="todo-title" name="title" placeholder="제목을 입력하세요" onChange={onInputChange} value={title} style={titlestyle} />
                </li>
                <li className="todo-date">
                    <div className="date-list">
                        <DatePicker
                            onChange={(date:Date) => onDateChange(date, "START")} 
                            value={sDate.toDateString()}
                            selected={sDate}
                            dateFormat="yyyy.MM.dd"
                            customInput={
                                <Form.Control type="text" id="start-day" style={datestyle} disabled={true} />
                            }
                        />
                        <Form.Select id="start-hours" value={startDate.hour} onChange={onChange} name="hour">
                            {hoursArray.map(hour => <option value={hour} key={hour}>{hour}시</option>)}
                        </Form.Select>
                        <Form.Select id="start-min" value={startDate.min} onChange={onChange} name="min">
                            {minArray.map(min => <option value={min} key={min}>{min}분</option>)}
                        </Form.Select>
                    </div>
                    <div className="date-list">
                        <DatePicker
                            onChange={(date:Date) => onDateChange(date, "END")} 
                            value={eDate.toDateString()}
                            selected={eDate}
                            dateFormat="yyyy.MM.dd"
                            customInput={
                                <Form.Control type="text" id="end-day" style={datestyle} disabled={true}/>
                            }
                        />
                        <Form.Select id="end-hours" value={endDate.hour} onChange={onChange} name="hour">
                            {hoursArray.map(hour => <option value={hour} key={hour}>{hour}시</option>)}
                        </Form.Select>
                        <Form.Select id="end-min" value={endDate.min} onChange={onChange} name="min">
                            {minArray.map(min => <option value={min} key={min}>{min}분</option>)}
                        </Form.Select>
                    </div>
                </li>
                <li>
                    <LabelWrap>
                        <LabelItem labels={labels} labelStyle={labelStyle} onStyleClick={onStyleClick} />
                    </LabelWrap>
                    <div>
                        <input type="hidden" name="label-style" value={labelStyle} />
                        <Form.Control type="text" name="label-text" placeholder="라벨명을 입력하세요" onChange={onInputChange} value={labelText} style={labelstyle} />
                    </div>
                </li>
                <li className="todo-text">
                    <Form.Control as="textarea" name="body" rows={5} onChange={onInputChange} value={body}/>
                </li>
            </ul>
            {error[0] && <ErrorMessage>{error[1]}</ErrorMessage>}
            <div className="todo-bottom">
                {!calendarId? (
                    <>
                        <Button variant="secondary" data-btn="N">취소</Button>
                        <Button variant="primary" data-btn="Y" onClick={onSubmit}>저장</Button>
                    </>
                ):(
                    <>
                        <Button variant="secondary" data-btn="B">취소</Button>
                        <Button variant="primary" data-btn="Y" onClick={onSubmit}>수정</Button>
                    </>
                )}
            </div>
        </WriteForm>
        </>
    )
};


export default WriteView;