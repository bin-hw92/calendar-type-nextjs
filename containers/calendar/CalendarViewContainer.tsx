import { MouseEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../../components/calendar/CalendarView";
import { RootState } from "../../store/modules";
import { changeModal, listCalendar } from "../../store/modules/calendar";
import { deleteCalendar, readCalendar, unloadCalendar } from "../../store/modules/view";
import { editCalendar } from "../../store/modules/write";
import { timeout } from "../utils/useTimeout";

const CalendarViewContainer = () => {
    const dispatch = useDispatch();
    const { startMonth, endMonth, form, calendars, deleteFlag, user, loading } = useSelector(({ calendar, view, user, loading }:RootState) => ({
        startMonth: calendar.startMonth,
        endMonth: calendar.endMonth,
        form: calendar.form,
        calendars: view.calendar,
        deleteFlag: view.deleteFlag,
        error: view.error,
        user: user.user,
        loading: loading['view/READ_CALENDAR'],
    }));
    const {viewYear, viewMonth, viewDate} = form;

    const onClick = useCallback(async (e:MouseEvent<Element>, id:string) => {
        const eClassName = e.target as Element;
        if(eClassName.className === 'title' || eClassName.className === 'title-font'){
            const flag = await dispatch(editCalendar(id));
            if(flag) await dispatch(changeModal({modalFlag:true, type:'wrtie'}));
        }
        if(eClassName.className === 'delete') {
            if (window.confirm("정말 삭제합니까?")) {
                const checkDate = `${viewYear}.${viewMonth}.${viewDate}`;
                await dispatch(deleteCalendar(id));
                await timeout(300); //0.3초 딜레이
                await dispatch(readCalendar(checkDate));
                await dispatch(listCalendar({startMonth, endMonth}));
              }
        }
    },[dispatch, viewDate, viewMonth, viewYear, startMonth, endMonth]);

    useEffect(() => {
        dispatch(readCalendar(`${viewYear}.${viewMonth}.${viewDate}`));
    },[deleteFlag, dispatch, viewDate, viewMonth, viewYear]);

    useEffect(() => {
       if(calendars !== null){
           if(!calendars.length){
                dispatch(changeModal({modalFlag:false, type:null}));
                dispatch(unloadCalendar()); //해당 날짜 모든 할 일 삭제로 캘린더List null로 변경
           }
       } 
    },[calendars, dispatch]);

    return (
        <CalendarView 
            calendars={calendars} 
            onClick={onClick} 
            User={user} 
            viewYear={viewYear} 
            viewMonth={viewMonth} 
            viewDate={viewDate}
            loading={loading}
        />
    )
}

export default CalendarViewContainer;