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
}