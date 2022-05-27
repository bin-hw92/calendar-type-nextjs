import styled from 'styled-components';
import Styles from '../../../styles/Calendar.module.css';
import Loading from '../../common/Loading';
import Responsive from '../../common/Responsive';

//현재 날짜 넣기
const nowYear = new Date().getFullYear();
const nowMonth = new Date().getMonth()+1;
const nowDay = new Date().getDate();

const CalendarListBlock = styled(Responsive)`
    margin-top: 4rem;
`;


const CalendarItem = ({ item, idx, viewDate, onClick }) => {
    const {date, fullDate, isMonth, todoList, holiday} = item;
    const thisDate = fullDate.split('.');

    //클래스명 정하기
    const classWeek = idx % 7 === 0? `${Styles.Sun} ${Styles.calendar_num}` : (idx+1) % 7 === 0?  `${Styles.Sat} ${Styles.calendar_num}` : holiday?  `${Styles.Holiday} ${Styles.calendar_num}` : `${Styles.calendar_num}`;
    const classMonth = !isMonth? `${Styles.non_month}` : parseInt(date) === parseInt(viewDate)? `${Styles.on_calendar}` : '' //선택된 날자 찾기
    const classNow =  nowYear === parseInt(thisDate[0]) && nowMonth === parseInt(thisDate[1]) && parseInt(date) === nowDay? `${Styles.now_date}` : '';

    return (
        <li className={classMonth} date-full={fullDate} onClick={() => onClick(fullDate)}>
            <div className={`${classNow} ${classWeek}`}>{date}</div>
            <div className={Styles.calendar_todo_absolute}>
                {todoList.map(({_id, title, label, startflag, endflag, daysize}, idx) => {
                    const labelStyle = {background : `${label.style}`};
                    const itemStyle =  daysize === 0 ? {overflow: 'hidden'} : {};
                    const labelClass = Styles.calendar_todo_item_background.concat(startflag?` ${Styles.start_border_item}`:'').concat(endflag?` ${Styles.end_border_item}`:'');
                    return (idx < 5 && <div className={Styles.calendar_todo_item} key={_id} style={itemStyle}>
                        <div className={labelClass} style={labelStyle}></div>
                            {startflag && title}
                            </div>)
                })}
            </div>
        </li>
    );
};

const CalendarMonthList = ({loading, dates, viewDate, error, onClick}) => {
    if(error){
        if(error.response && error.response.status === 404){
            return <CalendarListBlock>파일이 존재하지 않습니다.</CalendarListBlock>
        }
    }
    
    return (
        <div className={Styles.calendar_list}>
            <ul className={Styles.list_title}>
                <li className={Styles.Sun}>일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li className={Styles.Sat}>토</li>
            </ul>
            <ul className={Styles.list_item}>
                {dates.map((date, idx) => (
                    <CalendarItem key={date.fullDate} item={date} idx={idx} viewDate={viewDate} onClick={onClick} />
                ))}
            </ul>
            {loading && <Loading />}
        </div>
    )
}

export default CalendarMonthList;