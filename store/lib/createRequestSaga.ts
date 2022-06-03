
import { call, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "../modules/loading";

export const createRequestActionTypes = (type:string) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type:string, request:any) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return function*(action:any) {
        yield put(startLoading(type)); //로딩 시작
        try {
            const response:Promise<any> = yield call(request, action.payload);
            const result:any = response; //프로미스라서 변경
            yield put({
                type: SUCCESS,
                payload: result.data,
                meta: response,
            });
        }catch(error){
            yield put({
                type: FAILURE,
                payload: error,
                error: true,
            });
        }
        yield put(finishLoading(type)); //로딩 종료
    }
}