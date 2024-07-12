import IOrder from "./IOrder"

export default interface IOrderModel {
    FindActiveOrders: (branchID: string) => Promise<IOrder[]>
}