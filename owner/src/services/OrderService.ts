import IDailyOrders from "#interfaces/IDailyOrders";
import $api from "../http";

import { AxiosResponse } from 'axios';

export default class OrderService {
    static async GetLastTwoWeeksOrdersCount(businessID: string): Promise<AxiosResponse<IDailyOrders[]>> {
        return await $api.get<IDailyOrders[]>(`/orders/last-two-weeks?business_id=${businessID}`);
    }
}