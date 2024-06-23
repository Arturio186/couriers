import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";

import { privateRoutes } from "#routes/routes";
import useDocumentTitle from "#hooks/useDocumentTitle";

import SideBar from "#components/UI/SideBar/SideBar";

const MainLayout: FC = () => {
    useDocumentTitle(privateRoutes);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className={`main-content ${isOpen ? "shifted" : ""}`}>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
