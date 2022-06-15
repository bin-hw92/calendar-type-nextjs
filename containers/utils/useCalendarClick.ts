import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeCalendar, changeModal, changeSubWrite, changeWrite } from "../../store/modules/calendar";
import { getCalendarListDb } from "../../store/types";

type useCalendarClickProps = {
    calendarList: getCalendarListDb[]|null;
}

export function useCalendarClick({calendarList}:useCalendarClickProps) {
    const dispatch = useDispatch();
    const onClick = useCallback((fullDate:string) => {
        const DateArray = fullDate.split('.');
        dispatch(changeCalendar({
            viewYear: DateArray[0],
            viewMonth: DateArray[1],
            viewDate: DateArray[2],
        }));
        //팝업 띄우기 전에 write에 달력 값 넣기
        dispatch(changeWrite({key: 'startDay', value: fullDate}));
        dispatch(changeWrite({key: 'endDay', value: fullDate}));
        dispatch(changeSubWrite({form: 'startDate', key: 'year', value: DateArray[0]}));
        dispatch(changeSubWrite({form: 'startDate', key: 'month', value: DateArray[1]}));
        dispatch(changeSubWrite({form: 'startDate', key: 'date', value: DateArray[2]}));
        dispatch(changeSubWrite({form: 'endDate', key: 'year', value: DateArray[0]}));
        dispatch(changeSubWrite({form: 'endDate', key: 'month', value: DateArray[1]}));
        dispatch(changeSubWrite({form: 'endDate', key: 'date', value: DateArray[2]}));
        
        //값이 있을 경우 해당 날짜 상세 보여주기!!
        const TodoLen = calendarList !== null && calendarList.filter(({startDay, endDay}) => startDay <= fullDate && endDay >= fullDate).length;
        if(TodoLen > 0) dispatch(changeModal({modalFlag:true, type:'view'}));
    },[calendarList, dispatch]);

    return onClick;
}