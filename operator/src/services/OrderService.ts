import $api from "../http";
import { AxiosResponse } from 'axios';

import IOrder from "#interfaces/IOrder";

export default class OrderService {
    static async GetActiveOrders(branchID: string): Promise<AxiosResponse<IOrder[]>> {
        return $api.get(`/orders/active?branch_id=${branchID}`)
    }
}