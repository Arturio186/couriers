import ICategory from "./ICategory";

export default interface ICategoryModel {
    Create: (category: ICategory) => Promise<ICategory>;
    Update: (conditions: Partial<ICategory>, data: Partial<ICategory>) => Promise<ICategory>
    Delete: (conditions: Partial<ICategory>) => Promise<number>
    FindOne: (conditions: Partial<ICategory>) => Promise<ICategory | undefined>
    FindAll: (conditions: Partial<ICategory>) => Promise<ICategory[]>
}