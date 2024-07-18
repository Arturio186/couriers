import React, { FC, useState, useEffect } from "react";

import Select, { SingleValue } from "react-select";
import useFetching from "#hooks/useFetching";
import BusinessService from "#services/BusinessService";
import Loader from "#components/UI/Loader/Loader";
import darkSelectConfig from "#utils/darkSelectConfig";
import IBusiness from "#interfaces/IBusiness";
import Option from "#interfaces/Option";

interface BusinessesSelectProps {
    targetBusiness: IBusiness | null;
    setTargetBusiness: React.Dispatch<React.SetStateAction<IBusiness | null>>;
}

const BusinessesSelect: FC<BusinessesSelectProps> = ({ targetBusiness, setTargetBusiness }) => {
    const [businessesOptions, setBusinessesOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const {
        data: businesses,
        loading,
        error,
    } = useFetching<IBusiness[]>(BusinessService.GetMyBusinesses);

    useEffect(() => {
        if (businesses) {
            const newOptions = businesses.map((business) => {
                return {
                    value: business.id.toString(),
                    label: business.name,
                };
            });

            setBusinessesOptions(newOptions);
        }
    }, [businesses]);

    useEffect(() => {
        if (targetBusiness !== null) {
            const currentBusinessOption = businessesOptions.find(
                option => option.value === targetBusiness.id
            );
    
            setSelectedOption(currentBusinessOption || null);
        }
       
    }, [targetBusiness, businessesOptions]);

    const handleChangeBusiness = (option: SingleValue<Option>) => {
        const business = businesses?.find((b) => b.id === option?.value);

        if (business) {
            setTargetBusiness(business);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Select
            value={selectedOption}
            options={businessesOptions}
            onChange={(selectedOption) => handleChangeBusiness(selectedOption)}
            placeholder="Выберите бизнес..."
            styles={darkSelectConfig}
        />
    );
};

export default BusinessesSelect;
