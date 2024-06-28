import BusinessDTO from "../../DTO/BusinessDTO"

export default interface IBranchService {
    SaveBranch: (name: string, owner_id: string) => Promise<BusinessDTO>
}