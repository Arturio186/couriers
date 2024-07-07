import $api from "../http";
import { AxiosResponse } from 'axios';

import IBranchStaff from "#interfaces/IBranchStaff";

export default class BranchService {
    static async GetBranches(): Promise<AxiosResponse<IBranchStaff[]>> {
        return $api.get(`/branches/my`)
    }
}