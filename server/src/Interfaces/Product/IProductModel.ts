import IProduct from "./IProduct";

export default interface IProductModel {
    Create: (category: IProduct) => Promise<IProduct>;
    Update: (conditions: Partial<IProduct>, data: Partial<IProduct>) => Promise<IProduct>
    Delete: (conditions: Partial<IProduct>) => Promise<number>
    FindOne: (conditions: Partial<IProduct>) => Promise<IProduct | undefined>
    FindAll: (conditions: Partial<IProduct>) => Promise<IProduct[]>
    GetProductsByIDs: (productIDs: string[]) => Promise<IProduct[]>
}