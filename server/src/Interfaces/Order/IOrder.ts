export default interface IOrder {
    id?: string;
    status_id: number;
    status?: string;
    address: string;
    note: string;
    coords: string;
    client_id: string;
    client_name?: string;
    client_phone?: string;
    delivery_time: Date;
    courier_id: string;
    courier_first_name: string;
    courier_last_name: string;
    branch_id: string;
    created_at?: Date;
    updated_at?: Date;
}