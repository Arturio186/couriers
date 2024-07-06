import ICoords from "./ICoords";

export default interface IBranchStaff {
    branch_id: string;
    branch_name: string;
    business_name: string;
    city_coords: ICoords;
}
