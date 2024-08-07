import ICityService from "../Interfaces/City/ICityService";
import ICityModel from "../Interfaces/City/ICityModel";

import APIError from "../Exceptions/APIError";

import CityDTO from "../DTO/CityDTO";


class CityService implements ICityService {
    private readonly CityModel: ICityModel;

    constructor(cityModel: ICityModel) {
        this.CityModel = cityModel;
    }

    public FindCity = async (cityID: number) => {
        const city = await this.CityModel.FindOne({ id: cityID })

        if (!city) {
            throw APIError.BadRequest("Город не найден")
        }

        return city;
    }

    public FindCitiesByName = async (name: string) => {
        const cities = await this.CityModel.FindByName(name);

        return cities.map((city) => new CityDTO(city));
    };

}

export default CityService;
