import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga'; // redux-saga를 생성하기 위한 라이브러리
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
 
//import withReduxSaga from 'next-redux-saga'; // next와 redux-saga를 연결하기 위한 라이브러리
//생략 가능 Dependency를 최소화 하기 위해 withReduxSaga 지움.
/*
wrapper(_app.js를 감싸고 있음)로 개별 페이지의 SSR을 적용함. 
기존에 next에서 SSR 렌더링용 메서드를 4가지 정도 지원하고 있는데,
Redux랑 사용할 때는 문제가 있어서 Next-Redux-Wrapper가 제공하는 SSR 렌더링용 메서드와 
같이 사용하려 한다.
*/ 
import rootReducer from './modules';
import {rootSaga} from './modules/index'; //사가 가져옴 
import { tempSetUser, check } from './modules/user';
import { tempSetTable } from './modules/tables';
import {  } from 'redux-saga';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}

function loadUser(store:any) {
  try{
    const user = localStorage.getItem('user'); //로컬 스토리지에서 user 조회
    if(!user) return; // 로그인 상태가 아니라면 아무것도 안 함
    console.log(user);
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  }catch(e){
    console.log('USER index localStorage is not working');
  }
}

function loadTable(store:any) {
  try{
    const table = localStorage.getItem('tableCalendar'); //로컬 스토리지에서 user 조회
    if(!table) return; // 캘린더 게시판 비밀번호 성공 상태가 아니면 안 함.

    store.dispatch(tempSetTable(JSON.parse(table)));
  }catch(e){
    console.log('TABLE index localStorage is not working');
  }
}

const configureStore:MakeStore<any> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
    );

  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  
  loadUser(store);
  loadTable(store);
  
  return store;
};

const wrapper = createWrapper(configureStore);

export default wrapper;