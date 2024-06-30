import ICity from "./ICity"

export default interface ICityModel {
    FindByName: (name: string) => Promise<ICity[]>
}