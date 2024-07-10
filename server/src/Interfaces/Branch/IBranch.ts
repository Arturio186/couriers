import ICoords from "../ICoord";

export default interface IBranch {
    id?: string;
    name: string;
    business_id: string;
    business_name?: string;
    owner_first_name?: string;
    owner_last_name?: string;
    city_id: number;
    city_name?: string;
    region?: string;
    city_coords?: ICoords;
    created_at?: Date;
    updated_at?: Date;
}