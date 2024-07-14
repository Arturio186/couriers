import ProductDTO from "../../DTO/ProductDTO";
import IAssortmentCategory from "./IAssortmentCategory";
import IProduct from "./IProduct";

export default interface IProductService {
    SaveProduct: (categoryID: string, name: string, price: number, userID: string) => Promise<ProductDTO>;
    UpdateProduct: (productID: string, name: string, price: number, userID: string) => Promise<ProductDTO>;
    RemoveProduct: (productID: string, userID: string) => Promise<number>;
    GetProducts: (categoryID: string, userID: string) => Promise<ProductDTO[]>;
    FindProduct: (productID: string) => Promise<IProduct>
    GetAssortment: (businessID: string, userID: string) => Promise<IAssortmentCategory[]>
}