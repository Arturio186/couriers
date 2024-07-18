import "./TotalInfo.scss";

import BusinessService from "#services/BusinessService";

import useFetching from "#hooks/useFetching";

import Loader from "#components/UI/Loader/Loader";

import IBusinessesStats from "#interfaces/IBusinesseseStats";

const TotalInfo = () => {
    const { data, loading, error } = useFetching<IBusinessesStats>(
        BusinessService.GetBusinessesStatistic
    );

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="total-info">
            {data !== null && (
                <>
                    <div className="info-block">
                        <span className="label">Выручка за всё время</span>
                        <span className="value">{Number(data.total_money) || 0} ₽</span>
                    </div>
                    <div className="info-block">
                        <span className="label">Количество заказов</span>
                        <span className="value">{Number(data.total_orders) || 0}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default TotalInfo;
