import CategoryDTO from "../../DTO/CategoryDTO";

export default interface ICategoryService {
    GetCategories: (businessID: string, page: number, limit: number, userID: string) => Promise<{
        maxPage: number;
        categories: CategoryDTO[]
    }>;
}