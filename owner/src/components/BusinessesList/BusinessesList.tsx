import { FC, useState } from "react";
import "./BusinessesList.scss";

import useFetching from "#hooks/useFetching";

import BusinessService from "#services/BusinessService";

import BusinessCard from "#components/BusinessCard/BusinessCard";
import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";

interface BusinessesListProps {
    setBusinessEditModal: React.Dispatch<React.SetStateAction<boolean>>
    setTargetBusiness: React.Dispatch<React.SetStateAction<IBusiness | null>>
}

const BusinessesList : FC<BusinessesListProps> = ({ setBusinessEditModal, setTargetBusiness }) => {
    const {
        data: businesses,
        setData: setBusinesses,
        loading,
        error,
    } = useFetching<IBusiness[]>(BusinessService.GetMyBusinesses);

    const [deletingBusinessID, setDeletingBusinessID] = useState<string>('')

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
            </div>}
        </>
    );
};

export default BusinessesList;
