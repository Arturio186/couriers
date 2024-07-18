import { AxiosResponse } from 'axios';
import $api from "../http";

import ICity from "#interfaces/ICity";

export default class CityService {
    static async FindCities(name: string): Promise<AxiosResponse<ICity[]>> {
        return await $api.get<ICity[]>(`/citites/find?name=${name}`);
    }
}