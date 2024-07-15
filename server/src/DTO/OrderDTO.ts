import IOrder from "../Interfaces/Order/IOrder";
import ICoords from "../Interfaces/ICoord";
import CoordsConverter from "../Utilities/CoordsConverter";

class OrderDTO {
    public id: string;
    public status: string;
    public address: string;
    public note: string;
    public coords: ICoords;
    public client_name: string;
    public client_phone: string; 
    public delivery_time: Date;
    public courier_id: string;
    public courier_first_name: string;
    public courier_last_name: string;
    public branch_id: string;

    constructor(order: IOrder) {
        this.id = order.id;
        this.status = order.status;
        this.address = order.address;
        this.note = order.note;
        this.coords = CoordsConverter(order.coords)
        this.client_name = order.client_name;
        this.client_phone = order.client_phone;
        this.delivery_time = order.delivery_time;
        this.courier_id = order.courier_id;
        this.courier_first_name = order.courier_first_name;
        this.courier_last_name = order.courier_last_name;
        this.branch_id = order.branch_id;
    }   
}

export default OrderDTO;