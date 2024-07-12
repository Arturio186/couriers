import IOrder from "./IOrder"
import IOrderData from "./IOrderData"

export default interface IOrderModel {
    Create: (data: IOrderData) => Promise<IOrder>
    FindActiveOrders: (branchID: string) => Promise<IOrder[]>
}