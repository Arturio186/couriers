import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import "./AuthBox.scss";

interface AuthBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

const AuthBox: React.FC<AuthBoxProps> = ({
    label,
    register,
    error,
    ...rest
}) => {

    const inputID = uuidv4();

    return (
        <div>
            <div className={`auth__box ${error ? "auth__box-error" : ""}`}>
                <div className="auth__box-group">
                    <input
                        {...rest}
                        {...register}
                        className="auth__box-input"
                        placeholder=""
                        id={inputID}
                    />
                    <label htmlFor={inputID} className="auth__box-label">
                        {label}
                    </label>
                </div>
            </div>
            {error && <p className="error__message">{error.message}</p>}
        </div>
    );
};

export default AuthBox;
