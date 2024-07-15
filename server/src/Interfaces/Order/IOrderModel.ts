import IOrder from "./IOrder"
import IOrderData from "./IOrderData"
import IOrderProduct from "./IOrderProduct"

export default interface IOrderModel {
    Create: (data: IOrderData) => Promise<IOrder>;
    FindOne: (conditions: Partial<IOrder>) => Promise<IOrder | undefined>
    FindActiveOrders: (branchID: string) => Promise<IOrder[]>;
    AddProductsToOrder: (orderID: string, product: Omit<IOrderProduct, 'order_id'>[]) => Promise<void>; 
    GetOrderProducts: (orderID: string) => Promise<IOrderProduct[]>;
}