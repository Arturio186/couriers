import IOrder from "./IOrder"
import IOrderData from "./IOrderData"
import IOrderProduct from "./IOrderProduct"

export default interface IOrderModel {
    CreateOrderWithProducts: (data: IOrderData, products: Omit<IOrderProduct, 'order_id'>[]) => Promise<IOrder>;
    FindOne: (conditions: Partial<IOrder>) => Promise<IOrder | undefined>
    FindActiveOrders: (branchID: string) => Promise<IOrder[]>;
    GetOrderProducts: (orderID: string) => Promise<IOrderProduct[]>;
}