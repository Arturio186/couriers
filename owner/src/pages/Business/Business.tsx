import { useEffect, useCallback, useState } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

import BusinessService from "#services/BusinessService";
import useFetching from "#hooks/useFetching";

import IBusinessWithBranches from "#interfaces/IBusinessWithBranches";
import IBusiness from "#interfaces/IBusiness";

import CreateBranchForm from "#components/Forms/CreateBranchForm/CreateBranchForm";

import Loader from "#components/UI/Loader/Loader";
import BranchTable from "#components/Tables/BranchTable/BranchTable";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Modal from "#components/UI/Modal/Modal";

const Business = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error, refetch } = useFetching<IBusiness>(
        useCallback(() => BusinessService.GetBusiness(id ? id : ""), [id])
    );

    const [branchCreateModal, setBranchCreateModal] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            document.title = `Сеть ${data.name}`;
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
            <Modal
                visible={branchCreateModal}
                setVisible={setBranchCreateModal}
            >
                 {data && <CreateBranchForm
                    refetchBranches={refetch}
                    business={data}
                    setModalVisible={setBranchCreateModal}
                />}
            </Modal>

            {data && <h1>{data.name}</h1>}

            <h3>Филиалы</h3>

            <CoolButton onClick={() => setBranchCreateModal(true)}>Добавить филиал</CoolButton>

            {data && <BranchTable
                business={data}
                refetchBranches={refetch}
            />}
        </>
    );
};

export default Business;
