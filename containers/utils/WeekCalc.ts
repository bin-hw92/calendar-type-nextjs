import { getCalendarListDb, getHolidayListDb } from "../../store/types";

type DayStartEndProps = {
    viewYear: string;
    viewMonth: string;
}

export const WeekStartEnd = ({viewYear, viewMonth}:DayStartEndProps) => {
       // 지난 달 마지막 Date, 이번 달 마지막 Date
       const prevLast = new Date(parseInt(viewYear), parseInt(viewMonth) - 1, 0);
       const thisLast = new Date(parseInt(viewYear), parseInt(viewMonth), 0);
   
       const PLYear = prevLast.getFullYear();
       const PLMonth =  ("0" + (1 + prevLast.getMonth())).slice(-2);
       const PLDay = prevLast.getDay();
   
       const TLDate = thisLast.getDate();
       const TLDay = thisLast.getDay();
   
       const NLYear = 2 + thisLast.getMonth() === 13 ? thisLast.getFullYear() + 1 : thisLast.getFullYear();
       const NLMonth = ("0" + (2 + thisLast.getMonth() === 13 ? '01' : 2 + thisLast.getMonth())).slice(-2);
   
       // Dates 기본 배열들
       const thisDates = [];
     
       // prevDates 계산
       if (PLDay !== 6) {
         for (let i = 0; i < PLDay + 1; i++) {
           thisDates.unshift({
               fullDate: `${PLYear}.${PLMonth}`,
           });
         }
       }
       //현재 달 게산
       for(let i=1; i < TLDate+1; i++){
           thisDates.push({
               fullDate: `${viewYear}.${viewMonth}`,
           });
       }
       // nextDates 계산
       for (let i = 1; i < 7 - TLDay; i++) {
           thisDates.push({
               fullDate: `${NLYear}.${NLMonth}`,
           });
       }

       const startDates = thisDates[0].fullDate.split('.');
       let startMonth = '';
       if(startDates[1] === '01') startMonth = (parseInt(startDates[0])-1) + '.12';
       else startMonth = (parseInt(startDates[1])-1) < 10? `${startDates[0]}.0${(parseInt(startDates[1])-1)}` :  `${startDates[0]}.${(parseInt(startDates[1])-1)}`;

       const endDates = thisDates[thisDates.length-1].fullDate.split('.');
       let endMonth = '';
       if(endDates[1] === '12') endMonth = (parseInt(endDates[0])+1) + '.01';
       else endMonth = (parseInt(endDates[1])+1) < 10? `${endDates[0]}.0${(parseInt(endDates[1])+1)}` :  `${endDates[0]}.${(parseInt(endDates[1])+1)}`;

       return {startMonth, endMonth};
}


type WeekDayProps = {
    viewYear: string;
    viewMonth: string;
    viewDate: string;
    calendarList: getCalendarListDb[]|null;
    holidayList: getHolidayListDb[]|null;
}

export const WeekDay = ({viewYear, viewMonth, viewDate, calendarList, holidayList}:WeekDayProps) => {
    const firstDay = new Date(parseInt(viewYear), parseInt(viewMonth)-1, 1);
    const firstDate = firstDay.getDay() === 0? 1 : (7-firstDay.getDay())+1;
    const lastDay = new Date(parseInt(viewYear), parseInt(viewMonth), 0);

    const NLYear = 2 + lastDay.getMonth() === 13 ? lastDay.getFullYear() + 1 : lastDay.getFullYear();
    const NLMonth = ("0" + (2 + lastDay.getMonth() === 13 ? '01' : 2 + lastDay.getMonth())).slice(-2);

    const thisDates = [];
    let cnt = 0;
    let week = 0;
    let weekCnt = 0;
    
    //날짜에 맞는 할 일 찾아서 다시 넣기
    const nextDates:any = [];
    if(holidayList === null || calendarList === null) return nextDates;


    if(firstDate > parseInt(viewDate)){
        const prevLast = new Date(parseInt(viewYear), parseInt(viewMonth) - 1, 0);
        const PLYear = prevLast.getFullYear();
        const PLMonth =  ("0" + (1 + prevLast.getMonth())).slice(-2);
        const PLDate = prevLast.getDate();
        // prevDates 계산
        for (let i = 0; i < prevLast.getDay() + 1; i++) {
            thisDates.unshift({
                date: PLDate - i,
                fullDate: `${PLYear}.${PLMonth}.${PLDate - i}`,
                isMonth: true,
                weekCnt: 0,
            });
        }
        for(let i = 1; i < ((7-firstDay.getDay())+1); i++){
            thisDates.push({
                date:  `0${i}`,
                fullDate: `${viewYear}.${viewMonth}.0${i}`,
                isMonth: true,
                weekCnt: 0,
            });
        }
            
        thisDates.forEach((dates, idx) => {
            const tDates = dates.fullDate.split('.');
            const tDate = new Date(parseInt(tDates[0]), parseInt(tDates[1])+1, parseInt(dates.date+''));

            const todoList = calendarList.reduce((result:any, calendar:any) => {
                const sDate = new Date(calendar.startDate.year, parseInt(calendar.startDate.month)+1, calendar.startDate.date); 
                const eDate = new Date(calendar.endDate.year, parseInt(calendar.endDate.month)+1, calendar.endDate.date); 
                if(+sDate === +tDate && +eDate === +tDate){
                    result.push({...calendar, 'startflag': true, 'endflag': true}); //시작, 종료가 당일일 경우
                }else{
                    if(+sDate === +tDate && +eDate > +tDate) result.push({...calendar, 'startflag': true, 'endflag': false}); //시작이지만, 종료가 아닌 날
                    if(+sDate < +tDate && +eDate === +tDate) result.push({...calendar, 'startflag': false, 'endflag': true}); //시작일보다 큰데 종료일인 날
                    if(+sDate < +tDate && +tDate < +eDate && idx % 7 === 0){
                        const newDaysize = (+eDate - +tDate)/1000/60/60/24;
                        if(newDaysize === 0)result.push({...calendar, 'startflag': true, 'endflag': true, daysize: newDaysize}); //기간이 길어서 다음주로 넘어갔을 때 일요일 종료
                        if(newDaysize > 0)result.push({...calendar, 'startflag': true, 'endflag': false, daysize: newDaysize}); //기간이 길어서 다음주로 넘어갔을 때 일요일 보다 클 경우
                    }
                    if(+sDate < +tDate && +tDate < +eDate  && idx % 7 > 0 && idx % 7 < 6) result.push({...calendar, 'startflag': false, 'endflag': false}); //기간 중간 날짜
                    if(+sDate < +tDate && +tDate < +eDate && (idx+1) % 7 === 0){
                        result.push({...calendar, 'startflag': false, 'endflag': true}); //기간이 다음주로 넘어가야하는 토요일
                    }
                }
                return result;
            },[]);
            todoList.sort((a:any,b:any) => b.daysize-a.daysize);

            const holiday = holidayList.filter((holidays:any) => holidays.locdate === parseInt( tDates[0]+tDates[1]+dates.date) ).length === 0? false : true;
            nextDates.push({...dates, todoList, 'holiday': holiday});
        });
        return nextDates;
    }
 
    for(let i = firstDate; i < lastDay.getDate()+1; i++){
        if(cnt % 7 === 0) week++;
        const day = i < 10? `0${i}` : ''+i;
        if(day === viewDate) weekCnt = week;
        thisDates.push({
            date: day,
            fullDate: `${viewYear}.${viewMonth}.${day}`,
            isMonth: true,
            weekCnt: week,
        });
        cnt++;
    }
    // nextDates 계산
    for (let i = 1; i < 7 - lastDay.getDay(); i++) {
        const day = `0${i}`;
        thisDates.push({
            date: day,
            fullDate: `${NLYear}.${NLMonth}.${day}`,
            isMonth: true,
            weekCnt: week,
        });
    }
    const newDates = thisDates.filter(date => date.weekCnt === weekCnt);
    newDates.forEach((dates, idx) => {
        const tDates = dates.fullDate.split('.');
        const tDate = new Date(parseInt(tDates[0]), parseInt(tDates[1])+1, parseInt(dates.date+''));

        const todoList = calendarList.reduce((result:any, calendar:any) => {
            const sDate = new Date(calendar.startDate.year, parseInt(calendar.startDate.month)+1, calendar.startDate.date); 
            const eDate = new Date(calendar.endDate.year, parseInt(calendar.endDate.month)+1, calendar.endDate.date); 
            if(+sDate === +tDate && +eDate === +tDate){
                result.push({...calendar, 'startflag': true, 'endflag': true}); //시작, 종료가 당일일 경우
            }else{
                if(+sDate === +tDate && +eDate > +tDate) result.push({...calendar, 'startflag': true, 'endflag': false}); //시작이지만, 종료가 아닌 날
                if(+sDate < +tDate && +eDate === +tDate) result.push({...calendar, 'startflag': false, 'endflag': true}); //시작일보다 큰데 종료일인 날
                if(+sDate < +tDate && +tDate < +eDate && idx % 7 === 0){
                    const newDaysize = (+eDate - +tDate)/1000/60/60/24;
                    if(newDaysize === 0)result.push({...calendar, 'startflag': true, 'endflag': true, daysize: newDaysize}); //기간이 길어서 다음주로 넘어갔을 때 일요일 종료
                    if(newDaysize > 0)result.push({...calendar, 'startflag': true, 'endflag': false, daysize: newDaysize}); //기간이 길어서 다음주로 넘어갔을 때 일요일 보다 클 경우
                }
                if(+sDate < +tDate && +tDate < +eDate  && idx % 7 > 0 && idx % 7 < 6) result.push({...calendar, 'startflag': false, 'endflag': false}); //기간 중간 날짜
                if(+sDate < +tDate && +tDate < +eDate && (idx+1) % 7 === 0){
                    result.push({...calendar, 'startflag': false, 'endflag': true}); //기간이 다음주로 넘어가야하는 토요일
                }
            }
            return result;
        },[]);
        todoList.sort((a:any,b:any) => b.daysize-a.daysize);

        const holiday = holidayList.filter((holidays:any) => holidays.locdate === parseInt( tDates[0]+tDates[1]+dates.date) ).length === 0? false : true;
        nextDates.push({...dates, todoList, 'holiday': holiday});
    });

    return nextDates;
}