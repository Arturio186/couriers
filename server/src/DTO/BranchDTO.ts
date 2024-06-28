import IBranch from "../Interfaces/Branch/IBranch";
import ICoords from "../Interfaces/ICoord";

class BranchDTO {
    public id: string;
    public name: string;
    public coords: ICoords
    
    constructor(branch: IBranch) {
        this.id = branch.id
        this.name = branch.name
        this.coords = branch.city_coords
    }   
}

export default BranchDTO;