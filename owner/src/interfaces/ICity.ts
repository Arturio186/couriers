import ICoords from "./ICoords";

export default interface ICity {
    id: number;
    name: string;
    region: string; 
    coords: ICoords
}