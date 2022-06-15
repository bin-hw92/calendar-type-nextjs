import Button from "../common/Button";
import styled from "styled-components";

/* Styled Component */
const CalendarTopHeader = styled.div`
  position: relative;
  padding: 1.5rem 0;
  border-bottom: 2px solid #333;

  .calendar-top-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .calendar-top-close {
      position: absolute;
      top: 1.5rem;
      right: 0;
  }
  .back-button {
    width: 35px;
    height: 35px;
    background: url('/image/back-icon.svg') no-repeat center;
    background-size: 80% 80%;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 3px;
  }
`;

const CalendarHeaderWrap = styled.div`
  display: flex;
  position: relative;
  margin: 1.5rem auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  
  div {
    margin: auto 1rem;
    font-size: 1.25rem;
  }
  .left-arrow {
    width: 30px;
    height: 30px;
    background: url('/image/arrow-icon.svg') no-repeat center;
    background-size: 100% 100%;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 3px;
  }
  .right-arrow {
      width: 30px;
      height: 30px;
      background: url('/image/arrow-icon.svg') no-repeat center;
      background-size: 100% 100%;
      background-color: #fff;
      border: 1px solid #333;
      border-radius: 3px;
      transform: rotate(0.5turn);
  }
  .today-button {
    margin-left: 5px;
    color: #333;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 5px;
  }
  .todo-add-wrap {
    position: absolute;
    right: -1rem;
  }
  .todo-add-button {
      padding: 3px 5px;
      background-color: #fff;
      border: 1px solid #333;
      border-radius: 3px;
  }
`;

const CalendarButtonHader = styled.div`
  width: 100%;
  text-align: right;

  button {
    margin-left: 5px;
    color: #333;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 5px;
  }
  .on-button {
    background-color: #ffc107;
  }
`;

/* Type Props */
type CalendarHeaderProps = {
  user: {
    [key in string] : string;
  }|null;
  headerName: string;
  tableCalendar: any;
  viewForm:number;
  onClick: (idx:number) => void;
  onModalClick: () => void;
  onBackClick: () => void;
  onFormChange: (value:number) => void;
}

const CalendarHeader = ({user, headerName, tableCalendar, viewForm, onClick, onModalClick, onBackClick, onFormChange}:CalendarHeaderProps) => {
  const monthClass = viewForm === 0? 'month-button on-button' : 'month-button';
  const weekClass  = viewForm === 1? 'week-button on-button' : 'week-button';
  return (
    <>
    <CalendarTopHeader>
      <div className="calendar-top-title">{tableCalendar && tableCalendar.title}</div>
      <div className="calendar-top-close">
        <button className="back-button" onClick={onBackClick}/>
      </div>
    </CalendarTopHeader>
    <CalendarHeaderWrap>
      <button className="left-arrow" onClick={() => onClick(-1)} />
        <div>{headerName}</div>
      <button className="right-arrow" onClick={() => onClick(1)} />
      <button className="today-button" onClick={() => onClick(0)}>오늘</button>
      {user &&(
      <div className="todo-add-wrap">
        <Button onClick={onModalClick}>일정 추가</Button>
      </div>)}
    </CalendarHeaderWrap>
    <CalendarButtonHader>
      <button className={weekClass} onClick={() => onFormChange(1)}>주</button>
      <button className={monthClass} onClick={() => onFormChange(0)}>월</button>
    </CalendarButtonHader>
    </>
  );
};

export default CalendarHeader;
