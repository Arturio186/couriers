import IBranch from "../Interfaces/Branch/IBranch";
import ICoords from "../Interfaces/ICoord";

class BranchDTO {
    public id: string;
    public name: string;
    public business_id: string;
    public city_id: number;
    public city_name: string;
    public region: string;
    public coords: ICoords;
    public business_name: string;
    public owner_first_name: string;
    public owner_last_name: string;

    constructor(branch: IBranch) {
        this.id = branch.id;
        this.name = branch.name;
        this.business_id = branch.business_id;
        this.city_id = branch.city_id;
        this.city_name = branch.city_name;
        this.region = branch.region;
        this.coords = branch.city_coords;
        this.business_name = branch.business_name;
        this.owner_first_name = branch.owner_first_name;
        this.owner_last_name = branch.owner_last_name;
    }
}

export default BranchDTO;
