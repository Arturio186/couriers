import IOrder from "./IOrder";

export default interface IOrderService {
    GetActiveOrders: (branchID: string) => Promise<IOrder[]>
}