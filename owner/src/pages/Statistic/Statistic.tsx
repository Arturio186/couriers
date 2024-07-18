import { useEffect, useState } from "react";

import IBusiness from "#interfaces/IBusiness";

import BusinessesSelect from "#components/BusinessesSelect/BusinessesSelect";
import SalesStatistic from "#components/SalesStatistic/SalesStatistic";
import TotalInfo from "#components/TotalInfo/TotalInfo";
import OrdersStatistic from "#components/OrdersStatistic/OrdersStatistic";

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

            <TotalInfo />

            <BusinessesSelect
                targetBusiness={targetBusiness}
                setTargetBusiness={setTargetBusiness}
            />

            {targetBusiness !== null ? (
                <>
                    <SalesStatistic
                        business={targetBusiness}
                    />
                    <OrdersStatistic />
                </>
            ) :
            <p className="message">Для более подробной статистике выберите филиал</p>}
        </>
    );
};

export default Statistic;
