import ICoords from "../Interfaces/ICoord";
import IBranchStaff from "../Interfaces/Branch/IBranchStaff";

import CoordsConverter from "../Utilities/CoordsConverter";

class BranchStaffDTO {
    public branch_id: string;
    public branch_name: string;
    public business_name: string;
    public city_coords: ICoords;

    constructor(branchStaff: IBranchStaff) {
        this.branch_id = branchStaff.branch_id;
        this.branch_name = branchStaff.branch_name;
        this.business_name = branchStaff.business_name;
        this.city_coords = CoordsConverter(branchStaff.city_coords);
    }
}

export default BranchStaffDTO;
