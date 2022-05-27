
export interface getTableListDB {
    _id: string,
    title: string,
    body: string,
    password: string,
    users: [string], // 문자열로 이루어진 배열
    publishedDate: string,
    user: {
        _id: string,
        username: string,
    },
};

export interface getCalendarListDb {
    _id: string,
    title: string,
    body: string,
    startDay: string,
    startDate: {
        year: string,
        month: string,
        date: string,
        hour: string,
        min: string,
    },
    endDay: string,
    endDate: {
        year: string,
        month: string,
        date: string,
        hour: string,
        min: string,
    },
    publishedDate: string,
    user: {
        _id: string,
        username: string,
    },
    label: {
        style: string,
        text: string,
    },
    table: {
        _id: string,
        title: string,
        username: string,
    },
    daysize?: number,
}

export interface getHolidayListDb {
    dateKind: string,
    dateName: string,
    isHoliday: string,
    locdate: string,
    seq: number,
}