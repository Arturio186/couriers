import { FC } from "react";
import { Outlet } from "react-router-dom";

import "./AuthenticationLayout.scss";

const AuthenticationLayout: FC = () => {
    return (
        <div className="page">
            <Outlet />
        </div>
    );
};

export default AuthenticationLayout;
