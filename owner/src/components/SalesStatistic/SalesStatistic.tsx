import { FC, useState, useCallback, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './SalesStatistic.scss'

import getStatisticColor from "#utils/getStatisticColor";

import useFetching from "#hooks/useFetching";
import BusinessService from "#services/BusinessService";
import IBranchSales from "#interfaces/IBranchSales";
import IBusiness from "#interfaces/IBusiness";
import Loader from "#components/UI/Loader/Loader";

interface SalesStatisticProps {
    business: IBusiness;
}

const SalesStatistic: FC<SalesStatisticProps> = ({ business }) => {
    const { data, loading, error } = useFetching<IBranchSales[]>(
        useCallback(
            () => BusinessService.GetSalesStatistic(business.id),
            [business]
        )
    );

    const [sales, setSales] = useState<IBranchSales[]>([]);

    useEffect(() => {
        if (data) {
            setSales(data);
        }
    }, [data]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (sales.length === 0) {
        return <div>Нет данных по продажам</div>
    }

    return (
        <div className="totals__statistic">
            <div>
                <h3>Общая сумма продаж по филиалам</h3>
                <ResponsiveContainer width={400} height={300}>
                    <PieChart>
                        <Pie
                            data={sales}
                            dataKey="total_money"
                            nameKey="branch_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {sales.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getStatisticColor(index)}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3>Общее количество продаж по филиалам</h3>
                <ResponsiveContainer width={400} height={300}>
                    <PieChart>
                        <Pie
                            data={sales}
                            dataKey="total_sales"
                            nameKey="branch_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#82ca9d"
                            label
                        >
                            {sales.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getStatisticColor(index)}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3>Общее количество заказов по филиалам</h3>
                <ResponsiveContainer width={400} height={300}>
                    <PieChart>
                        <Pie
                            data={sales}
                            dataKey="total_orders"
                            nameKey="branch_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#82ca9d"
                            label
                        >
                            {sales.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getStatisticColor(index)}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesStatistic;
