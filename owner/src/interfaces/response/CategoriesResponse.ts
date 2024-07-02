import ICategory from "#interfaces/ICategory";

export default interface CategoriesResponse {
    maxPage: number;
    categories: ICategory[]
}