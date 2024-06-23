import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "#store/store";
import { checkAuth } from "#store/userSlice";

import AuthRouter from "./AuthRouter";
import GuestRouter from "./GuestRouter";

const AppRouter: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    if (user.isLoading) {
        return <div>Загрузка...</div>
    }

    return user.isAuth ? <AuthRouter /> : <GuestRouter />;
};

export default AppRouter;
