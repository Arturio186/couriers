import CategoryDTO from "../../DTO/CategoryDTO";

export default interface ICategoryService {
    SaveCategory: (businessID: string, name: string, userID: string) => Promise<CategoryDTO>;
    UpdateCategory: (businessID: string, categoryID: string, name: string, userID: string) => Promise<CategoryDTO>;
    RemoveCategory: (businessID: string, categoryID: string, userID: string) => Promise<number>;
    GetCategories: (businessID: string, userID: string) => Promise<CategoryDTO[]>;
}