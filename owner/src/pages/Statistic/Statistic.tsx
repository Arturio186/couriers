import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import IBusiness from "#interfaces/IBusiness";
import BusinessesSelect from "#components/BusinessesSelect/BusinessesSelect";
import getStatisticColor from "#utils/getStatisticColor";

const salesData = [
    { branch_id: "1", branch_name: "Центральный", total: 3500 }
];

const ordersData = [
    { branch_id: "1", branch_name: "Центральный", total: 16 },
    { branch_id: "2", branch_name: "Восточный", total: 3 },
    { branch_id: "3", branch_name: "Западный", total: 15 },
    { branch_id: "4", branch_name: "Южный", total: 6 },
    { branch_id: "5", branch_name: "Северный", total: 8 },
];

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
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <h3>Общая сумма продаж по филиалам</h3>
                            <ResponsiveContainer width={400} height={300}>
                                <PieChart>
                                    <Pie
                                        data={salesData}
                                        dataKey="total"
                                        nameKey="branch_name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {salesData.map((entry, index) => (
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
                                        data={ordersData}
                                        dataKey="total"
                                        nameKey="branch_name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#82ca9d"
                                        label
                                    >
                                        {ordersData.map((entry, index) => (
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
                </>
            )}
        </>
    );
};

export default Statistic;
