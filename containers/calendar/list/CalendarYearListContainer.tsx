import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarYearList from "../../../components/calendar/list/CalendarYearList";
import { RootState } from "../../../store/modules";
import { changeCalendarMonth, listCalendar } from "../../../store/modules/calendar";

const CalendarYearListContainer = () => {
    const dispatch = useDispatch();
    const {form, calendarList, error, user, loading } = useSelector(({ calendar, user, loading }:RootState) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        user: user.user,
        loading: loading['calendar/LIST_CALENDAR'],
    }));

    const {viewYear, viewMonth} = form;
 
    useEffect(() => {
        const startMonth = viewYear+".01", endMonth = viewYear+".12";
        const thisDates = {startMonth, endMonth};
        dispatch(listCalendar(thisDates)); //처음 입장 시 
        dispatch(changeCalendarMonth(thisDates));
    },[viewYear, viewMonth, dispatch]);

    if(calendarList === null) return <></>;

    return <CalendarYearList
                loading={loading}
                calendarList={calendarList}
                User={user}
                error={error}
            />
};

export default CalendarYearListContainer;