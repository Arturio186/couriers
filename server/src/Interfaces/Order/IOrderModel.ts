import IOrder from "./IOrder"

export default interface IOrderModel {
    FindAll: (conditions: Partial<IOrder>) => Promise<IOrder[] | undefined>
    FindActiveOrders: (branchID: string) => Promise<IOrder[]>
}