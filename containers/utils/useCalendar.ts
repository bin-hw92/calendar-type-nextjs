import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeCalendar, changeSubWrite, changeWrite } from "../../store/modules/calendar";

type MonthChangeProps = {
    idx: number;
    viewYear: string;
    viewMonth: string;
}

const MonthChange = ({idx, viewYear, viewMonth}:MonthChangeProps) => {
    console.log('@@2');
    const thisDate = new Date(parseInt(viewYear), parseInt(viewMonth), 0);
    let changeYear = viewYear;
    let changeMonth = viewMonth;
    let changeDate = '01';
    if(idx === -1){ //이전
        if(viewMonth === '01'){
            changeYear = ''+(parseInt(viewYear) - 1);
            changeMonth = '12';
        }else{
            changeMonth = ("0" + (thisDate.getMonth() !== 0? thisDate.getMonth() : 12)).slice(-2);
        }
    }
    if(idx === 1){ //다음
        if(viewMonth === '12'){
            changeYear = ''+(parseInt(viewYear) + 1);
            changeMonth = '01';
        }else{
            changeMonth = ("0" + (2 + thisDate.getMonth() !== 0? thisDate.getMonth()+2 : 12)).slice(-2);
        }
    }
    if(idx === 0){
        const nowDate = new Date();
        changeYear = ''+nowDate.getFullYear();
        changeMonth = ('0' + (1 + nowDate.getMonth())).slice(-2);
        changeDate = '11';
    }
    return {changeYear, changeMonth, changeDate};
}

type WeekChangeProps = {
    idx: number;
    viewYear: string;
    viewMonth: string;
    viewDate: string;
}

const WeekChange = ({idx, viewYear, viewMonth, viewDate}:WeekChangeProps) => {
    const thisDate = new Date(parseInt(viewYear), parseInt(viewMonth)-1, parseInt(viewDate)); // 해당 달의 몇요일인지 알기 위해서 사용
    const thisDay = thisDate.getDay()+1; //현재 날의 요일을 숫자로 표시
    let changeYear = viewYear;
    let changeMonth = viewMonth;
    let changeDate = viewDate;
    
    if(idx === -1){ //이전
        const thisPrevDate = thisDate.getDate() - thisDay;
        const prevDate = new Date(parseInt(viewYear), parseInt(viewMonth)-1, 0); //이전 달의 값 구하기
        if(1 > thisPrevDate){ //이전 주 토요일이 0이하로 나오는 지 체크
            const prevDay = prevDate.getDay() === 6? prevDate.getDate() : (prevDate.getDate() - (prevDate.getDay()+1));
            if(thisDate.getMonth() === 0){
                changeYear = ''+(parseInt(viewYear) - 1);
                changeMonth = '12';
                changeDate = ''+prevDay;
            }else{
                changeMonth = ("0" + (thisDate.getMonth() !== 0? thisDate.getMonth() : 12)).slice(-2);
                changeDate = ''+prevDay;
            }
        }else{
            changeDate = ("0"+thisPrevDate).slice(-2);
        }

    }
    if(idx === 1){ //다음
        const thisNextDate = thisDate.getDate() + (8 - thisDay);
        const nextDate = new Date(parseInt(viewYear), parseInt(viewMonth), 0); //이번 달의 마지막날 구하기
        if(thisNextDate > nextDate.getDate()){ //다음 주 일요일 날짜가 해당 달의 마지막 날보다 큰지 체크
            if(nextDate.getMonth() === 11){
                changeYear = ''+(parseInt(viewYear) + 1);
                changeMonth = '01';
                changeDate = ("0"+(thisNextDate - nextDate.getDate())).slice(-2);
            }else{
                changeMonth = ("0" + (2 + thisDate.getMonth() !== 0? thisDate.getMonth()+2 : 12)).slice(-2);
                changeDate = ("0"+(thisNextDate - nextDate.getDate())).slice(-2);
            }
        }else{
            changeDate = ("0"+thisNextDate).slice(-2);
        }
    }

    if(idx === 0){
        const nowDate = new Date();
        changeYear = ''+nowDate.getFullYear();
        changeMonth = ('0' + (1 + nowDate.getMonth())).slice(-2);
        changeDate = ('0' + nowDate.getDate()).slice(-2);
    }

    return {changeYear, changeMonth, changeDate};
}

type useCalendarProps = {
    viewYear: string;
    viewMonth: string;
    viewDate: string;
    viewForm: number;
}
export function useCalendar({viewYear, viewMonth, viewDate, viewForm}:useCalendarProps) {
    const dispatch = useDispatch();
    const onClick = useCallback((idx:number) => {
        const {changeYear, changeMonth, changeDate} = viewForm === 0? MonthChange({idx, viewYear, viewMonth}) : WeekChange({idx, viewYear, viewMonth, viewDate});


        dispatch(changeCalendar({
            viewYear: changeYear,
            viewMonth: changeMonth,
            viewDate: changeDate,
        }));
        dispatch(changeWrite({key: 'startDay', value: `${changeYear}.${changeMonth}.${changeDate}`}));
        dispatch(changeWrite({key: 'endDay', value: `${changeYear}.${changeMonth}.${changeDate}`}));
        dispatch(changeSubWrite({form: 'startDate', key: 'year', value: changeYear}));
        dispatch(changeSubWrite({form: 'startDate', key: 'month', value: changeMonth}));
        dispatch(changeSubWrite({form: 'startDate', key: 'date', value: changeDate}));
        dispatch(changeSubWrite({form: 'endDate', key: 'year', value: changeYear}));
        dispatch(changeSubWrite({form: 'endDate', key: 'month', value: changeMonth}));
        dispatch(changeSubWrite({form: 'endDate', key: 'date', value: changeDate}));
        
    },[dispatch, viewMonth, viewYear, viewDate, viewForm]);

    return onClick;
}