import { FC, useState } from "react";
import "./BusinessesList.scss";



import BusinessService from "#services/BusinessService";

import BusinessCard from "#components/BusinessCard/BusinessCard";
import Loader from "#components/UI/Loader/Loader";
import Modal from "#components/UI/Modal/Modal";
import Toast from "#components/UI/Toast/Toast";

import IBusiness from "#interfaces/IBusiness";

interface BusinessesListProps {
    businesses: IBusiness[] | null;
    setBusinesses: React.Dispatch<React.SetStateAction<IBusiness[] | null>>;
    loading: boolean;
    error: string | null;

}

const BusinessesList : FC<BusinessesListProps> = ({
    businesses,
    setBusinesses,
    loading,
    error
}) => {
    const [deletingBusinessID, setDeletingBusinessID] = useState<string>('')
    const [businessEditModal, setBusinessEditModal] = useState<boolean>(false);
    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null)
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleEdit = (business: IBusiness) => {
        setTargetBusiness(business)
        setBusinessEditModal(true)
    };

    const handleDelete = async (id: string) => {
        try {
            if (deletingBusinessID !== '') {
                return
            }

            if (confirm("Вы уверены, что хотите удалить сеть?")) {
                setDeletingBusinessID(id)
                const response = await BusinessService.DeleteBusiness(id);

                if (response.status === 200) {
                    setBusinesses(prevBusinesses => {
                        if (!prevBusinesses)
                            return null

                        return prevBusinesses?.filter(b => b.id !== id)
                    })
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении ', error);
        } finally {
            setDeletingBusinessID('')
        }
    };
    
    return (
        <>
            <Modal
                visible={businessEditModal}
                setVisible={setBusinessEditModal}
            >
                {targetBusiness && <p className="message">Изменение бизнеса {targetBusiness.id}</p>}
            </Modal>
            {businesses?.length == 0 && <p className="message">Нет ни одной сети</p>}
            {businesses && <div className="businesses-list">
                {businesses.map((business) => (
                    <BusinessCard
                        key={business.id}
                        business={business}
                        onEdit={() => handleEdit(business)}
                        onDelete={() => handleDelete(business.id)}
                        isDeleting={deletingBusinessID === business.id}
                    />
                ))}
            </div>
            }
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            )}
        </>
    );
};

export default BusinessesList;
