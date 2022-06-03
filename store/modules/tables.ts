import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as tableAPI from "../lib/api/tables";
import { call, takeLatest } from "redux-saga/effects";
import produce from "immer";
import { getTableListDB } from "../types";

const CHANGE_FINELD = 'table/CHANGE_FIELD';
const INITIALIZE = 'table/INITIALIZE'; // 모든 내용 초기화
const TEMP_SET_TABLE = 'table/TEMP_SET_TABLE'; // 새로고침 이후 임시 캘린더 입장처리
const TABLE_OUT = 'table/TABLE_OUT'; //캘린더 나가기

//글 등록 상태
const [WRITE_TABLE, WRITE_TABLE_SUCCESS, WRITE_TABLE_FAILURE] = createRequestActionTypes('table/WRITE_TABLE'); //글 작성
const [LIST_TABLE, LIST_TABLE_SUCCESS, LIST_TABLE_FAILURE] = createRequestActionTypes('table/LIST_TABLE'); //글 목록
const [DELETE_TABLE, DELETE_TABLE_SUCCESS, DELETE_TABLE_FAILURE] = createRequestActionTypes('table/DELETE_TABLE'); //글 삭제

//비밀번호 확인
const [CHECK_TABLE, CHECK_TABLE_SUCCESS, CHECK_TABLE_FAILURE] = createRequestActionTypes('table/CHECK_TABLE');

export const tempSetTable = createAction(TEMP_SET_TABLE, (tableCalendar:any) => tableCalendar);
export const initialize = createAction(INITIALIZE);

export const tableout = createAction(TABLE_OUT);

export const checkTable = createAction(CHECK_TABLE, 
    ({id, password}:tableAPI.tableActionState) => ({
        id,
        password, 
    }),
); 

export const changeField = createAction(
    CHANGE_FINELD,
    ({ key, value }:tableAPI.tableActionState) => ({
        key, // title, body, password, users
        value, // 실제 바꾸려는 값
    }),
);
export const writeTable = createAction(WRITE_TABLE, ({ title, password, body, users}:tableAPI.tableWirteState) => ({
    title,
    password,
    body,
    users,
}));


export const listTable = createAction(LIST_TABLE, (page:number) => (page));

export const deleteTable = createAction(DELETE_TABLE, (id:string) => (id));

//사가 생성
const writeTableSaga = createRequestSaga(WRITE_TABLE, tableAPI.writeTable);
const listTableSage = createRequestSaga(LIST_TABLE, tableAPI.listTable);
const deleteTableSage = createRequestSaga(DELETE_TABLE, tableAPI.deleteTable);
const checkSaga = createRequestSaga(CHECK_TABLE, tableAPI.check);

//캘린더 나가기 할 경우
function* tableoutSaga() {
    try {
        yield call(tableAPI.tableout); // logout API 호출
        localStorage.removeItem('tableCalendar'); // localStorage에서 user를 제거
    } catch (e) {
        console.log(e);
    }
}
//비밀번호 실패시
function checkFailureSaga() {
    try{
        localStorage.removeItem('tableCalendar'); // localStorage에서 user를 제거
    }catch(e){
        console.log('localStorage is not working');
    }
}

export function* tablesSaga() {
    yield takeLatest(WRITE_TABLE, writeTableSaga);
    yield takeLatest(LIST_TABLE, listTableSage);
    yield takeLatest(CHECK_TABLE, checkSaga);
    yield takeLatest(CHECK_TABLE_FAILURE, checkFailureSaga);
    yield takeLatest(TABLE_OUT, tableoutSaga);
    yield takeLatest(DELETE_TABLE, deleteTableSage);
}

export interface TableState {
    table: {
        title: any;
        body: any;
        password: any;
        users: any[];
    };
    tableList: getTableListDB[]|null;
    lastPage: number;
    tableFlag: boolean;
    tableError: any|null;
    tableCalendar: any|null;
    checkError: any|null;
}

const initialState:TableState = {
    table: {
        title: '',
        body: '',
        password: '',
        users: [],
    }, //수정 화면 시
    tableList: null,
    lastPage: 1,
    tableFlag: false,
    tableError: null,
    tableCalendar: null, //비밀번호 체크
    checkError: null,
};

const tables = handleActions<TableState, any>(
    {   
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [TEMP_SET_TABLE] : (state, { payload: tableCalendar }) => ({
            ...state,
            tableCalendar,
        }),
        [CHANGE_FINELD] : (state, { payload: { key, value}}) => 
        produce(state, draft => {
            if(key === 'title') draft.table.title = value;
            if(key === 'body') draft.table.body = value;
            if(key === 'password') draft.table.password = value;
        }),
        //글쓰기 작성 성공
        [WRITE_TABLE_SUCCESS] : (state) => ({
            ...state,
            tableFlag: true,
        }),
        [WRITE_TABLE_FAILURE] : (state, { payload: tableError }) => ({
            ...state,
            tableError
        }),
        //목록 성공
        [LIST_TABLE_SUCCESS] : (state, {payload: tableList}) => ({
            ...state,
            tableList: tableList,
            lastPage: 1, //문자열을 숫자열로 변환
            tableFlag: false,
        }),
        [LIST_TABLE_FAILURE] : (state, { payload: tableError }) => ({
            ...state,
            tableError
        }),
        [CHECK_TABLE_SUCCESS] : (state, { payload: tableCalendar }) => ({
            ...state,
            tableCalendar,
            checkError: null
        }),
        [CHECK_TABLE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            tableEheck: null,
            checkError: error,
        }),
        [TABLE_OUT] : state => ({
            ...state,
            tableCalendar: null
        }),
        [DELETE_TABLE_SUCCESS] : (state) => ({
            ...state,
            tableFlag: true,
        }),
        [DELETE_TABLE_FAILURE] : (state, { payload: tableError, error }) => ({
            ...state,
            tableError
        }),
    },
    initialState,
);

export default tables;