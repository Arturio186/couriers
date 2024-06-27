import React from 'react';
import IBusiness from '#interfaces/IBusiness';
import './BusinessCard.scss';

interface BusinessCardProps {
    business: IBusiness;
    onEdit: () => void;
    onDelete: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onEdit, onDelete }) => {
    return (
        <div className="business-card">
            <h3 className="business-card__title">{business.name}</h3>
            <div className="business-card__actions">
                <button className="business-card__button" onClick={onEdit}>Изменить</button>
                <button className="business-card__button" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    );
};

export default BusinessCard;
