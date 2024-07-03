import $api from "../http";
import { AxiosResponse } from 'axios';

import IBusiness from "#interfaces/IBusiness";
import ICategory from "#interfaces/ICategory";

export default class CategoryService {
    static async GetCategories(business: IBusiness): Promise<AxiosResponse<ICategory[]>> {
        return await $api.get<ICategory[]>(`/categories?business_id=${business.id}`);
    }
}