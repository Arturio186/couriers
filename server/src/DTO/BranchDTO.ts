import IBranch from "../Interfaces/Branch/IBranch";
import ICoords from "../Interfaces/ICoord";

class BranchDTO {
    public id: string;
    public name: string;
    public city_id: number;
    public city_name: string;
    public region: string;
    public coords: ICoords
    
    constructor(branch: IBranch) {
        this.id = branch.id
        this.name = branch.name
        this.city_id = branch.city_id
        this.city_name = branch.city_name
        this.region = branch.region;
        this.coords = branch.city_coords
    }   
}

export default BranchDTO;