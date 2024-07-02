import React, { useEffect } from 'react';
import './Toast.scss';

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast">
            <div className="toast-content">
                <span className="toast-message">{message}</span>
                <button className="toast-close" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Toast;
