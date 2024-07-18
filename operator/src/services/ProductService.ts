import { AxiosResponse } from 'axios';
import $api from "../http";

import IAssortmentCategory from "#interfaces/IAssortmentCategory";

export default class ProductService {
    static async GetAssortment(businessID: string): Promise<AxiosResponse<IAssortmentCategory[]>> {
        return $api.get(`/products/assortment?business_id=${businessID}`)
    }
}