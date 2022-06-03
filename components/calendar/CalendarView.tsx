import { MouseEvent } from 'react';
import { getCalendarListDb } from '../../store/types';
import Styles from '../../styles/Calendar.module.css';
import Loading from "../common/Loading";

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
            (<div className={Styles.time}>{startDate.hour}:{startDate.min} ~ {endDate.hour}:{endDate.min}</div>):
            (
            <div className={Styles.time}>
                {startDate.year}년{startDate.month}월{startDate.date}일 {startDate.hour}:{startDate.min} ~ 
                {endDate.year}년{endDate.month}월{endDate.date}일 {endDate.hour}:{endDate.min}
            </div>
            )}
        </>
        
    )
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
const CalendarView = ({ calendars, onClick, User, viewYear, viewMonth, viewDate, loading }:CalendarViewProps) => {

    return (
        <div className={Styles.todo_list}>
            <div className={Styles.todo_top_title}>{viewYear}년{viewMonth}월{viewDate}일</div>
            {loading && calendars === null? (<Loading />) :  
                (<>
                    {calendars !== null && calendars.map(({_id, title, body, startDate, endDate, label, user}) => {
                        const labelStyle = {'background': label.style};
                        return <ul className={Styles.todo_list_item} key={_id} onClick={(e) => onClick(e, _id)}>
                                <li className={Styles.label}>
                                    <span>{label.text}</span>
                                    <div style={labelStyle}></div>
                                </li>
                                {User?
                                    User.username === user.username? (
                                    <>
                                        <li className={Styles.title}>
                                            <div className={Styles.title_font}>{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className={Styles.body}>{body}</li>
                                        <li className={Styles.delete}></li>
                                    </>
                                ): (
                                    <>
                                        <li className={Styles.title_none}>
                                            <div className={Styles.title_none_font}>{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className={Styles.body}>{body}</li>
                                        <li className={Styles.delete_none}></li>
                                    </>
                                ) : 
                                (<li className={Styles.delete_none}></li>)
                                }
                            </ul>  
                        })}
                    </>
                )
            }
            
        </div>
    );
};

export default CalendarView;