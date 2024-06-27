import React from "react";
import "./CoolButton.scss";

interface CoolButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CoolButton: React.FC<CoolButtonProps> = ({ children, ...rest }) => {
    return (
        <button {...rest} className="cool__button">
            {children}
        </button>
    );
};

export default CoolButton;
