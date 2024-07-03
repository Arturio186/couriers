import ProductDTO from "../../DTO/ProductDTO";

export default interface IProductService {
    // SaveCategory: (businessID: string, name: string, userID: string) => Promise<CategoryDTO>;
    // UpdateCategory: (categoryID: string, name: string, userID: string) => Promise<CategoryDTO>;
    // RemoveCategory: (categoryID: string, userID: string) => Promise<number>;
    GetProducts: (categoryID: string, userID: string) => Promise<ProductDTO[]>;
}