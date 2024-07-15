import ICoords from "./ICoords";

export default interface IOrder {
    id: string;
    status: string;
    address: string;
    note: string;
    coords: ICoords;
    client_name: string;
    client_phone: string;
    delivery_time: string;
    courier_id: string | null;
    courier_first_name: string | null;
    courier_last_name: string | null;
    branch_id: string;
}