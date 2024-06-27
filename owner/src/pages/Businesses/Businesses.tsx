import BusinessesList from "#components/BusinessesList/BusinessesList";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import Modal from "#components/UI/Modal/Modal";
import { useState } from "react";

const Businesses = () => {
    const [businessCreateModal, setBusinessCreateModal] =
        useState<boolean>(false);

    return (
        <>
            <Modal
                visible={businessCreateModal}
                setVisible={setBusinessCreateModal}
            >
                <p className="message">Hello brothers (извиняюсь!)</p>
            </Modal>

            <h2>Ваши сети</h2>

            <CoolButton onClick={() => setBusinessCreateModal(true)}>Создать бизнес</CoolButton>

            <BusinessesList />
        </>
    );
};

export default Businesses;
