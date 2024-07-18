import { AxiosResponse } from 'axios';
import $api from "../http";

import IProduct from "#interfaces/IProduct";
import ICategory from "#interfaces/ICategory";

export default class ProductService {
    static async GetProducts(category: ICategory): Promise<AxiosResponse<IProduct[]>> {
        return await $api.get<IProduct[]>(`/products?category_id=${category.id}`);
    }

    static async DeleteProduct(product_id: string): Promise<AxiosResponse<number>> {
        return await $api.delete(`/products/${product_id}`);
    }

    static async CreateProduct(category_id: string, name: string, price: number): Promise<AxiosResponse<IProduct>> {
        return $api.post<IProduct>('/products', { category_id, name, price })
    }

    static async EditProduct(product_id: string, name: string, price: number): Promise<AxiosResponse<IProduct>> {
        return $api.put<IProduct>(`/products/${product_id}`, { name, price });
    }
}