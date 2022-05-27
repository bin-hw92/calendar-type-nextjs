import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";

const CHANGE_FINELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER',);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN',);

export const changeField = createAction(
    CHANGE_FINELD,
    ({ form, key, value }:any) => ({
        form, // register, login
        key, // username, password, passwordConfirm
        value, // 실제 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form:any) => form); // register / login

export const register = createAction(REGISTER, ({ username, password}:any) => ({
    username,
    password,
}));

export const login = createAction(LOGIN, ({ username, password}:any) => ({
    username,
    password
}));

//사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga(){
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

// initial state
export interface AuthState {
    register: {
        username: string;
        password: string;
        passwordConfirm: string;
    };
    login: {
        username: string;
        password: string;
    };
    auth: any|null;
    authError: any|null;
}

const initalState:AuthState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions<AuthState, any>(
   {
       [CHANGE_FINELD] : (state, { payload: {form, key, value} }) => 
       produce(state, draft => {
            if(form === 'register'){
                if(key === 'username') draft.register.username = value;
                if(key === 'password') draft.register.password = value;
                if(key === 'passwordConfirm') draft.register.passwordConfirm = value;
            }
            if(form === 'login'){
                if(key === 'username') draft.login.username = value;
                if(key === 'password') draft.login.password = value;
            }
       }),
       [INITIALIZE_FORM] : (state, { payload: form}) => ({
            ...state,
            [form] : form === 'register'? initalState.register : form === 'login'? initalState.login : '',
            authError: null, //폼 전환 시 회원 인증 에러 초기화
       }),
       // 회원가입 성공
       [REGISTER_SUCCESS] : (state, { payload: auth}) => ({
           ...state,
            authError: null,
            auth,
       }),
       // 회원가입 실패
       [REGISTER_FAILURE] : (state, { payload: error }) => ({
            ...state,
            authError: error,
       }),
       // 로그인 성공
       [LOGIN_SUCCESS] : (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
       }),
       // 로그인 실패
       [LOGIN_FAILURE] : (state, { payload: error }) => ({
            ...state,
            authError: error,
       }),
   },
   initalState,
);

export default auth;
