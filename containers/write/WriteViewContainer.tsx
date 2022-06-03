import { ChangeEvent, FormEvent, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import WriteView from "../../components/write/WriteView";
import { changeModal, listCalendar,changeWrite, changeSubWrite } from "../../store/modules/calendar";
import { RootState } from "../../store/modules";
import { initialize, updateCalendar, writeCalendar } from "../../store/modules/write";
import { labels } from "../utils/labelStyle";

const dateChangeFormat = (date:Date) => {
    const nDate = new Date(date);
    const nYear = nDate.getFullYear();
    const nMonth = ("0" + (1 + nDate.getMonth())).slice(-2);
    const nDay = ("0" + nDate.getDate()).slice(-2);

    return `${nYear}.${nMonth}.${nDay}`;
}

const checkDate = ({startDate, endDate}:any) => {
    let sDate = new Date(startDate.year, startDate.month, startDate.date, startDate.hour, startDate.min); 
    let eDate = new Date(endDate.year, endDate.month, endDate.date, endDate.hour, endDate.min); 
    
    if(+sDate > +eDate) return false;

    return true;
}

const WriteViewContainer = () => {
    const dispatch = useDispatch();
    const { startMonth, endMonth, startDay, startDate, endDay, endDate, setcalendar, calendar, calendarError, calendarId,} = useSelector(({ calendar, write }:RootState) => ({
        startMonth: calendar.startMonth,
        endMonth: calendar.endMonth,
        startDay: calendar.write.startDay,
        startDate: calendar.write.startDate,
        endDay: calendar.write.endDay,
        endDate: calendar.write.endDate,
        setcalendar: write.setcalendar, //수정 화면으로 성공 시
        calendar: write.calendar, //업데이트 완료 시
        calendarError: write.calendarError,
        calendarId: write.calendarId,
    }));

    //기본 상태값
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [labelStyle, setLabelStyle] = useState('#f77878'); //기본은 빨강
    const [labelText, setLabelText] = useState('');
    const [error, setError] = useState(['','']);

    const hoursArray = [];
    const minArray = [];
    for(let i=0; i < 61; i++){
        minArray.push(i);
        if(i < 24){
            hoursArray.push(i);
        }
    }

    //시,분 selected BOx 핸들러
    const onChange = useCallback((e:ChangeEvent<HTMLSelectElement>) => {
        const { value, name, id } = e.target;
        if(id === 'start-hours'){
            dispatch(changeSubWrite({
                    form: 'startDate',
                    key: name,
                    value
            }));
        }
        if(id === 'start-min'){
            dispatch(changeSubWrite({
                    form: 'startDate',
                    key: name,
                    value
            }));
        }
        if(id === 'end-hours'){
            dispatch(changeSubWrite({
                    form: 'endDate',
                    key: name,
                    value
            }));
        }
        if(id === 'end-min'){
            dispatch(changeSubWrite({
                    form: 'endDate',
                    key: name,
                    value
            }));
        }
    },[dispatch]);

    //DatePicker 변경용 핸들러
    const onDateChange = useCallback((date:Date, type:string) => {
        const nextDate = dateChangeFormat(date);
        if(type === "START"){
            dispatch(changeWrite({key: 'startDay', value: nextDate,}));
            dispatch(changeSubWrite({form: 'startDate', key: 'year', value: nextDate.split('.')[0],}));
            dispatch(changeSubWrite({form: 'startDate', key: 'month', value: nextDate.split('.')[1],}));
            dispatch(changeSubWrite({form: 'startDate', key: 'date', value: nextDate.split('.')[2],}));
        }
        if(type === "END"){
            dispatch(changeWrite({key: 'endDay',value: nextDate,}));
            dispatch(changeSubWrite({ form: 'endDate', key: 'year',value: nextDate.split('.')[0],}));
            dispatch(changeSubWrite({form: 'endDate', key: 'month', value: nextDate.split('.')[1],}));
            dispatch(changeSubWrite({form: 'endDate', key: 'date', value: nextDate.split('.')[2],}));
        }
    },[dispatch]);

    //INPUT과 TEXTAREA 핸들러
    const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if(name === 'title') setTitle(value);
        if(name === 'body') setBody(value);
        if(name === 'label-text') setLabelText(value);
    };

    //등록 핸들러
    const onSubmit = useCallback((e:FormEvent) => {
        e.preventDefault();
        const label = {
            style: labelStyle,
            text: labelText,
        }
        
        if(title === ''){
            setError(['title', '제목을 입력하세요.']);
            return;
        }
        if(!checkDate({startDate, endDate})){
            setError(['date', '시작일이 종료일보다 클 수 없습니다.']);
            return;
        }
        if(labelText === ''){
            setError(['label','라벨명을 입력하세요.']);
            return;
        }
        if(!calendarId){ //추가
            dispatch(writeCalendar({title, body, startDay, startDate, endDay, endDate, label}));
        }else{//수정
            dispatch(updateCalendar({id:calendarId, title, body, startDay, startDate, endDay, endDate, label}));
        }
    },[body, calendarId, dispatch, endDate, endDay, labelStyle, labelText, startDate, startDay, title]);

    useEffect(() => {
        return () => {
            dispatch(initialize()); //언마운트 시 초기화
        };
    },[dispatch]);
    
    // 성공 혹은 실패 시 할 작업
    useEffect(() => {
        if(!calendarId){
            //추가
            if(calendar){
                dispatch(listCalendar({startMonth, endMonth}));
                dispatch(changeModal({modalFlag:false, type:null}));
            }
            if(calendarError){
                console.log(calendarError);
            } 
        }else{
            //수정
            if(calendar){
                dispatch(listCalendar({startMonth, endMonth}));
                dispatch(changeModal({modalFlag:true, type:'view'}));//이전 팝업으로 백
            }
            if(calendarError){
                console.log(calendarError);
            }

            //수정 화면 입장 성공 시
            if(setcalendar !== null){
                setTitle(setcalendar.title);
                setBody(setcalendar.body);
                setLabelText(setcalendar.label.text);
                setLabelStyle(setcalendar.label.style);
            }
        }
    },[calendar, calendarError, calendarId, dispatch, setcalendar, startMonth, endMonth]);
 
    const write = {
        title,
        body,
        startDay,
        startDate,
        endDay,
        endDate,
        hoursArray: hoursArray,
        minArray: minArray,
        labels,
        labelStyle,
        labelText,
    }

    const onStyleClick = useCallback((id:number) => {
        let color = '';
        labels.forEach((label) => {
            if(label.id === id) color = label.color;
        });
        setLabelStyle(color);
    },[]);

    return (
       <WriteView 
            onChange={onChange} 
            write={write} 
            error={error}
            onDateChange={onDateChange} 
            onSubmit={onSubmit} 
            onInputChange={onInputChange} 
            calendarId={calendarId} 
            onStyleClick={onStyleClick}
        />
    )
};

export default WriteViewContainer;