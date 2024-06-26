import IBusiness from "./IBusiness"

export default interface IBusinessService {
    SaveBusiness: (name: string, owner_id: string) => Promise<IBusiness>
}