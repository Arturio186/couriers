import BranchDTO from "../../DTO/BranchDTO"

export default interface IBranchService {
    SaveBranch: (name: string, businessID: string, cityID: number, userID: string) => Promise<BranchDTO>;
    GetBranchesByBusinessID: (businessID: string, userID: string) => Promise<BranchDTO[]>;
}