import { FC, useEffect } from "react";
import "./Toast.scss";

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    return <div className="toast">{message}</div>;
};

export default Toast;
