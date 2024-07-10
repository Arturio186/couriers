import IBranch from "./IBranch";
import IBranchStaff from "./IBranchStaff";

export default interface IBranchModel {
    Create: (branch: IBranch) => Promise<IBranch>;
    Update: (conditions: Partial<IBranch>, data: Partial<IBranch>) => Promise<IBranch>
    Delete: (conditions: Partial<IBranch>) => Promise<number>
    FindAll: (conditions: Partial<IBranch>) => Promise<IBranch[] | undefined>
    FindOne: (conditions: Partial<IBranch>) => Promise<IBranch | undefined>
    GetUserBranches: (userID: string) => Promise<IBranchStaff[]>
    FindBrnachStaff: (branchID: string, userID: string) => Promise<IBranchStaff>
    JoinBranch: (branchID: string, userID: string) => Promise<IBranchStaff>
    GetBranchInfo: (branchID: string) => Promise<IBranch>;
    FindAllBranchStaffWithOffset: (branchID: string, page: number, limit: number) => Promise<IBranchStaff[]> 
    GetMaxStaffPages: (branchID: string, limit: number) => Promise<number>
}