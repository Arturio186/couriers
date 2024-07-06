import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import "./ProfileInput.scss";

interface ProfileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
    label,
    placeholder,
    register,
    error,
    ...rest
}) => {

    const inputID = uuidv4();

    return (
        <div>
            <div className={`profile__input ${error ? "profile__input-error" : ""}`}>
                <div className="profile__input-group">
                    <label htmlFor={inputID} className="profile__input-label">
                        {label}
                    </label>

                    <input
                        {...rest}
                        {...register}
                        className="profile__input-input"
                        placeholder={placeholder}
                        id={inputID}
                    />
                </div>
            </div>
            {error && <p className="error__message">{error.message}</p>}
        </div>
    );
};

export default ProfileInput;
