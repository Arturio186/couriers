import ICoords from "../ICoord";

export default interface IBranch {
    id?: string;
    name: string;
    business_id: string;
    city_id: string;
    city_name?: string;
    region?: string;
    city_coords?: ICoords;
    created_at?: Date;
    updated_at?: Date;
}