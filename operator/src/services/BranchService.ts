import $api from "../http";
import { AxiosResponse } from 'axios';

import IBranchStaff from "#interfaces/IBranchStaff";
import IBranch from "#interfaces/IBranch";

export default class BranchService {
    static async GetBranches(): Promise<AxiosResponse<IBranchStaff[]>> {
        return $api.get(`/branches/my`)
    }

    static async GetBranchInfo(branchID: string): Promise<AxiosResponse<IBranch>> {
        return $api.get(`branches/${branchID}`)
    }

    static async JoinBranch(branch_id: string): Promise<AxiosResponse<string>> {
        return $api.post(`/branches/join`, {
            branch_id
        })
    }
}