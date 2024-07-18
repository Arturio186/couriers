import { useState } from "react";

import IBusiness from "#interfaces/IBusiness";
import BusinessesSelect from "#components/BusinessesSelect/BusinessesSelect";

const Statistic = () => {
    const [targetBusiness, setTargetBusiness] = useState<IBusiness | null>(null)

    return (
        <>
            <h2>Статистика</h2>

            <BusinessesSelect
                targetBusiness={targetBusiness}
                setTargetBusiness={setTargetBusiness}
            />

            {targetBusiness !== null && 
                <>
                    {targetBusiness.name}
                </>
            }
        </>
    )
};

export default Statistic;
