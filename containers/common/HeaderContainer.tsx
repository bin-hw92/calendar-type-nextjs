import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/common/Header";
import { RootState } from "../../store/modules";
import { logout } from "../../store/modules/user"


const HeaderContainer = () => {
    const [userLogin, setUserLogin] = useState(['','']);
    const { user } = useSelector(({user}:RootState) => ({user: user.user}));
    const dispatch = useDispatch();
    const router = useRouter();

    const onLogout = () => {
        if(!user){
            router.replace('/page/login'); //홈 화면으로 이동
        }else{
            dispatch(logout());
        }
    }

    useEffect(() => {
        if(!user){
            setUserLogin(['', '로그인']);
            router.replace('/'); //홈 화면으로 이동
            return;
        }
        setUserLogin([user.username, '로그아웃']);
    },[router, user]);

    return <Header userLogin={userLogin} onLogout={onLogout}/>
}

export default HeaderContainer;