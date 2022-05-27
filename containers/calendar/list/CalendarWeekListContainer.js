const CalendarWeekListContainer = () => {
    const date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth()+1, 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

    const date2 = [];
    let cnt = 0;
    let week = 0;
    for(let i = ((7-firstDay.getDay())+1); i < lastDay.getDate()+1; i++){
        if(cnt % 7 === 0) week++;
        date2.push([week, i]);
        cnt++;
    }
    // nextDates 계산
    for (let i = 1; i < 7 - lastDay.getDay(); i++) {
        date2.push([week, i]);
    }

    return (
        <>
            <div>
                {date2.join(' && ')}
            </div>
        </>
    )
};

export default CalendarWeekListContainer;