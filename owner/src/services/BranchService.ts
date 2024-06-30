import $api from "../http";
import { AxiosResponse } from 'axios';

import IBranch from "#interfaces/IBranch";

export default class BusinessService {
    static async GetMyBusinesses(business_id: string): Promise<AxiosResponse<IBranch[]>> {
        return await $api.get<IBranch[]>(`/branches?business_id=${business_id}`);
    }
}