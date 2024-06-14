import React from "react";

import "./AuthBox.scss";

interface AuthBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const AuthBox: React.FC<AuthBoxProps> = ({ label, ...rest }) => {
    return (
        <div className="auth__box">
            <div className="auth__box-group">
                <input
                    {...rest}
                    className="auth__box-input"
                    placeholder=""
                    id="login-email"
                />
                <label htmlFor="login-email" className="auth__box-label">
                    {label}
                </label>
            </div>
        </div>
    );
};

export default AuthBox;
