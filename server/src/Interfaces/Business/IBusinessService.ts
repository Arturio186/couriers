import BusinessDTO from "../../DTO/BusinessDTO"

export default interface IBusinessService {
    SaveBusiness: (name: string, owner_id: string) => Promise<BusinessDTO>
    UpdateBusiness: (name: string, businessID: string, userID: string) => Promise<number>;
    RemoveBusiness: (businessID: string, userID: string) => Promise<number>
    GetOwnerBusinesses: (ownerID: string) => Promise<BusinessDTO[]>
}