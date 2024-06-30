import BusinessDTO from "../../DTO/BusinessDTO"
import BranchDTO from "../../DTO/BranchDTO";

export default interface IBusinessService {
    SaveBusiness: (name: string, owner_id: string) => Promise<BusinessDTO>
    UpdateBusiness: (name: string, businessID: string, userID: string) => Promise<BusinessDTO>;
    RemoveBusiness: (businessID: string, userID: string) => Promise<number>
    GetOwnerBusinesses: (userID: string) => Promise<BusinessDTO[]>
    GetBusiness: (userID: string, businessID: string) => Promise<{
        business: BusinessDTO,
        branches: BranchDTO[]
    }>
}