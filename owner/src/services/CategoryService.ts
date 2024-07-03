import $api from "../http";
import { AxiosResponse } from 'axios';

import IBusiness from "#interfaces/IBusiness";
import ICategory from "#interfaces/ICategory";

export default class CategoryService {
    static async GetCategories(business: IBusiness): Promise<AxiosResponse<ICategory[]>> {
        return await $api.get<ICategory[]>(`/categories?business_id=${business.id}`);
    }

    static async DeleteCategory(category_id: string): Promise<AxiosResponse<number>> {
        return await $api.delete(`/categories/${category_id}`);
    }

    static async CreateCategory(business_id: string, name: string): Promise<AxiosResponse<ICategory>> {
        return $api.post<ICategory>('/categories', { business_id, name })
    }

    static async EditCategory(category_id: string, name: string): Promise<AxiosResponse<ICategory>> {
        return $api.put<ICategory>(`/categories/${category_id}`, { name });
    }
}