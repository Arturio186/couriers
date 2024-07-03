import ProductDTO from "../../DTO/ProductDTO";

export default interface IProductService {
    SaveProduct: (categoryID: string, name: string, price: number, userID: string) => Promise<ProductDTO>;
    UpdateProduct: (categoryID: string, name: string, price: number, userID: string) => Promise<ProductDTO>;
    RemoveProduct: (categoryID: string, userID: string) => Promise<number>;
    GetProducts: (categoryID: string, userID: string) => Promise<ProductDTO[]>;
}