import IBranch from "./IBranch";
import IBranchStaff from "./IBranchStaff";

export default interface IBranchModel {
    Create: (branch: IBranch) => Promise<IBranch>;
    Update: (conditions: Partial<IBranch>, data: Partial<IBranch>) => Promise<IBranch>
    Delete: (conditions: Partial<IBranch>) => Promise<number>
    FindAll: (conditions: Partial<IBranch>) => Promise<IBranch[] | undefined>
    FindOne: (conditions: Partial<IBranch>) => Promise<IBranch | undefined>
    GetUserBranches: (userID: string) => Promise<IBranchStaff[]>
}