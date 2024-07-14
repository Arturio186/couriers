interface IAssortmentProduct {
    id: string;
    name: string;
    price: number;
}

export default interface IAssortmentCategory {
    id: string;
    name: string;
    products: IAssortmentProduct[]
}