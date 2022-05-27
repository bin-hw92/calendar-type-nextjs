import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AskModal from "../../components/common/AskModal";
import { RootState } from "../../store/modules";
import { changeModal } from "../../store/modules/calendar";
import { unloadCalendar } from "../../store/modules/view";


const AskModalContainer = ({children}:any) => {
    const [childrenForm, setChildrenForm] = useState<any>([]);
    const dispatch = useDispatch();
    const {modalFlag, type} = useSelector(({ calendar }:RootState) => ({
        modalFlag: calendar.modalFlag,
        type: calendar.type,
    }));

    const onClick = useCallback((e:any) => {
        const eTarget = e.target;
        if(eTarget.tagName === 'DIV' && eTarget.className === 'todo-wrap'){
            dispatch(changeModal({modalFlag:false, type:null}));
            dispatch(unloadCalendar());
        }
        if(eTarget.tagName === 'BUTTON'){
            const btnValue = eTarget.dataset.btn;
            if(btnValue === 'Y') return
            if(btnValue === 'N'){
                dispatch(unloadCalendar());
                dispatch(changeModal({modalFlag:false, type:null}));
            }
            if(btnValue === 'B') dispatch(changeModal({modalFlag:true, type:'view'}));//이전 팝업으로 백
        }
    },[dispatch]);
    
    //상황에 따라 children 보여주는 걸 다르게 하기

    useEffect(() => {
        if(type === 'wrtie') setChildrenForm(children[0]);
        if(type === 'view') setChildrenForm(children[1]);
        if(!modalFlag) setChildrenForm([]);
    },[children, type, modalFlag]);

    return (
        (modalFlag? <AskModal onClick={onClick} childrenForm={childrenForm}/> : null)
    )
};

export default AskModalContainer;