import { MouseEvent } from "react";
import styled from "styled-components";
import { getCalendarListDb } from "../../store/types";
import Loading from "../common/Loading";

/* styled component */
const TodoListWrap = styled.div`
    position: relative;
    margin: 30px auto;
    padding: 0 2rem;
    min-height: 180px;

    .todo-top-title {
        margin-bottom: 20px;
        padding-bottom: 10px;
        font-size: 1.25rem;
        font-weight: bold;
        border-bottom: 1px solid #555;
    }
`
/* Ul 태그 부분 */
const TodoListItem = styled.div` 
    display: flex;
    list-style: none;
    margin: auto;
    padding: 0 0 25px 0;
    align-items: flex-start;

    li {
        margin-right: 10px;
    }

    .label {
        position: relative;
        padding-left: 5px;
        width: 10%;
        max-width: 100px;
        font-size: 0.85rem;
        line-height: 1.2;
        word-break: break-all;

        div {
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
        }
    }

    .title {
        position: relative;
        width: 45%;
        max-width: 515px;
        cursor: pointer;

        .title-font {
            font-size: 1.125rem;
            font-weight: bold;
            color: #333;
        }
        .time {
            position: absolute;
            left: 0;
            bottom: -17px;
            font-size: 0.75rem;
            color: #777;
        }
    }
    .title-none {
        position: relative;
        width: 45%;
        max-width: 515px;

        .title-none-font {
            font-size: 1.125rem;
            font-weight: bold;
            color: #333;
        }
        .time {
            position: absolute;
            left: 0;
            bottom: -17px;
            font-size: 0.75rem;
            color: #777;
        }
    }

    .body {
        width: 45%;
        max-width: 515px;
        color: #555;
    }

    .delete-none{
        position: relative;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .delete {
        position: relative;
        width: 30px;
        height: 30px;
        cursor: pointer;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            background: url('/image/delete-icon.svg');
            background-size: 100% 100%;
        }
    }
`

/* Type Props */
type TimeItemProps = {
    startDate: {
        year: string;
        month: string;
        date: string;
        hour: string;
        min: string;
    };
    endDate: {
        year: string;
        month: string;
        date: string;
        hour: string;
        min: string;
    }
}

type CalendarViewProps = {
    calendars: getCalendarListDb[] | null;
    onClick: (e: MouseEvent<Element>, id: string) => Promise<void>;
    User: {
        [key in string] : string;
    }|null;
    viewYear: string;
    viewMonth: string;
    viewDate: string;
    loading: any;
}

const TimeItem = ({startDate, endDate}:TimeItemProps) => {
    return (
        <>
        {startDate.year === endDate.year && startDate.month === endDate.month && startDate.date === endDate.date?
            (<div className="time">{startDate.hour}:{startDate.min} ~ {endDate.hour}:{endDate.min}</div>):
            (
            <div className="time">
                {startDate.year}년{startDate.month}월{startDate.date}일 {startDate.hour}:{startDate.min} ~ 
                {endDate.year}년{endDate.month}월{endDate.date}일 {endDate.hour}:{endDate.min}
            </div>
            )}
        </>
        
    )
}


const CalendarView = ({ calendars, onClick, User, viewYear, viewMonth, viewDate, loading }:CalendarViewProps) => {

    return (
        <TodoListWrap>
            <div className="todo-top-title">{viewYear}년{viewMonth}월{viewDate}일</div>
            {loading && calendars === null? (<Loading />) : 
                (<>
                    {calendars !== null && calendars.map(({_id, title, body, startDate, endDate, label, user}) => {
                        const labelStyle = {'background': label.style};
                        return <TodoListItem key={_id} onClick={(e) => onClick(e, _id)}>
                                <li className="label">
                                    <span>{label.text}</span>
                                    <div style={labelStyle}></div>
                                </li>
                                {User?
                                    User.username === user.username? (
                                    <>
                                        <li className="title">
                                            <div className="title-font">{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className="body">{body}</li>
                                        <li className="delete"></li>
                                    </>
                                ): (
                                    <>
                                        <li className="title-none">
                                            <div className="title-none-font">{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className="body">{body}</li>
                                        <li className="delete-none"></li>
                                    </>
                                ) : 
                                (<li className="delete-none"></li>)
                                }
                            </TodoListItem>  
                        })}
                    </>
                )
            }
            
        </TodoListWrap>
    );
};

export default CalendarView;