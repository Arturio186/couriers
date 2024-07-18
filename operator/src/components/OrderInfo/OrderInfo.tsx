import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import './OrderInfo.scss';

import { addToast } from "#store/toastSlice";

import OrderService from "#services/OrderService";

import useFetching from "#hooks/useFetching";

import Loader from "#components/UI/Loader/Loader";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IOrder from "#interfaces/IOrder";
import IOrderProduct from "#interfaces/IOrderProduct";

import { normalizeDate } from "#utils/normalizeDate";

interface OrderInfoProps {
    order: IOrder;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

const statusTranslation: Record<string, string> = {
    "free": "Свободный",
    "progress": "Доставляется",
    "delivered": "Доставлен"
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order, setVisible, setOrders }) => {
    const dispatch = useDispatch();

    const {
        data: productsData,
        loading,
        error,
    } = useFetching<IOrderProduct[]>(useCallback(() => OrderService.GetOrderProduct(order.id), [order]));

    const totalCost = useMemo(() => {
        if (!productsData) return 0;

        return productsData.reduce((acc, product) => acc + Number(product.product_price) * product.quantity, 0);
    }, [productsData]);

    const handleFinishClick = async () => {
        try {
            const response = await OrderService.FinishOrder(order.id)

            if (response.status === 200) {
                dispatch(addToast("Заказ успешно завершен"))

                setOrders(prev => prev.filter(o => o.id !== order.id))
            }
        } catch (error: any) {
            dispatch(addToast(error.response?.data?.message || "Произошла ошибка при изменении заказа"));
        } finally {
            setVisible(false)
        }
    }

    const handleDeleteClick = async () => {
        if (confirm("Вы уверены, что хотите удалить заказ?")) {
            try {
                const response = await OrderService.DeleteOrder(order.id)

                if (response.status === 200) {
                    dispatch(addToast("Заказ успешно удален"))

                    setOrders(prev => prev.filter(o => o.id !== order.id))
                }
            } catch (error: any) {
                dispatch(addToast(error.response?.data?.message || "Произошла ошибка при удалении заказа"));
            } finally {
                setVisible(false)
            }
        }
    }

    return (
        <div className="order-info">
            <h1>Информация о заказе</h1>
            <div className="order-details">
                <p><strong>Статус:</strong> {statusTranslation[order.status]}</p>
                <p><strong>Курьер: </strong>{order.courier_first_name} {order.courier_last_name !== null && order.courier_last_name}</p>
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
                                        <p><strong>Стоимость:</strong> {Number(product.product_price) * product.quantity} ₽</p>
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
            <div className="controls">
                <CoolButton onClick={handleFinishClick}>Завершить заказ</CoolButton>
                <CoolButton onClick={handleDeleteClick}>Удалить</CoolButton>
            </div>
        </div>
    );
};

export default OrderInfo;
