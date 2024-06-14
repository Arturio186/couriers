import { FC } from "react";
import { Outlet } from "react-router-dom";

import "./AuthenticationLayout.scss";

import useDocumentTitle from "#hooks/useDocumentTitle";

import { publicRoutes } from "#routes/routes";

const AuthenticationLayout: FC = () => {
    useDocumentTitle(publicRoutes);

    return (
        <div className="page">
            <Outlet />
        </div>
    );
};

export default AuthenticationLayout;
