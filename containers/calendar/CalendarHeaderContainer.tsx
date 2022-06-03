import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { changeCalendar, changeWrite, changeModal, changeSubWrite } from "../../store/modules/calendar";
import { changeForm } from "../../store/modules/form";
import { tableout } from "../../store/modules/tables";
import { RootState } from "../../store/modules";

const getCalendarName = (viewYear:string, viewMonth:string) => {
    const name = `${viewYear}년 ${viewMonth}월`;
    return name;
}

const CalendarHeaderContainer = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {viewYear, viewMonth, user, tableCalendar} = useSelector(({ calendar, user, tables }:RootState) => ({
        viewYear: calendar.form.viewYear,
        viewMonth: calendar.form.viewMonth,
        user: user.user,
        tableCalendar: tables.tableCalendar,
    }));

    const headerNmae = useMemo(() => getCalendarName(viewYear, viewMonth),[viewMonth, viewYear]);

    const onClick = useCallback((idx:number) => {
        const thisDate = new Date(parseInt(viewYear+''), parseInt(viewMonth+''), 0);
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
            changeDate = ('0' + nowDate.getDate()).slice(-2);
        }
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
        
    },[dispatch, viewMonth, viewYear]);


    const onModalClick = () => {
        dispatch(changeModal({modalFlag:true, type:'wrtie'}));
    };

    const onBackClick = () => {
        dispatch(tableout());
    };

    const onFormChange = (value:number) => {
        dispatch(changeForm({key: 'viewForm', value}));
    }

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
            headerNmae={headerNmae} 
            tableCalendar={tableCalendar} 
            onClick={onClick} 
            onModalClick={onModalClick} 
            onBackClick={onBackClick}
            onFormChange={onFormChange}
        />
    )
};

export default CalendarHeaderContainer;