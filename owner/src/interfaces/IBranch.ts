import ICoords from "./ICoords";

export default interface IBranch {
    id: string;
    name: string;
    city_id?: number;
    city_name?: string; 
    region?: string;
    business_id: string;
    coords?: ICoords;
    business_name?: string;
    owner_first_name?: string;
    owner_last_name?: string;
}