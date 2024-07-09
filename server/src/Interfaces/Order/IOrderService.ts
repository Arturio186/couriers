import IOrder from "./IOrder";

export default interface IBranchService {
    GetActiveOrders: (branchID: string) => Promise<IOrder[]>
}