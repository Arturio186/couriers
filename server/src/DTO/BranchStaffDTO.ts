import ICoords from "../Interfaces/ICoord";
import IBranchStaff from "../Interfaces/Branch/IBranchStaff";

import CoordsConverter from "../Utilities/CoordsConverter";

class BranchStaffDTO {
    public user_id: string;
    public user_first_name: string;
    public user_last_name: string;
    public user_email: string;
    public user_role: string;
    public branch_id: string;
    public branch_name: string;
    public business_id: string;
    public business_name: string;
    public city_coords: ICoords;

    constructor(branchStaff: IBranchStaff) {
        this.user_id = branchStaff.user_id;
        this.user_first_name = branchStaff.user_first_name;
        this.user_last_name = branchStaff.user_last_name;
        this.user_email = branchStaff.user_email;
        this.user_role = branchStaff.user_role;
        this.branch_id = branchStaff.branch_id;
        this.branch_name = branchStaff.branch_name;
        this.business_id = branchStaff.business_id;
        this.business_name = branchStaff.business_name;

        if (branchStaff.city_coords) {
            this.city_coords = CoordsConverter(branchStaff.city_coords);
        }
    }
}

export default BranchStaffDTO;
