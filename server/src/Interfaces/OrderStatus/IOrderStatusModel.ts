import IOrderStatus from "./IOrderStatus"

export default interface IOrderStatusModel {
    FindOne: (conditions: Partial<IOrderStatus>) => Promise<IOrderStatus>
}