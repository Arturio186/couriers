import BranchDTO from "../../DTO/BranchDTO"
import IBranch from "./IBranch";

export default interface IBranchService {
    FindBranch: (branchID: string) => Promise<IBranch>
    SaveBranch: (name: string, businessID: string, cityID: number, userID: string) => Promise<BranchDTO>;
    RemoveBranch: (businessID: string, branchID: string, userID: string) => Promise<number>;
    UpdateBranch: (businessID: string, branchID: string, name: string, cityID: number, userID: string) => Promise<BranchDTO>;
    GetBranchesByBusinessID: (businessID: string, userID: string) => Promise<BranchDTO[]>;
}