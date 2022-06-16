import { MouseEvent } from 'react';
import styled from 'styled-components';
import { getCalendarListDb } from '../../../store/types';
import Loading from '../../common/Loading';
import Responsive from '../../common/Responsive';

/* Style Compent */
const CalendarListWeekBlock = styled.div`
    position: relative;
    border: 1px solid #333;
    border-bottom: 0;

    .list-title {
        margin: auto;
        padding: 0;
        list-style: none;
        display: flex;

        li {
            padding: 13px 10px;
            height: 50px;
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid #333;
        }
        .label {
            width: calc(15% - 10px);
            min-width: 150px;
        }
        .date {
            width: calc(25% - 10px);
            min-width: 170px;
        }
        .title {
            width: calc(30% - 10px);
            min-width: 220px;
        }
        .body {
            width: calc(30% - 10px);
            min-width: 220px;
        }
        .delete {
            width: 60px;
        }
    }
    .list-item {
        margin: auto;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;

        li {
            position: relative;
            padding: 5px 1px 5px 1px;
            width: 100%;
            border-bottom: 1px solid #333;

            .todo-item {
                display: flex;
                list-style: none;
                padding: 0;
                margin: auto;

                .label {
                    position: relative;
                    width: calc(15% - 10px);
                    min-width: 150px;
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
                .date {
                    width: calc(25% - 10px);
                    min-width: 170px;
                }
                .title {
                    width: calc(30% - 10px);
                    min-width: 220px;
                    font-size: 1rem;
                    font-weight: bold;
                }
                .body {
                    width: calc(30% - 10px);
                    min-width: 220px;
                }
                li {
                    padding-left: 5px;
                    font-size: 0.9rem;
                    border-bottom: 0;
                }
                .delete {
                    position: relative;
                    width: 40px;
                    cursor: pointer;
            
                    &:before {
                        content: '';
                        position: absolute;
                        top: calc(50% - 15px);
                        left: calc(50% - 15px);
                        width: 30px;
                        height: 30px;
                        background: url('./delete-icon.svg');
                        background-size: 100% 100%;
                    }
                }
                .delete-none {
                    width: 40px;
                }
            }
            
            &:last-child{
                border-right: 0;
            }
        }
    }
`;
const CalendarListBlock = styled(Responsive)`
    margin-top: 4rem;
`;



/* Type Props */
type CalendarYearListProps = {
    loading: any;
    calendarList: getCalendarListDb[];
    error: any;
    User: {
        [key in string] : string;
    }|null;
    onClick: (e: MouseEvent<Element>, id: string, startDay: string) => Promise<void>;
}
type CalendarTodoListProps = {
    date: getCalendarListDb;
    User: {
        [key in string] : string;
    }|null;
    onClick: (e: MouseEvent<Element>, id: string, startDay: string) => Promise<void>;
}

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

const TimeItem = ({startDate, endDate}:TimeItemProps) => {
    return (
        <>
        {startDate.year === endDate.year && startDate.month === endDate.month && startDate.date === endDate.date?
            (<div className="time">{startDate.year}년{startDate.month}월{startDate.date}일 {startDate.hour}:{startDate.min} ~ {endDate.hour}:{endDate.min}</div>):
            (
            <div className="time">
                {startDate.year}년{startDate.month}월{startDate.date}일 {startDate.hour}:{startDate.min} ~ 
                {endDate.year}년{endDate.month}월{endDate.date}일 {endDate.hour}:{endDate.min}
            </div>
            )}
        </>
        
    )
}

const CalendarTodoList = ({date, User, onClick }:CalendarTodoListProps) => {
    const labelStyle = {'background': date.label.style};
    return (
        <li>
            <ul className="todo-item">
                <li className="label">
                    <span>{date.label.text}</span>
                    <div style={labelStyle}></div>
                </li>
                <li className='date'><TimeItem startDate={date.startDate} endDate={date.endDate} key={date._id} /></li>
                <li className="title">
                    <div className="title-font">{date.title}</div>
                </li>
                <li className="body">{date.body}</li>
                {User?.username === date.user.username? 
                    (<li className="delete" onClick={(e) => onClick(e, date._id, date.startDay)}></li>) 
                    : (<li className="delete-none"></li>)}
            </ul>
        </li>
    );
}

const CalendarYearList = ({loading, calendarList, error, User, onClick}: CalendarYearListProps) => {
    if(error){
        if(error.response && error.response.status === 404){
            return <CalendarListBlock>파일이 존재하지 않습니다.</CalendarListBlock>
        }
    }
    
    return (
        <CalendarListWeekBlock>
            <ul className="list-title">
                <li className='label'>라벨</li>
                <li className='date'>기간</li>
                <li className='title'>제목</li>
                <li className='body'>내용</li>
                <li className='delete'></li>
            </ul>
            <ul className="list-item">
                {calendarList.map((date, idx) => (
                    <CalendarTodoList date={date} User={User} onClick={onClick} key={date._id}/>
                ))}
            </ul>
            {loading && <Loading />}
        </CalendarListWeekBlock>
    )
}

export default CalendarYearList;