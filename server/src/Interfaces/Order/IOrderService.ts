import IOrder from "./IOrder";
import IOrderRequest from "./IOrderRequest";

export default interface IOrderService {
    GetActiveOrders: (branchID: string, userID: string) => Promise<IOrder[]>
    SaveOrder: (orderRequest: IOrderRequest, userID: string) => Promise<IOrder>
}