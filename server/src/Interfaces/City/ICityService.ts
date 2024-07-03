import CityDTO from "../../DTO/CityDTO"
import ICity from "./ICity"

export default interface ICityService {
    FindCity: (cityID: number) => Promise<ICity>
    FindCitiesByName: (name: string) => Promise<CityDTO[]>
}