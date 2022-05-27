import Router from "koa-router";
import calendars from "./calendar";
import auth from "./auth";
import holiday from "./holiday";
import tables from "./tables";

const api = new Router();

console.log('api index 부분 입니다.');

api.use('/calendar', calendars.routes());
api.use('/auth', auth.routes());
api.use('/holiday', holiday.routes());
api.use('/tables', tables.routes());

//라우터를 내보냅니다.
export default api;