import CategoryDTO from "../../DTO/CategoryDTO";
import ICategory from "./ICategory";

export default interface ICategoryService {
    SaveCategory: (businessID: string, name: string, userID: string) => Promise<CategoryDTO>;
    UpdateCategory: (categoryID: string, name: string, userID: string) => Promise<CategoryDTO>;
    RemoveCategory: (categoryID: string, userID: string) => Promise<number>;
    GetCategories: (businessID: string, userID: string) => Promise<CategoryDTO[]>;
    FindCategory: (categoryID: string) => Promise<ICategory>;
}