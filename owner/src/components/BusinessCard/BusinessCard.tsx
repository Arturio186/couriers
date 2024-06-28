import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessCard.scss';

import IBusiness from '#interfaces/IBusiness';

import { BUSINESSES_ROUTE } from '#utils/consts';
import CoolButton from '#components/UI/CoolButton/CoolButton';
import Loader from '#components/UI/Loader/Loader';

interface BusinessCardProps {
    business: IBusiness;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onEdit, onDelete, isDeleting }) => {
    return (
        <div className="business-card">
            <Link to={`${BUSINESSES_ROUTE}/${business.id}`} className="business-card__title-link">
                <h3 className="business-card__title">{business.name}</h3>
            </Link>
            {isDeleting ? <Loader /> :
                <div className="business-card__actions">
                    <CoolButton onClick={onEdit}>Изменить</CoolButton>
                    <CoolButton onClick={onDelete}>Удалить</CoolButton>
                </div>
            }
        </div>
    );
};

export default BusinessCard;
