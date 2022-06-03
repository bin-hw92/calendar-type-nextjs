import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";


//주별, 월별 변경될 때마다 실행 되고 List 컨데이너 호출용
const CalendarFormContainer = ({children}:any) => {
    const [childrenForm, setChildrenForm] = useState<any>([]);
    const { viewForm } = useSelector(({ form }:RootState) => ({
        viewForm: form.viewForm,
    }));

    useEffect(() => {
        setChildrenForm(children[viewForm]);
    }, [viewForm]);

    return childrenForm;
}

export default CalendarFormContainer;