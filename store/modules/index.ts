
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import user, { userSaga } from "./user";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import tables, { tablesSaga } from "./tables";
import calendar, {calendarListSaga} from "./calendar";
import view, {calendarReadSaga} from "./view";
import write, {writeSaga} from "./write";
import form from "./form";

const rootReducer = combineReducers({
    form,
    user,
    auth,
    loading,
    tables,
    calendar,
    view,
    write
});
// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([userSaga(), authSaga(), tablesSaga(), calendarListSaga(), calendarReadSaga(), writeSaga()]);
}

export default rootReducer;