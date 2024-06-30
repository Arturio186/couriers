import CityDTO from "../../DTO/CityDTO"

export default interface ICityService {
    FindCitiesByName: (name: string) => Promise<CityDTO[]>
}