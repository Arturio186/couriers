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
        this.branch_id = order.branch_id;
    }   
}

export default OrderDTO;