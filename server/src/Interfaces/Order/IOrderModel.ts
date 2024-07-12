import IOrder from "./IOrder"
import IOrderData from "./IOrderData"
import IOrderProduct from "./IOrderProduct"

export default interface IOrderModel {
    Create: (data: IOrderData) => Promise<IOrder>
    FindActiveOrders: (branchID: string) => Promise<IOrder[]>
    AddProductsToOrder: (orderID: string, product: IOrderProduct[]) => Promise<void>; 
}