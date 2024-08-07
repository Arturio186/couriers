import IBusiness from "./IBusiness";

import IBranchSales from "../Branch/IBranchSales";
import IBusinessesStats from "./IBusinessesStats";

export default interface IBusinessModel {
    Create: (business: IBusiness) => Promise<IBusiness>;
    Update: (conditions: Partial<IBusiness>, data: Partial<IBusiness>) => Promise<IBusiness>
    Delete: (conditions: Partial<IBusiness>) => Promise<number>
    FindAll: (conditions: Partial<IBusiness>) => Promise<IBusiness[] | undefined>
    FindOne: (conditions: Partial<IBusiness>) => Promise<IBusiness | undefined>
    FindUserInStaffs: (userID: string, businessID: string) => Promise<{ branch_id: string; user_id: string; business_id: string; } | undefined>
    GetBranchSalesByBusinessID: (businessID: string) => Promise<IBranchSales[]>
    GetBusinessesStatsByOwnerID: (ownerID: string) => Promise<IBusinessesStats>
}