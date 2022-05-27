import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

// action types
const INITIALIZE = 'form/INITIALIZE' as const;
const CHANGE_FORM = 'form/CHANGE_FORM' as const;

// initial state
export interface FormState {
    viewForm: number;
}

const initialState: FormState = {
  viewForm: 0,
};


export const changeForm = createAction(CHANGE_FORM, ({ key, value}:any) => ({
    key,
    value
}));

// Reducer
// eslint-disable-next-line

const form = handleActions<FormState, any>(
    {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FORM] : (state, { payload: { key, value} }) => 
        produce(state, draft => {
               if(key === 'viewForm') draft.viewForm = value;
        }),
    },
    initialState,
 );
 
 export default form;