import ICity from "../Interfaces/City/ICity";
import ICoords from "../Interfaces/ICoord";

import CoordsConverter from "../Utilities/CoordsConverter";

class CityDTO {
    public id: number;
    public name: string;
    public region: string;
    public coords: ICoords;

    constructor(city: ICity) {
        this.id = city.id
        this.name = city.name
        this.region = city.region
        this.coords = CoordsConverter(city.coords)
    }   
}

export default CityDTO;