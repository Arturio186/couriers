import React from "react";

import classes from "./Modal.module.scss";

interface ModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ children, visible, setVisible }) => {
    const rootClasses = [classes.modal];

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div
            className={rootClasses.join(" ")}
            onClick={() => setVisible(false)}
        >
            <div
                className={classes.modalContent}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className={classes.close}
                    onClick={() => setVisible(false)}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
