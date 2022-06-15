import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarWeekList from "../../../components/calendar/list/CalendarWeekList";
import { RootState } from "../../../store/modules";
import { changeCalendarMonth, listCalendar, listHoliday } from "../../../store/modules/calendar";
import { useCalendarClick } from "../../utils/useCalendarClick";
import { WeekDay, WeekStartEnd } from "../../utils/WeekCalc";

const CalendarWeekListContainer = () => {
    const [dates, setDates] = useState<any>([]);
    const dispatch = useDispatch();
    const {form, calendarList, error, loading, holidayList } = useSelector(({ calendar, loading }:RootState) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        loading: loading['calendar/LIST_CALENDAR'],
        holidayList: calendar.holidayList,
    }));
    const {viewYear, viewMonth, viewDate} = form;
 
    useEffect(() => {
        const thisDates = WeekStartEnd({viewYear, viewMonth}); //calendarList가 있을 경우
        dispatch(listCalendar(thisDates)); //처음 입장 시 
        dispatch(changeCalendarMonth(thisDates));
    },[viewYear, viewMonth, dispatch]);
    
    useEffect(() => {
        dispatch(listHoliday({viewYear})); //처음 입장 시
    },[viewYear, dispatch]);
 
    useEffect(() => {
        const thisDates = WeekDay({viewYear, viewMonth, viewDate, calendarList, holidayList}); //calendarList가 있을 경우
        setDates(thisDates);
    },[calendarList, holidayList, viewMonth, viewYear, viewDate]);

    const onClick = useCalendarClick({calendarList});

    if(calendarList === null && holidayList === null) return <></>;

    return <CalendarWeekList 
                loading={loading}
                dates={dates}
                viewDate={viewDate}
                error={error}
                onClick={onClick}
            />
};

export default CalendarWeekListContainer;