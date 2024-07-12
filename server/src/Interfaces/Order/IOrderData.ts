export default interface IOrderData {
    status_id: number;
    address: string;
    note: string | null;
    lat: number;
    long: number;
    client_id: string;
    delivery_time: Date;
    courier_id: string | null;
    branch_id: string;
}