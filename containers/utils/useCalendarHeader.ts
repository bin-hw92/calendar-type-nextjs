import { useMemo } from "react";

const getCalendarMonthName = (viewYear:string, viewMonth:string) => {
    const name = `${viewYear}년 ${viewMonth}월`;
    return name;
}

const getCalendarWeekName = (viewYear:string, viewMonth:string, viewDate:string) => {
    const firstDay = new Date(parseInt(viewYear), parseInt(viewMonth)-1, 1);
    const prevDay =  new Date(parseInt(viewYear), parseInt(viewMonth)-2, 0);
    const prevDate =  (6-prevDay.getDay())+1;
    const firstDate = firstDay.getDay() === 0? 1 : (7-firstDay.getDay())+1;
    
    if(firstDate > parseInt(viewDate)){
        let lastDay = new Date(parseInt(viewYear), parseInt(viewMonth)-1, 0);
        const PLYear = lastDay.getFullYear();
        const PLMonth = ("0" + (1 + lastDay.getMonth() === 13 ? '01' : 1 + lastDay.getMonth())).slice(-2);
        let week = 0;
        let cnt = 0;
        for(let i = prevDate; i < lastDay.getDate()+1; i++){
            if(cnt % 7 === 0) week++;
            cnt++;
        }
        
        return `${PLYear}년 ${PLMonth}월 ${week}주차`;
    }

    const lastDay = new Date(parseInt(viewYear), parseInt(viewMonth), 0);
    let week = 0;
    let cnt = 0;
    let weekCnt = 0;
    for(let i = firstDate; i < lastDay.getDate()+1; i++){
        if(cnt % 7 === 0) week++;
        const day = i < 10? `0${i}` : ''+i;
        if(day === viewDate) weekCnt = week;
        cnt++;
    }
    return `${viewYear}년 ${viewMonth}월 ${weekCnt}주차`;
}

type CalendarHeaderProps = {
    viewYear: string;
    viewMonth: string;
    viewDate: string;
    viewForm: number;
}

export function useCalendarHeader({viewYear, viewMonth, viewDate, viewForm}:CalendarHeaderProps){
    const headerMonthName = useMemo(() => getCalendarMonthName(viewYear, viewMonth),[viewYear, viewMonth]);
    const headerWeekName =  useMemo(() => getCalendarWeekName(viewYear, viewMonth, viewDate),[viewYear, viewMonth, viewDate]);
    return viewForm === 0 ? headerMonthName : headerWeekName; 
}