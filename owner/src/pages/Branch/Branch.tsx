import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Branch.scss'

import useFetching from '#hooks/useFetching';
import BranchService from '#services/BranchService';

import Loader from '#components/UI/Loader/Loader';
import InviteLink from '#components/InviteLink/InviteLink';
import StaffTable from '#components/Tables/StaffTable/StaffTable';

import IBranch from '#interfaces/IBranch';

import { OPERATOR_APP_URL } from '#utils/consts';



const Branch = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useFetching<IBranch>(
        useCallback(() => {
            if (id) {
                return BranchService.GetBranchInfo(id);
            } else {
                throw new Error("Branch ID is undefined");
            }
        }, [id])
    );

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h2>Филиал {data?.name}</h2>
            <h3>Бизнес: {data?.business_name}</h3>

            <h3>Ссылки для приглашения сотрудников</h3>

            <InviteLink 
                link={`${OPERATOR_APP_URL}invite/${data?.id}`} 
                label="Ссылка для оператора"
            />

            <h3>Сотрудники</h3>

            {id && <StaffTable
                branchID={id}
            />}
        </>
    )   
    
};

export default Branch;
