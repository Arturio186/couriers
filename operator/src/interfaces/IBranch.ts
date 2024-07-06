import ICoords from "./ICoords";

export default interface IBranch {
    id: string;
    name: string;
    business_id: string;
    coords: ICoords;
}