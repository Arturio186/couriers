import { useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

import BusinessService from "#services/BusinessService";
import useFetching from "#hooks/useFetching";
import Loader from "#components/UI/Loader/Loader";
import IBusinessWithBranches from "#interfaces/IBusinessWithBranches";
import BranchTable from "#components/Tables/BranchTable/BranchTable";
import CoolButton from "#components/UI/CoolButton/CoolButton";

const Business = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useFetching<IBusinessWithBranches>(
        useCallback(() => BusinessService.GetBusiness(id ? id : ""), [id])
    );

    useEffect(() => {
        if (data) {
            document.title = `Сеть ${data.business.name}`;

            console.log(data)
        } else {
            document.title = 'Загрузка...';
        }
    }, [data]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <>
            <h1>{data?.business.name}</h1>

            <h3 className="table__title">Филиалы</h3>

            <CoolButton>Добавить филиал</CoolButton>

            <BranchTable branches={data?.branches} />
        </>
    );
};

export default Business;
