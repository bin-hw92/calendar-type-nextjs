import { MouseEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarYearList from "../../../components/calendar/list/CalendarYearList";
import { RootState } from "../../../store/modules";
import { changeCalendar, changeCalendarMonth, changeSubWrite, changeWrite, listCalendar } from "../../../store/modules/calendar";
import { deleteCalendar } from "../../../store/modules/view";
import { timeout } from "../../utils/useTimeout";

const CalendarYearListContainer = () => {
    const dispatch = useDispatch();
    const {form, calendarList, error, user, loading } = useSelector(({ calendar, user, loading }:RootState) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        user: user.user,
        loading: loading['calendar/LIST_CALENDAR'],
    }));
 
    useEffect(() => {
        const startMonth = form.viewYear+".01", endMonth = form.viewYear+".12";
        const thisDates = {startMonth, endMonth};
        dispatch(listCalendar(thisDates)); //처음 입장 시 
        dispatch(changeCalendarMonth(thisDates));
    },[dispatch, form.viewYear]);
    
    const onClick = useCallback(async (e:MouseEvent<Element>, id:string, startDay:string) => {
        const eClassName = e.target as Element;
        if(eClassName.className === 'delete') {
            if (window.confirm("정말 삭제합니까?")) {
                const DateArray = startDay.split('.');
                /* 삭제 관련 미들웨어 통신 */
                await dispatch(deleteCalendar(id));
                await timeout(300); //0.3초 딜레이
                const startMonth = form.viewYear+".01", endMonth = form.viewYear+".12";
                await dispatch(listCalendar({startMonth, endMonth}));
                /* 종료 */

                /* 삭제 된 할 일의 시작날짜로 전역 상태 값을 변경 */
                dispatch(changeCalendar({
                    viewYear: DateArray[0],
                    viewMonth: DateArray[1],
                    viewDate: DateArray[2],
                }));
                dispatch(changeWrite({key: 'startDay', value: startDay}));
                dispatch(changeWrite({key: 'endDay', value: startDay}));
                dispatch(changeSubWrite({form: 'startDate', key: 'year', value: DateArray[0]}));
                dispatch(changeSubWrite({form: 'startDate', key: 'month', value: DateArray[1]}));
                dispatch(changeSubWrite({form: 'startDate', key: 'date', value: DateArray[2]}));
                dispatch(changeSubWrite({form: 'endDate', key: 'year', value: DateArray[0]}));
                dispatch(changeSubWrite({form: 'endDate', key: 'month', value: DateArray[1]}));
                dispatch(changeSubWrite({form: 'endDate', key: 'date', value: DateArray[2]}));
            }
        }
    },[dispatch, form.viewYear]);

    if(calendarList === null) return <></>;

    return <CalendarYearList
                loading={loading}
                calendarList={calendarList}
                User={user}
                error={error}
                onClick={onClick}
            />
};

export default CalendarYearListContainer;