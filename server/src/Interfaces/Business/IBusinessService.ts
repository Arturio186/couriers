import BusinessDTO from "../../DTO/BusinessDTO"
import IBusiness from "./IBusiness";

export default interface IBusinessService {
    SaveBusiness: (name: string, owner_id: string) => Promise<BusinessDTO>
    UpdateBusiness: (name: string, businessID: string, userID: string) => Promise<BusinessDTO>;
    RemoveBusiness: (businessID: string, userID: string) => Promise<number>
    GetOwnerBusinesses: (userID: string) => Promise<BusinessDTO[]>
    GetBusiness: (userID: string, businessID: string) => Promise<BusinessDTO>
    FindBusiness: (businessID: string) => Promise<IBusiness>
    IsOwnerHaveBusiness: (businessID: string, ownerID: string) => Promise<boolean>;
    IsUserWorkInBusiness: (businessID: string, userID: string) => Promise<boolean>;
}