import OrderDTO from "../../DTO/OrderDTO";
import IOrder from "./IOrder";
import IOrderRequest from "./IOrderRequest";

export default interface IOrderService {
    GetActiveOrders: (branchID: string, userID: string) => Promise<OrderDTO[]>
    SaveOrder: (orderRequest: IOrderRequest, userID: string) => Promise<IOrder>
}