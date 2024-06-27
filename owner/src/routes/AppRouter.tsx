import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "#store/store";
import { checkAuth } from "#store/userSlice";

import AuthRouter from "./AuthRouter";
import GuestRouter from "./GuestRouter";
import Loader from "#components/UI/Loader/Loader";

const AppRouter: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const [isFirstInit, setIsFirstInit] = useState<boolean>(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }

        setIsFirstInit(false)
    }, [])


    if (user.isLoading || isFirstInit) {
        return <Loader />
    }

    return user.isAuth ? <AuthRouter /> : <GuestRouter />;
};

export default AppRouter;
