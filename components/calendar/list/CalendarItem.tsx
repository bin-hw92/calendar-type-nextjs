/* Type Props */
type CalendarItemProps = {
    item: {
        date: string;
        fullDate: string;
        isMonth: boolean;
        todoList: ItemArray[];
        holiday?: boolean;
        weekCnt: number;
    };
    idx: number;
    viewDate: string;
    onClick: (fullDate:string) => void;
}
type ItemArray = {
    _id: string;
    title: string;
    label: {
        style: string;
    }
    startflag: boolean;
    endflag: boolean;
    daysize: number;
}

//현재 날짜 넣기
const nowYear = new Date().getFullYear();
const nowMonth = new Date().getMonth()+1;
const nowDay = new Date().getDate();

const CalendarItem = ({ item, idx, viewDate, onClick }:CalendarItemProps) => {
    const {date, fullDate, isMonth, todoList, holiday} = item;
    const thisDate = fullDate.split('.');

    //클래스명 정하기
    const classWeek = idx % 7 === 0? 'Sun calendar-num' : (idx+1) % 7 === 0? 'Sat calendar-num' : holiday? 'Holiday calendar-num' : 'calendar-num';
    const classMonth = !isMonth? 'non-month' : parseInt(date) === parseInt(viewDate)? 'on-calendar' : '' //선택된 날자 찾기
    const classNow =  nowYear === parseInt(thisDate[0]) && nowMonth === parseInt(thisDate[1]) && parseInt(date) === nowDay? 'now-date' : '';
    return (
        <li className={classMonth} date-full={fullDate} onClick={() => onClick(fullDate)}>
            <div className={`${classNow} ${classWeek}`}>{date}</div>
            <div className='calendar-todo-absolute'>
                {todoList.map(({_id, title, label, startflag, endflag, daysize}, idx) => {
                    const labelStyle = {background : `${label.style}`};
                    const itemStyle =  daysize === 0 ? {overflow: 'hidden'} : {};
                    const labelClass = 'calendar-todo-item-background'.concat(startflag?' start-border-item':'').concat(endflag?' end-border-item':'');
                    return (idx < 5 && <div className='calendar-todo-item' key={_id} style={itemStyle}>
                        <div className={labelClass} style={labelStyle}></div>
                            {startflag && title}
                            </div>)
                })}
            </div>
        </li>
    );
};

export default CalendarItem;