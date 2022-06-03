import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarMonthList from "../../../components/calendar/list/CalendarMonthList";
import { changeCalendar, changeModal, changeWrite, changeSubWrite, listCalendar, listHoliday, changeCalendarMonth } from "../../../store/modules/calendar";
import { RootState } from "../../../store/modules";
import { DayCalc, DayStartEnd } from "../../utils/DayCalc";

const CalendarMonthListContainer = () => {
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch();
    const {form, calendarList, error, loading, holidayList } = useSelector(({ calendar, loading }:RootState) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        loading: loading['calendar/LIST_CALENDAR'],
        holidayList: calendar.holidayList,
    }));
    const {viewYear, viewMonth, viewDate} = form;
    
    /* useEffect(() => {
        return () => { // 언마운트될 때 초기화
            dispatch(initialize());
        };
    },[dispatch]); */

    useEffect(() => {
        const thisDates = DayStartEnd({viewYear, viewMonth}); //calendarList가 있을 경우
        dispatch(listCalendar(thisDates)); //처음 입장 시 
        dispatch(changeCalendarMonth(thisDates));
    },[viewYear, viewMonth, dispatch]);
    
    useEffect(() => {
        dispatch(listHoliday({viewYear})); //처음 입장 시
    },[viewYear, dispatch]);


    useEffect(() => {
        const thisDates = DayCalc({viewYear, viewMonth, calendarList, holidayList}); //calendarList가 있을 경우
        setDates(thisDates);
    },[calendarList, holidayList, viewMonth, viewYear]);

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
    
    return (
        <CalendarMonthList
            loading={loading}
            dates={dates} 
            viewDate={viewDate}
            error={error}
            onClick={onClick}
        />
    )
};

export default CalendarMonthListContainer;