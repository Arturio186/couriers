import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

import BusinessService from "#services/BusinessService";
import useFetching from "#hooks/useFetching";
import IBusiness from "#interfaces/IBusiness";
import Loader from "#components/UI/Loader/Loader";

const Business = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: business,
        loading,
        error,
    } = useFetching<IBusiness>(BusinessService.GetBusiness(id ? id : ''));

    useEffect(() => {
        if (business) {
            document.title = `Сеть "${business.name}"`;
        } else {
            document.title = 'Загрузка...';
        }

        return () => {
            document.title = 'Couriers'; // Установите заголовок по умолчанию, если нужно
        };
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
            <p>ID бизнеса: {business?.id}</p>
            <p>Название: {business?.name}</p>
        </div>
    );
};

export default Business;
