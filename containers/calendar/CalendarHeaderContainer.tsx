import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { changeModal } from "../../store/modules/calendar";
import { changeForm } from "../../store/modules/form";
import { tableout } from "../../store/modules/tables";
import { RootState } from "../../store/modules";
import { useCalendarHeader } from "../utils/useCalendarHeader";
import { useCalendar } from "../utils/useCalendar";

const CalendarHeaderContainer = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {viewYear, viewMonth, viewDate, user, tableCalendar, viewForm} = useSelector(({ calendar, user, tables, form }:RootState) => ({
        viewYear: calendar.form.viewYear,
        viewMonth: calendar.form.viewMonth,
        viewDate: calendar.form.viewDate,
        user: user.user,
        tableCalendar: tables.tableCalendar,
        viewForm: form.viewForm,
    }));

    const headerName = useCalendarHeader({viewYear, viewMonth, viewDate, viewForm});

    const onClick = useCalendar({viewYear, viewMonth, viewDate, viewForm}); 


    const onModalClick = () => {
        dispatch(changeModal({modalFlag:true, type:'wrtie'}));
    };

    const onBackClick = () => {
        dispatch(tableout());
    };

    const onFormChange = useCallback((value:number) => {
        dispatch(changeForm({key: 'viewForm', value}));
    },[dispatch]);

    useEffect(() => {
        if(!user){
            router.replace('/page/Login');
            return;
        }
        if(!tableCalendar){
            router.replace('/page/TableList');
            return;
        }
    },[router, tableCalendar, user]);

    return (
        <CalendarHeader 
            user={user} 
            headerName={headerName} 
            tableCalendar={tableCalendar} 
            viewForm={viewForm}
            onClick={onClick} 
            onModalClick={onModalClick} 
            onBackClick={onBackClick}
            onFormChange={onFormChange}
        />
    )
};

export default CalendarHeaderContainer;