import $api from "../http";
import { AxiosResponse } from 'axios';

import CategoriesResponse from "#interfaces/response/CategoriesResponse";
import IBusiness from "#interfaces/IBusiness";

export default class CategoryService {
    static async GetCategories(business: IBusiness, limit: number, page: number): Promise<AxiosResponse<CategoriesResponse>> {
        return await $api.get<CategoriesResponse>(`/categories?business_id=${business.id}&limit=${limit}&page=${page}`);
    }
}