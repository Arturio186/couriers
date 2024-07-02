import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import "./BusinessesList.scss";

import { addToast } from "#store/toastSlice";

import BusinessService from "#services/BusinessService";

import BusinessCard from "#components/BusinessCard/BusinessCard";
import Modal from "#components/UI/Modal/Modal";



import IBusiness from "#interfaces/IBusiness";
import EditBusinessForm from "#components/Forms/EditBusinessForm/EditBusinessForm";


interface BusinessesListProps {
    businesses: IBusiness[] | null;
    setBusinesses: React.Dispatch<React.SetStateAction<IBusiness[] | null>>;
}

const BusinessesList : FC<BusinessesListProps> = ({
    businesses,
    setBusinesses
}) => {
    const [deletingBusinessID, setDeletingBusinessID] = useState<string>('')
    const [businessEditModal, setBusinessEditModal] = useState<boolean>(false);
    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null)
    const dispatch = useDispatch()

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

                    dispatch(addToast("Сеть успешно удален"))
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
                {targetBusiness && 
                    <EditBusinessForm
                        business={targetBusiness}
                        setBusinesses={setBusinesses}
                        setModalVisible={setBusinessEditModal}
                    />
                }
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
        </>
    );
};

export default BusinessesList;
