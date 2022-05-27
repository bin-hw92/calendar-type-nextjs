
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Styles from "../../styles/Todo.module.css";

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
    onStyleClick: (id: any) => void;
}

const LabelItem = ({labels, labelStyle, onStyleClick }:LabelItemProps) => {
    return (
        <>
        {labels.map((label) => {
            const $inlineStyle = {'background': label.color}
            const $classStyle = label.color === labelStyle? `${Styles.label_on}` : '';
            return <div className={$classStyle} key={label.id} style={$inlineStyle} onClick={() => onStyleClick(label.id)}></div>
        })}
        </>
    );
};

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
    onChange: (e: any) => void;
    onDateChange: (date: any, type: any) => void;
    onSubmit: (e: any) => void;
    onInputChange: (e: any) => void;
    calendarId: any;
    onStyleClick: (id: any) => void;
}

const WriteView = ({ write, error, onChange, onDateChange, onSubmit, onInputChange, calendarId, onStyleClick }:WriteViewProps) => {
    const { title, body, startDay, startDate, endDay, endDate, hoursArray, minArray, labels, labelStyle, labelText} = write;
    const sDate = new Date(startDay);
    const eDate = new Date(endDay);
    const titlestyle = error[0] === 'title'?  {'border': '1px solid red'} : {};
    const datestyle = error[0] === 'date'?  {'border': '1px solid red'} : {};
    const labelstyle = error[0] === 'label'?  {'border': '1px solid red'} : {};
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <ul>
                <li className={Styles.todo_title}>
                    <Form.Control type="text" id="todo-title" name="title" placeholder="제목을 입력하세요" onChange={onInputChange} value={title} style={titlestyle} />
                </li>
                <li className={Styles.todo_date}>
                    <div>
                        <DatePicker 
                            onChange={(date:any) => onDateChange(date, "START")} 
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
                    <div>
                        <DatePicker 
                            onChange={(date:any) => onDateChange(date, "END")} 
                            value={eDate.toDateString()}
                            selected={eDate}
                            dateFormat="yyyy.MM.dd"
                            customInput={
                                <Form.Control type="text" id="end-day" style={datestyle} disabled={true} />
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
                    <div className={Styles.label_wrap}>
                        <LabelItem labels={labels} labelStyle={labelStyle} onStyleClick={onStyleClick} />
                    </div>
                    <div>
                        <input type="hidden" name="label-style" value={labelStyle} />
                        <Form.Control type="text" name="label-text" placeholder="라벨명을 입력하세요" onChange={onInputChange} value={labelText} style={labelstyle} />
                    </div>
                </li>
                <li className={Styles.todo_text}>
                    <Form.Control as="textarea" name="body" rows={5} onChange={onInputChange} value={body}/>
                </li>
            </ul>
            {error[0] && <ErrorMessage>{error[1]}</ErrorMessage>}
            <div className={Styles.todo_bottom}>
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
        </form>
        </>
    )
};


export default WriteView;