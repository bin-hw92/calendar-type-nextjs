import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WriteTable from "../../components/write/WriteTable";
import { RootState } from "../../store/modules";
import { changeField, initialize, writeTable, } from "../../store/modules/tables";

const WriteTableContainer = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState([0, '']);
    const { table, tableFlag } = useSelector(({tables, user}:RootState) => ({
        table: tables.table,
        tableFlag: tables.tableFlag,
        tableError: tables.tableError,
        user: user.user
    }));

    const router = useRouter();

    //인풋 변경 이벤트 핸들러
    const onChange = (e:any) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'table',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = (e:any) => {
        e.preventDefault();
        const { title, password, body, users} = table;
        if(title === ''){
            setError([1, '제목을 입력하세요.']);
            return;
        }
        if(password === ''){
            setError([2,'비밀번호를 입력하세요.']);
            return;
        }
        if(body === ''){
            setError([3,'설명을 입력하세요.']);
            return;
        }
        dispatch(writeTable({title, password, body, users}));
    };

    const onCancel = () => {
        router.replace('/page/TableList');
    }

    useEffect(() => {
        return () => { // 언마운트될 때 초기화
            dispatch(initialize());
        };
    }, [dispatch]);

    useEffect(() => {
        if(tableFlag){
            dispatch(initialize());
            router.replace('/page/TableList');
        }
    },[dispatch, router, tableFlag]);

    return (
        <WriteTable  
            table={table}
            error={error}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
}

export default WriteTableContainer;