import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";


//주별, 월별 변경될 때마다 실행 되고 List 컨데이너 호출용
const CalendarFormContainer = ({children}) => {
    const [childrenForm, setChildrenForm] = useState([]);
    const { viewForm } = useSelector(({ form }) => ({
        viewForm: form.viewForm,
    }));

    useEffect(() => {
        setChildrenForm(children[viewForm]);
    }, [viewForm]);

    return childrenForm;
}

export default CalendarFormContainer;