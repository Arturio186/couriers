import IAssortmentProduct from "./IAssortmentProduct";

export default interface IAssortmentCategory {
    id: string;
    name: string;
    products: IAssortmentProduct[]
}
