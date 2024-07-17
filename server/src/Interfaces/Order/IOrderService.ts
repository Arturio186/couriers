import OrderDTO from "../../DTO/OrderDTO";
import IOrder from "./IOrder";
import IOrderProduct from "./IOrderProduct";
import IOrderRequest from "./IOrderRequest";

export default interface IOrderService {
    FindOrder: (orderID: string) => Promise<IOrder>;
    GetActiveOrders: (branchID: string, userID: string) => Promise<OrderDTO[]>
    GetOrderProduct: (orderID: string, userID: string) => Promise<IOrderProduct[]>
    SaveOrder: (orderRequest: IOrderRequest, userID: string) => Promise<OrderDTO>
}