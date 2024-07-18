import { useEffect, useState } from "react";

import IBusiness from "#interfaces/IBusiness";

import BusinessesSelect from "#components/BusinessesSelect/BusinessesSelect";
import SalesStatistic from "#components/SalesStatistic/SalesStatistic";

const Statistic = () => {
    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null);

    useEffect(() => {
        if (targetBusiness !== null) {
            console.log(targetBusiness.id);
        }
    }, [targetBusiness]);

    return (
        <>
            <h2>Статистика</h2>

            <BusinessesSelect
                targetBusiness={targetBusiness}
                setTargetBusiness={setTargetBusiness}
            />

            {targetBusiness !== null && (
                <>
                    <SalesStatistic
                        business={targetBusiness}
                    />
                </>
            )}
        </>
    );
};

export default Statistic;
