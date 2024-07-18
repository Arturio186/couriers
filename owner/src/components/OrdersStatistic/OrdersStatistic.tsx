import { FC, useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import useFetching from "#hooks/useFetching";
import OrderService from "#services/OrderService";

import Loader from "#components/UI/Loader/Loader";

import IDailyOrders from "#interfaces/IDailyOrders";
import IBusiness from "#interfaces/IBusiness";

interface OrdersStatisticProps {
    business: IBusiness;
}

interface DataPoint {
    date: string;
    value: number;
}

const generateDateRange = (startDate: Date, endDate: Date): DataPoint[] => {
    const dates: DataPoint[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push({
            date: currentDate.toISOString().split('T')[0],
            value: 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

const OrdersStatistic: FC<OrdersStatisticProps> = ({ business }) => {
    const { data, loading, error } = useFetching<IDailyOrders[]>(
        useCallback(() => OrderService.GetLastTwoWeeksOrdersCount(business.id), [business])
    );

    const [dailyOrders, setDailyOrders] = useState<DataPoint[]>([]);

    const fillMissingData = (existingData: IDailyOrders[], allDates: DataPoint[]): DataPoint[] => {
        const dateMap = new Map<string, number>(
            existingData.map(d => [d.order_date, Number(d.total_orders)])
        );

        return allDates.map(d => ({
            ...d,
            value: dateMap.get(d.date) || 0
        }));
    };

    useEffect(() => {
        if (data) {
            const today = new Date();
            const fourteenDaysAgo = new Date(today);

            fourteenDaysAgo.setDate(today.getDate() - 13);

            const allDates = generateDateRange(fourteenDaysAgo, today);

            const filledData = fillMissingData(data, allDates);

            setDailyOrders(filledData);
        }
    }, [data]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart width={500} height={300} data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, "Заказы"]} />
                <Legend formatter={() => "Заказы"} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrdersStatistic;
