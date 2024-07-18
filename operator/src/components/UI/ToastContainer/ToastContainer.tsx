import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "#store/store";
import { removeToast } from "#store/toastSlice";

import Toast from "../Toast/Toast";

import "./ToastContainer.scss";

const ToastContainer: React.FC = () => {
    const toasts = useSelector((state: RootState) => state.toast.toasts);
    const dispatch = useDispatch();

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    onClose={() => dispatch(removeToast(toast.id))}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
