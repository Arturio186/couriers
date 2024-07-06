import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";

import { privateRoutes } from "#routes/routes";
import useDocumentTitle from "#hooks/useDocumentTitle";

import SideBar from "#components/UI/SideBar/SideBar";
import ToastContainer from "#components/UI/ToastContainer/ToastContainer";

const MainLayout: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    useDocumentTitle(privateRoutes);

    return (
        <>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`main-content ${isOpen ? "shifted" : ""}`}>
                <Outlet />
            </div>
            <ToastContainer />
        </>
    );
};

export default MainLayout;
