import $api from "../http";
import { AxiosResponse } from 'axios';

import IBusiness from "#interfaces/IBusiness";

export default class BusinessService {
    static async Create(name: string): Promise<AxiosResponse<IBusiness>> {
        return $api.post<IBusiness>('/businesses/login', { name })
    }

    static async GetMyBusinesses(): Promise<IBusiness[]> {
        const response = await $api.get<IBusiness[]>('/businesses/my');
        return response.data;
    }

    static async GetBusiness(id: string): Promise<IBusiness> {
        const response = await $api.get<IBusiness>(`/businesses/${id}`)
        return response.data;
    }

    static async DeleteBusiness(id: string): Promise<void> {
        await $api.delete(`/businesses/${id}`);
    }
}