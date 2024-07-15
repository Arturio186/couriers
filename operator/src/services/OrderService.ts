import $api from "../http";
import { AxiosResponse } from 'axios';

import IOrder from "#interfaces/IOrder";
import IOrderProduct from "#interfaces/IOrderProduct";

export default class OrderService {
    static async GetActiveOrders(branchID: string): Promise<AxiosResponse<IOrder[]>> {
        return $api.get(`/orders/active?branch_id=${branchID}`)
    }

    static async GetOrderProduct(orderID: string): Promise<AxiosResponse<IOrderProduct[]>> {
        return $api.get(`/orders/products?order_id=${orderID}`)
    }
}

