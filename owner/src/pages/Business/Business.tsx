import { useEffect, useCallback, useState } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

import BusinessService from "#services/BusinessService";

import useFetching from "#hooks/useFetching";

import CreateBranchForm from "#components/Forms/CreateBranchForm/CreateBranchForm";
import BranchTable from "#components/Tables/BranchTable/BranchTable";
import Loader from "#components/UI/Loader/Loader";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Modal from "#components/UI/Modal/Modal";

import IBusiness from "#interfaces/IBusiness";
import IBranch from "#interfaces/IBranch";

const Business = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useFetching<IBusiness>(
        useCallback(() => BusinessService.GetBusiness(id ? id : ""), [id])
    );

    const [branchCreateModal, setBranchCreateModal] = useState<boolean>(false);
    const [branches, setBranches] = useState<IBranch[]>([])

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
                    business={data}
                    setBranches={setBranches}
                    setModalVisible={setBranchCreateModal}
                />}
            </Modal>

            {data && <h1>{data.name}</h1>}

            <h3>Филиалы</h3>

            <CoolButton onClick={() => setBranchCreateModal(true)}>Добавить филиал</CoolButton>

            {data && <BranchTable
                business={data}
                branches={branches}
                setBranches={setBranches}
            />}
        </>
    );
};

export default Business;
