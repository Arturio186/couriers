import React, { useCallback, useMemo } from "react";
import './OrderInfo.scss';

import IOrder from "#interfaces/IOrder";
import IOrderProduct from "#interfaces/IOrderProduct";
import { normalizeDate } from "#utils/normalizeDate";

import useFetching from "#hooks/useFetching";
import OrderService from "#services/OrderService";
import Loader from "#components/UI/Loader/Loader";

interface OrderInfoProps {
    order: IOrder;
}

const statusTranslation: Record<string, string> = {
    "free": "Свободный",
    "progress": "Доставляется",
    "delivered": "Доставлен"
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
    const {
        data: productsData,
        loading,
        error,
    } = useFetching<IOrderProduct[]>(useCallback(() => OrderService.GetOrderProduct(order.id), [order]));

    const totalCost = useMemo(() => {
        if (!productsData) return 0;

        return productsData.reduce((acc, product) => acc + Number(product.product_price), 0);
    }, [productsData]);

    let courierName = "Отсутствует";

    if (order.courier_first_name !== null) {
        courierName = order.courier_first_name;
        
        if (order.courier_last_name) {
            courierName += ` ${order.courier_last_name}`;
        }
    }

    return (
        <div className="order-info">
            <h1>Информация о заказе</h1>
            <div className="order-details">
                <p><strong>Статус:</strong> {statusTranslation[order.status]}</p>
                <p><strong>Курьер: </strong>{courierName}</p>
                <p><strong>Адрес:</strong> {order.address}</p>
                <p><strong>Примечание:</strong> {order.note}</p>
                <p><strong>Клиент:</strong> {order.client_name}</p>
                <p><strong>Номер клиента:</strong> {order.client_phone}</p>
                <p><strong>Доставить до:</strong> {normalizeDate(order.delivery_time)}</p>
            </div>
            <h2>Товары</h2>
            
            {loading ? (
                <Loader />
            ) : error ? (
                <div>{error}</div>
            ) : (
                productsData && (
                    productsData.length > 0 ? (
                        <>
                            <ul className="product-list">
                                {productsData.map(product => (
                                    <li key={product.product_id} className="product-item">
                                        <p><strong>Товар:</strong> {product.name}</p>
                                        <p><strong>Количество:</strong> {product.quantity}</p>
                                        <p><strong>Стоимость:</strong> {Number(product.product_price)} ₽</p>
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Итого: </strong>{totalCost} ₽</p>
                        </>
                    ) : (
                        <p>Товары отсутствуют</p>
                    )
                )
            )}
        </div>
    );
};

export default OrderInfo;
