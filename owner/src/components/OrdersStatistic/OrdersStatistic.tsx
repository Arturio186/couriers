import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface DataPoint {
    date: string;
    value: number;
}

const data: DataPoint[] = [
    { date: "2024-07-06", value: 0 },
    { date: "2024-07-07", value: 0 },
    { date: "2024-07-08", value: 0 },
    { date: "2024-07-09", value: 0 },
    { date: "2024-07-10", value: 0 },
    { date: "2024-07-11", value: 0 },
    { date: "2024-07-12", value: 0 },
    { date: "2024-07-13", value: 0 },
    { date: "2024-07-14", value: 0 },
    { date: "2024-07-15", value: 0 },
    { date: "2024-07-16", value: 0 },
    { date: "2024-07-17", value: 1 },
    { date: "2024-07-18", value: 4 },
    { date: "2024-07-19", value: 0 },
];

const OrdersStatistic: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                width={500}
                height={300}
                data={data}
                
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, 'Заказы']} />
                <Legend formatter={() => 'Заказы'} />
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
