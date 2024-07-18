import { AxiosResponse } from 'axios';
import $api from "../http";

import IBranch from "#interfaces/IBranch";
import StaffResponse from "#interfaces/response/StaffResponse";

export default class BranchService {
    static async CreateBranch(name: string, business_id: string, city_id: number): Promise<AxiosResponse<IBranch>> {
        return $api.post<IBranch>('/branches', { 
            name,
            business_id,
            city_id
         })
    }

    static async DeleteBranch(branch_id: string): Promise<AxiosResponse<number>> {
        return await $api.delete(`/branches/${branch_id}`);
    }

    static async UpdateBranch(branch_id: string, name: string, city_id: number): Promise<AxiosResponse<IBranch>> {
        return $api.put(`/branches/${branch_id}`, {
            name,
            city_id
        })
    }

    static async GetBranches(business_id: string): Promise<AxiosResponse<IBranch[]>> {
        return $api.get(`/branches?business_id=${business_id}`)
    }

    static async GetBranchInfo(branchID: string): Promise<AxiosResponse<IBranch>> {
        return $api.get(`branches/${branchID}`)
    }

    static async GetBranchStaff(branchID: string, page: number, limit: number): Promise<AxiosResponse<StaffResponse>> {
        return $api.get(`branches/staff?branch_id=${branchID}&page=${page}&limit=${limit}`)
    }

    static async RemoveFromStaff(userID: string, branchID: string): Promise<AxiosResponse<string>> {
        return $api.delete(`branches/staff`, {
            data: {
                user_id: userID,
                branch_id: branchID
            }
        })
    }
}