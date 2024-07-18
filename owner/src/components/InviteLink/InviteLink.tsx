import React from "react";
import { useDispatch } from "react-redux";
import "./InviteLink.scss";

import { addToast } from "#store/toastSlice";

import CoolButton from "#components/UI/CoolButton/CoolButton";

interface InviteLinkProps {
    link: string;
    label: string;
}

const InviteLink: React.FC<InviteLinkProps> = ({ link, label }) => {
    const dispatch = useDispatch();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            dispatch(addToast("Ссылка скопирована в буфер обмена"));
        } catch (err) {
            dispatch(addToast("Ошибка при копировании ссылки в буфер обмена"));
        }
    };

    return (
        <div className="invite-link-container">
            <label className="invite-link-label">{label}</label>
            <input
                className="invite-link-input"
                type="text"
                value={link}
                readOnly
            />
            <CoolButton onClick={copyToClipboard}>Скопировать</CoolButton>
        </div>
    );
};

export default InviteLink;
