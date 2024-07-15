export default interface IOrderProduct {
    product_id: string;
    order_id: string;
    quantity: number;
    price: number;
    product_name?: string;
}