import IOrderProduct from "./IOrderProduct";

export default interface IOrderRequest {
    status_id: number;
    address: string;
    note: string;
    lat: number;
    long: number;
    client_name: string;
    client_phone: string;
    courier_id: string | null;
    branch_id: string;
    products: IOrderProduct[];
}
