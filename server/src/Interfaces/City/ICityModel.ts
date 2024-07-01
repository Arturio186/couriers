import ICity from "./ICity"

export default interface ICityModel {
    FindByName: (name: string) => Promise<ICity[]>
    FindOne: (conditions: Partial<ICity>) => Promise<ICity | undefined>
}