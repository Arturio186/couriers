import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";

import { RootState } from "#store/store";

import useDocumentTitle from "#hooks/useDocumentTitle";

import SideBar from "#components/UI/SideBar/SideBar";
import ToastContainer from "#components/UI/ToastContainer/ToastContainer";

import { privateRoutes } from "#routes/routes";

import { DASHBOARD_ROUTE } from "#utils/consts";

const MainLayout: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useDocumentTitle(privateRoutes);

    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`main-content ${isOpen ? "shifted" : ""}`}>
                {user.currentBranch || location.pathname === DASHBOARD_ROUTE  || location.pathname.indexOf('invite') !== -1 ? (
                    <Outlet />
                ) : (
                    <p className="message">Необходимо выбрать филиал</p>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default MainLayout;
