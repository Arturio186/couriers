import $api from "../http";
import { AxiosResponse } from 'axios';

import IBusiness from "#interfaces/IBusiness";
import IBranchSales from "#interfaces/IBranchSales";

export default class BusinessService {
    static async CreateBusiness(name: string): Promise<AxiosResponse<IBusiness>> {
        return $api.post<IBusiness>('/businesses', { name })
    }

    static async DeleteBusiness(id: string): Promise<AxiosResponse<number>> {
        return await $api.delete(`/businesses/${id}`);
    }

    static async UpdateBusiness(id: string, name: string): Promise<AxiosResponse<IBusiness>> {
        return await $api.put(`/businesses/${id}`, { name })
    }

    static async GetMyBusinesses(): Promise<AxiosResponse<IBusiness[]>> {
        return await $api.get<IBusiness[]>('/businesses/my');
    }

    static async GetBusiness(id: string): Promise<AxiosResponse<IBusiness>> {
        return await $api.get<IBusiness>(`/businesses/${id}`);
    }

    static async GetSalesStatistic(businessID: string): Promise<AxiosResponse<IBranchSales[]>> {
        return await $api.get<IBranchSales[]>(`/businesses/sales-statistic?business_id=${businessID}`)
    }
}