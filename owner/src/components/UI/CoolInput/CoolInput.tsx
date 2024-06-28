import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import "./CoolInput.scss";

interface CoolInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

const CoolInput: React.FC<CoolInputProps> = ({
    label,
    register,
    error,
    ...rest
}) => {

    const inputID = uuidv4();

    return (
        <div>
            <div className={`cool__input ${error ? "cool__input-error" : ""}`}>
                <div className="cool__input-group">
                    <input
                        {...rest}
                        {...register}
                        className="cool__input-input"
                        placeholder=""
                        id={inputID}
                    />
                    <label htmlFor={inputID} className="cool__input-label">
                        {label}
                    </label>
                </div>
            </div>
            {error && <p className="error__message">{error.message}</p>}
        </div>
    );
};

export default CoolInput;
