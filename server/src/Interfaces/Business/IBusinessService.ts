import BusinessDTO from "../../DTO/BusinessDTO"

export default interface IBusinessService {
    SaveBusiness: (name: string, owner_id: string) => Promise<BusinessDTO>
    GetOwnerBusinesses: (owner_id: string) => Promise<BusinessDTO[]>
}