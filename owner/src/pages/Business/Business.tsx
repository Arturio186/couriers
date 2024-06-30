import { useEffect, useCallback, useState } from "react";
import { useParams } from 'react-router-dom';
import './Business.scss'

import BusinessService from "#services/BusinessService";
import useFetching from "#hooks/useFetching";

import IBusinessWithBranches from "#interfaces/IBusinessWithBranches";

import Loader from "#components/UI/Loader/Loader";
import BranchTable from "#components/Tables/BranchTable/BranchTable";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Modal from "#components/UI/Modal/Modal";
import CreateBranchForm from "#components/Forms/CreateBranchForm/CreateBranchForm";

const Business = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useFetching<IBusinessWithBranches>(
        useCallback(() => BusinessService.GetBusiness(id ? id : ""), [id])
    );

    const [branchCreateModal, setBranchCreateModal] = useState<boolean>(false);

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
            <Modal
                visible={branchCreateModal}
                setVisible={setBranchCreateModal}
            >
                <CreateBranchForm
                    setModalVisible={setBranchCreateModal}
                />
            </Modal>

            <h1>{data?.business.name}</h1>

            <h3 className="table__title">Филиалы</h3>

            <CoolButton onClick={() => setBranchCreateModal(true)}>Добавить филиал</CoolButton>

            <BranchTable branches={data?.branches} />
        </>
    );
};

export default Business;
