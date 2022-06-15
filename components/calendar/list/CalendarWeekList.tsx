import styled from 'styled-components';
import Loading from '../../common/Loading';
import Responsive from '../../common/Responsive';
import CalendarItem from './CalendarItem';

/* Style Compent */
const CalendarListWeekBlock = styled.div`
    position: relative;
    min-height: 390px;
    border: 1px solid #333;
    border-bottom: 0;

    .list-title {
        margin: auto;
        padding: 0;
        list-style: none;
        display: flex;

        li {
            padding: 13px 10px;
            width: calc(100% / 7);
            height: 50px;
            font-weight: bold;
            border-bottom: 1px solid #333;
        }
    }
    .list-item {
        margin: auto;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;

        li {
            position: relative;
            padding: 35px 1px 5px 1px;
            width: calc(100% / 7);
            min-height: 340px;
            border-bottom: 1px solid #333;
            cursor: pointer;
            
            &:last-child{
                border-right: 0;
            }
        }
    }
    
    .calendar-num {
        position: absolute;
        top: 5px;
        left: 10px;
    }
    .Sat {
        color: royalblue;
    }
    .Sun,
    .Holiday {
        color: salmon;
    }
    .now-date {
        color: #fff;

        &:before {
            content: '';
            position: absolute;
            left: -4px;
            width: 26px;
            height: 26px;
            background-color: turquoise;
            border-radius: 50%;
            color: #fff;
            z-index: -1;
        }
    }
    .non-month{
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 1px;
            width: 100%;
            height: 100%;
            background-color: rgb(241, 241, 241, 0.6);
            z-index: -1;
        }
    }
    .on-calendar{
        &:before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            width: calc(100% + 3px);
            height: calc(100% + 2px);
            border-top: 2px solid turquoise;
            border-left: 2px solid turquoise;
            border-right: 2px solid turquoise;
            border-bottom: 2px solid turquoise;
            z-index: 2;
        }
    }
    .calendar-todo-absolute {
        position: absolute;
        width: 100%;
    }
    .calendar-todo-item {
        position: relative;
        width: 100%;
        height: 22px;
        font-size: 0.75rem;
        margin-top: 3px;
        padding: 2px 5px;
        color: #343a40;
        word-break: keep-all;
        white-space: nowrap;
    }
    .calendar-todo-item-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .start-border-item {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .end-border-item {
        margin-right: 1px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;
const CalendarListBlock = styled(Responsive)`
    margin-top: 4rem;
`;



/* Type Props */
type CalendarMonthListProps = {
    loading: any;
    dates: Array<any>;
    viewDate: string;
    error: any;
    onClick: (fullDate: string) => void;
}

const CalendarWeekList = ({loading, dates, viewDate, error, onClick}: CalendarMonthListProps) => {
    if(error){
        if(error.response && error.response.status === 404){
            return <CalendarListBlock>파일이 존재하지 않습니다.</CalendarListBlock>
        }
    }
    
    return (
        <CalendarListWeekBlock>
            <ul className="list-title">
                <li className="Sun">일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li className="Sat">토</li>
            </ul>
            <ul className="list-item">
                {dates.map((date, idx) => (
                    <CalendarItem key={date.fullDate} item={date} idx={idx} viewDate={viewDate} onClick={onClick}/>
                ))}
            </ul>
            {loading && <Loading />}
        </CalendarListWeekBlock>
    )
}

export default CalendarWeekList;