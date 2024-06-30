import { useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

import BusinessService from "#services/BusinessService";
import useFetching from "#hooks/useFetching";
import IBusiness from "#interfaces/IBusiness";
import Loader from "#components/UI/Loader/Loader";

const Business = () => {
    const { id } = useParams<{ id: string }>();

    const { data: business, loading, error } = useFetching<IBusiness>(
        useCallback(() => BusinessService.GetBusiness(id ? id : ""), [id])
    );

    useEffect(() => {
        if (business) {
            document.title = `Сеть ${business.name}`;
        } else {
            document.title = 'Загрузка...';
        }
    }, [business]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <div>
            <h1>Информация о бизнесе</h1>
            <p>Название: {business?.name}</p>
        </div>
    );
};

export default Business;
