import BranchDTO from "../../DTO/BranchDTO"
import BranchStaffDTO from "../../DTO/BranchStaffDTO";
import IBranch from "./IBranch";

export default interface IBranchService {
    FindBranch: (branchID: string) => Promise<IBranch>
    SaveBranch: (name: string, businessID: string, cityID: number, userID: string) => Promise<BranchDTO>;
    RemoveBranch: (branchID: string, userID: string) => Promise<number>;
    UpdateBranch: (branchID: string, name: string, cityID: number, userID: string) => Promise<BranchDTO>;
    GetBranchInfo: (branchID: string) => Promise<BranchDTO>;
    GetBranchesByBusinessID: (businessID: string, userID: string) => Promise<BranchDTO[]>;
    GetBranchesByUserID: (userID: string) => Promise<BranchStaffDTO[]>
    JoinBranch: (branchID: string, userID: string) => Promise<void>;
    IsUserInBranch: (branchID: string, userID: string) => Promise<boolean>;
    GetBranchStaff: (branchID: string, page: number, limit: number, userID: string) => Promise<{
        staff: BranchStaffDTO[],
        maxPage: number;
    }>;
    RemoveStaffMember: (branchID: string, userID: string, ownerID: string) => Promise<number>
}
