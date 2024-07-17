import AddOrderProduct from "./AddOrderProduct";

export default interface AddOrderRequest {
    delivery_time: string | null;
    courier_id: string | null | undefined;
    branch_id: string | undefined;
    lat: number;
    long: number;
    address: string;
    note: string;
    client_name: string;
    client_phone: string;
    products: AddOrderProduct[];
}