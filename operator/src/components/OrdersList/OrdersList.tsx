import { FC } from "react";
import './OrdersList.scss'

import IOrder from "#interfaces/IOrder";
import ICourier from "#interfaces/ICourier";

import { normalizeDate } from "#utils/normalizeDate";

interface OrdersListProps {
    orders: IOrder[];
    targetCourier: ICourier | null;
    handleOrderClick: (order: IOrder) => void;
}

const statusTranslation: Record<string, string> = {
    "free": "Свободный",
    "progress": "Доставляется",
    "delivered": "Доставлен"
}

const OrdersList: FC<OrdersListProps> = ({ orders, targetCourier, handleOrderClick }) => {
    
    return (
        <div className="orders-list">
            {orders.map((order) => {
                if (targetCourier === null || targetCourier.id === order.courier_id) {
                    return (
                        <div
                            key={order.id}
                            className="order-item"
                            onClick={() => handleOrderClick(order)}
                        >
                            <div className="order__client">Клиент: {order.client_name}</div>
                            <div className="order__courier">
                                Курьер: {order.courier_id === null && "Отсутствует"}
                                {order.courier_first_name} {order.courier_last_name !== null && order.courier_last_name}
                            </div>
                            <div className="order__status">Статус: {statusTranslation[order.status]}</div>
                            <div className="order__delivery-time">Время доставки: {normalizeDate(order.delivery_time)}</div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default OrdersList;
