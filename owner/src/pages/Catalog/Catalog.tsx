import { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import './Catalog.scss'

import useFetching from "#hooks/useFetching";

import BusinessService from "#services/BusinessService";

import Loader from "#components/UI/Loader/Loader";

import IBusiness from "#interfaces/IBusiness";
import Option from "#interfaces/Option";

import darkSelectConfig from "#utils/darkSelectConfig";
import CategoriesTable from "#components/Tables/CategoriesTable/CategoriesTable";


const Catalog = () => {
    const {
        data: businesses,
        setData: setBusinesses,
        loading,
        error,
    } = useFetching<IBusiness[]>(BusinessService.GetMyBusinesses);

    const [businessOptions, setBusinessOptions] = useState<Option[]>([])
    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null)

    useEffect(() => {
        if (businesses) {
            const options = businesses.map(business => ({
                value: business.id,
                label: business.name
            }));
            setBusinessOptions(options);
        }
    }, [businesses]);

    const handleBusinessChange = (option: SingleValue<Option>) => {
        if (option) {
            const business = businesses?.find(b => b.id === option.value)
            setTargetBusiness(business ? business : null);
        } else {
            setTargetBusiness(null);
        }
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h2>Каталог</h2>

            <Select
                options={businessOptions}
                onChange={handleBusinessChange}
                placeholder="Выберите сеть..."
                styles={{ 
                    ...darkSelectConfig,
                    
                 }}
            />

            <h3>Категории</h3>

            {targetBusiness && <CategoriesTable 
                business={targetBusiness}
            />}
        </>
    )   
    
};

export default Catalog;
