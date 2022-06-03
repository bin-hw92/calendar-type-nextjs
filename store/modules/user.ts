import { createAction, handleActions } from "redux-actions";
import { takeLatest, call } from "redux-saga/effects";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
//회원정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user:string) => user);
export const check = createAction(CHECK); 
export const logout = createAction(LOGOUT);


//사가 만들기
const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
    try{
        localStorage.removeItem('user'); // localStorage에서 user를 제거
    }catch(e){
        console.log('localStorage is not working');
    }
}

function* logoutSaga() {
    try {
        yield call(authAPI.logout); // logout API 호출
        localStorage.removeItem('user'); // localStorage에서 user를 제거
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
// initial state
export interface UserState {
    user: {
        [key in string] : string;
    }|null;
    checkError: boolean|null;
}
const initialState:UserState = {
    user: null,
    checkError: null,
};

export default handleActions<UserState, any>(
    {
        [TEMP_SET_USER] : (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS] : (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null
        }),
        [CHECK_FAILURE] : (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT] : state => ({
            ...state,
            user: null
        }),
    },
    initialState,
);