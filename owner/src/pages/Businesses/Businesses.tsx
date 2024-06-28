import { useState } from "react";
import "./Businesses.scss";

import useFetching from "#hooks/useFetching";

import CreateBusinessForm from "#components/Forms/CreateBusinessForm/CreateBusinessForm";
import BusinessesList from "#components/BusinessesList/BusinessesList";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Modal from "#components/UI/Modal/Modal";

import BusinessService from "#services/BusinessService";

import IBusiness from "#interfaces/IBusiness";


const Businesses = () => {
    const [businessCreateModal, setBusinessCreateModal] =
        useState<boolean>(false);

    const {
        data: businesses,
        setData: setBusinesses,
        loading,
        error,
    } = useFetching<IBusiness[]>(BusinessService.GetMyBusinesses);

    return (
        <>
            <Modal
                visible={businessCreateModal}
                setVisible={setBusinessCreateModal}
            >
                <CreateBusinessForm 
                    setModalVisible={setBusinessCreateModal}
                    setBusinesses={setBusinesses}
                />
            </Modal>

            <h2>Ваши сети</h2>

            <CoolButton onClick={() => setBusinessCreateModal(true)}>
                Создать бизнес
            </CoolButton>

            <BusinessesList
                businesses={businesses}
                setBusinesses={setBusinesses}
                loading={loading}
                error={error}
            />
        </>
    );
};

export default Businesses;
