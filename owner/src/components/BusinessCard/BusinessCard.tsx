import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessCard.scss';

import IBusiness from '#interfaces/IBusiness';

import { BUSINESSES_ROUTE } from '#utils/consts';

interface BusinessCardProps {
    business: IBusiness;
    onEdit: () => void;
    onDelete: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onEdit, onDelete }) => {
    return (
        <div className="business-card">
            <Link to={`${BUSINESSES_ROUTE}/${business.id}`} className="business-card__title-link">
                <h3 className="business-card__title">{business.name}</h3>
            </Link>
            <div className="business-card__actions">
                <button className="business-card__button" onClick={onEdit}>Изменить</button>
                <button className="business-card__button" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    );
};

export default BusinessCard;
