import React from "react";
import "./AuthButton.scss";

interface AuthButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AuthButton: React.FC<AuthButtonProps> = ({ children, ...rest }) => {
    return (
        <button {...rest} type="submit" className="auth__button">
            {children}
        </button>
    );
};

export default AuthButton;
