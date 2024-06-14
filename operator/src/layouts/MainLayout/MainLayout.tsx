import { FC } from "react";
import { Outlet } from "react-router-dom";

import { privateRoutes } from "#routes/routes";

import useDocumentTitle from "#hooks/useDocumentTitle";

const MainLayout: FC = () => {
    useDocumentTitle(privateRoutes);

    return (
        <>
            <div>MainLayout</div>
            <Outlet />
        </>
    );
};

export default MainLayout;
