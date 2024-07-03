import $api from "../http";
import { AxiosResponse } from 'axios';

import IBranch from "#interfaces/IBranch";

export default class BranchService {
    static async CreateBranch(name: string, business_id: string, city_id: number): Promise<AxiosResponse<IBranch>> {
        return $api.post<IBranch>('/branches', { 
            name,
            business_id,
            city_id
         })
    }

    static async DeleteBranch(business_id: string, branch_id: string): Promise<AxiosResponse<number>> {
        return await $api.delete("/branches", {
            data: {
                business_id,
                branch_id,
            },
        });
    }

    static async UpdateBranch(business_id: string, branch_id: string, name: string, city_id: number): Promise<AxiosResponse<IBranch>> {
        return $api.put("/branches", {
            business_id, 
            branch_id,
            name,
            city_id
        })
    }

    static async GetBranches(business_id: string): Promise<AxiosResponse<IBranch[]>> {
        return $api.get(`/branches?business_id=${business_id}`)
    }
}