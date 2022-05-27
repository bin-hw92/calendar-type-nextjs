import Button from "../common/Button";
import Styles from '../../styles/Calendar.module.css';
import React from "react";
import { useMemo } from "react";

const getCalendarName = (viewYear, viewMonth) => {
    const name = `${viewYear}년 ${viewMonth}월`;
    return name;
}

const CalendarHeader = ({user, viewYear, viewMonth, tableCalendar, onClick, onModalClick, onBackClick, onFormChange}) => {

    const name = useMemo(() => getCalendarName(viewYear, viewMonth),[viewMonth, viewYear]);

  return (
    <>
    <div className={Styles.calendar_top_header}>
      <div className={Styles.calendar_top_title}>{tableCalendar && tableCalendar.title}</div>
      <div className={Styles.calendar_top_close}>
        <button className={Styles.back_button} onClick={onBackClick}/>
      </div>
    </div>
    <div className={Styles.calendar_header}>
      <button className={Styles.left_arrow} onClick={() => onClick(-1)} />
        <div>{name}</div>
      <button className={Styles.right_arrow} onClick={() => onClick(1)} />
      <button className={Styles.today_button} onClick={() => onClick(0)}>오늘</button>
      {user &&(
      <div className={Styles.todo_add_wrap}>
        <Button onClick={onModalClick}>일정 추가</Button>
      </div>)}
    </div>
    <div className={Styles.calendar_button_header}>
      <button className={Styles.week_button} onClick={() => onFormChange(1)}>주</button>
      <button className={`${Styles.month_button} ${Styles.on_button}`} onClick={() => onFormChange(0)}>월</button>
    </div>
    </>
  );
};

export default CalendarHeader;
