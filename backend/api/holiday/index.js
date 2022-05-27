import Router from "koa-router";
import * as holidayCtrl from "./holiday.ctrl";

const holiday = new Router();

holiday.get('/', holidayCtrl.list);

export default holiday;