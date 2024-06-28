import BranchDTO from "../../DTO/BranchDTO"

export default interface IBranchService {
    GetBranchesByBusinessID: (businessID: string, userID: string) => Promise<BranchDTO[]>
}