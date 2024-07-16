import IOrderProductRequest from "./IOrderProductRequest";

export default interface IOrderRequest {
    address: string;
    note: string;
    lat: number;
    long: number;
    client_name: string;
    client_phone: string;
    courier_id: string | null;
    branch_id: string;
    delivery_time: Date;
    products: IOrderProductRequest[];
}
