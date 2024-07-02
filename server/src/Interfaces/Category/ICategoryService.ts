import CategoryDTO from "../../DTO/CategoryDTO";

export default interface ICategoryService {
    SaveCategory: (businessID: string, name: string, userID: string) => Promise<CategoryDTO>;

    GetCategories: (businessID: string, page: number, limit: number, userID: string) => Promise<{
        maxPage: number;
        categories: CategoryDTO[]
    }>;
}