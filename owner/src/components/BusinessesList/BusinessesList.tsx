
import "./BusinessesList.scss";

import useFetching from "#hooks/useFetching";

import BusinessService from "#services/BusinessService";

import BusinessCard from "#components/BusinessCard/BusinessCard";
import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";


const BusinessesList = () => {
    const {
        data: businesses,
        loading,
        error,
        refetch,
    } = useFetching<IBusiness[]>(BusinessService.GetMyBusinesses());

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleEdit = (id: string) => {
        console.log(`Edit business with id ${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await BusinessService.DeleteBusiness(id);
            refetch(); 
        } catch (error) {
            console.error('Failed to delete business', error);
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
                        onEdit={() => handleEdit(business.id)}
                        onDelete={() => handleDelete(business.id)}
                    />
                ))}
            </div>}
            
        </>
    );
};

export default BusinessesList;
