import { AxiosResponse } from 'axios';
import $api from "../http";

import IOrder from "#interfaces/IOrder";
import IOrderProduct from "#interfaces/IOrderProduct";
import AddOrderRequest from "#interfaces/request/AddOrderRequest";

export default class OrderService {
    static async GetActiveOrders(branchID: string): Promise<AxiosResponse<IOrder[]>> {
        return $api.get(`/orders/active?branch_id=${branchID}`)
    }

    static async GetOrderProduct(orderID: string): Promise<AxiosResponse<IOrderProduct[]>> {
        return $api.get(`/orders/products?order_id=${orderID}`)
    }

    static async AddOrder(orderData: AddOrderRequest): Promise<AxiosResponse<IOrder>> {
        return $api.post('/orders', orderData)
    }

    static async FinishOrder(orderID: string): Promise<AxiosResponse<string>> {
        return $api.patch(`/orders/finish/${orderID}`)
    }

    static async DeleteOrder(orderID: string): Promise<AxiosResponse<string>> {
        return $api.delete(`/orders/${orderID}`)
    }
}

