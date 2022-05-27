import mongoose, { Schema } from "mongoose";

const CalendarSchema = new Schema({
    title: String,
    body: String,
    startDay: String,
    startDate: {
        year: String,
        month: String,
        date: String,
        hour: String,
        min: String,
    },
    endDay: String,
    endDate: {
        year: String,
        month: String,
        date: String,
        hour: String,
        min: String,
    },
    publishedDate: {
        type: Date,
        default: Date.now, // 현재 날짜를 기본값으로 지정
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    label: {
        style: String,
        text: String,
    },
    table: {
        _id: mongoose.Types.ObjectId,
        title: String,
        username: String,
    }
});

const Calendar = mongoose.model('Calendar', CalendarSchema);
export default Calendar;