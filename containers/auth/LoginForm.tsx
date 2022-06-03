import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AuthForm from "../../components/auth/AuthForm";
import { RootState } from "../../store/modules";
import { changeField, initializeForm, login } from "../../store/modules/auth";
import { check } from "../../store/modules/user";

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [error, setError] = useState<string|null>(null);
    const { form, auth, authError, user } = useSelector(({auth, user}:RootState) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));


    //인풋 변경 이벤트 핸들러
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        const { username, password} = form;
        dispatch(login({username, password}));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth){
            console.log('로그인 성공');
            console.log(auth);
            dispatch(check());
        }
    },[auth, authError, dispatch]);

    useEffect(() => {
        if(user){
            console.log(user);
            // Always do navigations after the first render
            router.replace('/page/TableList');
            //로그인 유지
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    },[router, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default LoginForm;