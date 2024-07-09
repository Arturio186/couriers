import IOrder from "./IOrder"

export default interface IBranchModel {
    FindAll: (conditions: Partial<IOrder>) => Promise<IOrder[] | undefined>
}