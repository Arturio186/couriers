import $api from "../http";
import { AxiosResponse } from 'axios';

import IBusiness from "#interfaces/IBusiness";

export default class BusinessService {
    static async Create(name: string): Promise<AxiosResponse<IBusiness>> {
        return $api.post<IBusiness>('/businesses/create', { name })
    }

    static async GetMyBusinesses(): Promise<AxiosResponse<IBusiness[]>> {
        return await $api.get<IBusiness[]>('/businesses/my');
    }

    static async GetBusiness(id: string): Promise<AxiosResponse<IBusiness>> {
        return await $api.get<IBusiness>(`/businesses/${id}`);
    }

    static async DeleteBusiness(id: string): Promise<AxiosResponse<number>> {
        return await $api.delete(`/businesses/${id}`);
    }
}