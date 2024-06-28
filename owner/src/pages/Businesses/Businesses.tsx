import './Businesses.scss'
import BusinessesList from "#components/BusinessesList/BusinessesList";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import Modal from "#components/UI/Modal/Modal";
import { useState } from "react";
import IBusiness from '#interfaces/IBusiness';

const Businesses = () => {
    const [businessCreateModal, setBusinessCreateModal] = useState<boolean>(false);
    const [businessEditModal, setBusinessEditModal] = useState<boolean>(false);
    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null)

    return (
        <>
            <Modal
                visible={businessCreateModal}
                setVisible={setBusinessCreateModal}
            >
                <p className="message">Создание бизнеса</p>
            </Modal>

            <Modal
                visible={businessEditModal}
                setVisible={setBusinessEditModal}
            >
                {targetBusiness && <p className="message">Изменение бизнеса {targetBusiness.id}</p>}
            </Modal>

            <h2>Ваши сети</h2>

            <CoolButton onClick={() => setBusinessCreateModal(true)}>Создать бизнес</CoolButton>

            <BusinessesList 
                setBusinessEditModal={setBusinessEditModal}
                setTargetBusiness={setTargetBusiness}
            />
        </>
    );
};

export default Businesses;
