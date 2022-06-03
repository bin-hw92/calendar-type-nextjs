import { useRouter } from "next/router";
import { KeyboardEvent, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableList from "../../components/table/TableList";
import { RootState } from "../../store/modules";
import { checkTable, deleteTable, listTable } from "../../store/modules/tables";


const TableListContainer = () => {
    const dispatch = useDispatch();
    const [tableId, setTableId] = useState('');
    const [error, setError] = useState(['','']);
    const router = useRouter();

    const { tableList, tableError, tableCalendar, checkError, loading, user, tableFlag } = useSelector(({tables, user, loading}:RootState) => ({
        tableList: tables.tableList,
        tableError: tables.tableError,
        loading: loading['table/LIST_TABLE'],
        tableCalendar: tables.tableCalendar,
        checkError: tables.checkError,
        user: user.user,
        tableFlag: tables.tableFlag,
    }));

    useEffect(() => {
        // page가 없으면 1을 기본값으로 사용
        const page = typeof router.query.page === 'string' ? parseInt(router.query.page, 10) || 1 : 1;
        dispatch(listTable(page));
    },[dispatch]);
    
    useEffect(() => {
        // 게시판 삭제 시 새로운 목록을 불러오기 위한 용
       if(tableFlag){ 
           const page =typeof router.query.page === 'string' ? parseInt(router.query.page, 10) || 1 : 1;
            dispatch(listTable(page));
        }
    },[tableFlag]);

    //비밀번호 입력 입장
    const onClick = useCallback((id:string) => {
        const eValue = document.querySelector(`#password_${id}`) as HTMLInputElement;
        setTableId(id);
        if(eValue !==null && eValue.value.trim() === '') return setError([id, '비밀번호를 입력하세요.']);
        
        dispatch(checkTable({id, password: eValue.value}));
    },[dispatch]);
    
    //비밀번호 입력
    const onKeyUp = useCallback((e:KeyboardEvent<HTMLInputElement>) => {
        const eTarget = e.target as Element;
        const eValue = e.target as HTMLInputElement;
         const id = eTarget.id.split('_')[1];
        if(e.key === 'Enter'){
            setTableId(id);
            if(eValue.value.trim() === '') return setError([id, '비밀번호를 입력하세요.']);
            dispatch(checkTable({id, password: eValue.value.trim()}));
        }
    },[dispatch]);

    //게시판 삭제
    const onDelClick = useCallback((id:string) => {
        if (window.confirm("정말 삭제합니까?")) {
            dispatch(deleteTable(id));
          }
    },[dispatch]);

    useEffect(() => {
        if(checkError){
            setError([tableId, checkError.response.status === 401? '비밀번호가 틀렸습니다.' : '시스템 에러 발생']);
        }
    },[checkError]);

    useEffect(() => {
        if(tableCalendar){
            router.replace('/page/Calendar'); //홈 화면으로 이동
            //로그인 유지
            try{
                localStorage.setItem('tableCalendar', JSON.stringify(tableCalendar));
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    },[router, tableCalendar]);


    return (
        <TableList 
            tableList={tableList}
            user={user}
            loading={loading}
            tableError={tableError}
            error={error}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onDelClick={onDelClick}
        />
    )
}

export default TableListContainer;